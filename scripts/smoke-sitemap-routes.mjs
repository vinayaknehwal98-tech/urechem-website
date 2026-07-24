import process from "node:process";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const sitemapUrl = new URL("/sitemap.xml", baseUrl);
const concurrency = 8;

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripTags(value) {
  return decodeHtml(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return match ? decodeHtml(match[1].trim()) : null;
}

function localise(url) {
  const publishedUrl = new URL(url, baseUrl);
  return new URL(`${publishedUrl.pathname}${publishedUrl.search}`, baseUrl);
}

async function fetchPage(url) {
  const response = await fetch(url, { redirect: "follow" });
  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("text/html") ? await response.text() : "";
  return { status: response.status, ok: response.ok, finalUrl: response.url, body };
}

async function runPool(items, handler) {
  let cursor = 0;
  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (cursor < items.length) {
        const item = items[cursor++];
        await handler(item);
      }
    }),
  );
}

function inspectRenderedPage(body, pathname) {
  const failures = [];
  const htmlTag = body.match(/<html\b[^>]*>/i)?.[0];
  const title = stripTags(body.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "");
  const h1Elements = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean);
  const metaTags = [...body.matchAll(/<meta\b[^>]*>/gi)].map((match) => match[0]);
  const descriptionTag = metaTags.find((tag) => getAttribute(tag, "name")?.toLowerCase() === "description");
  const robotsTag = metaTags.find((tag) => getAttribute(tag, "name")?.toLowerCase() === "robots");
  const imageTags = [...body.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);

  if (!htmlTag || !getAttribute(htmlTag, "lang")) failures.push("missing html lang attribute");
  if (!title) failures.push("missing or empty document title");
  if (!descriptionTag || !getAttribute(descriptionTag, "content")) failures.push("missing or empty meta description");
  if (h1Elements.length !== 1) failures.push(`expected exactly one non-empty H1, found ${h1Elements.length}`);

  const robots = robotsTag ? getAttribute(robotsTag, "content")?.toLowerCase() ?? "" : "";
  if (robots.includes("noindex")) failures.push("sitemap route is marked noindex");

  const imagesWithoutAlt = imageTags.filter((tag) => getAttribute(tag, "alt") === null);
  if (imagesWithoutAlt.length > 0) failures.push(`${imagesWithoutAlt.length} rendered image(s) missing an alt attribute`);

  return failures.map((message) => ({ source: pathname, message }));
}

const sitemapResponse = await fetch(sitemapUrl);
if (!sitemapResponse.ok) {
  console.error(`Unable to load sitemap: ${sitemapResponse.status} ${sitemapUrl}`);
  process.exit(1);
}

const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeHtml(match[1]));

if (locations.length === 0) {
  console.error("No routes were found in sitemap.xml");
  process.exit(1);
}

const routeFailures = [];
const pageQualityFailures = [];
const placeholderLinks = [];
const internalLinks = new Set();

await runPool(locations, async (location) => {
  const publishedUrl = new URL(location);
  const localUrl = localise(location);

  try {
    const result = await fetchPage(localUrl);
    if (!result.ok) {
      routeFailures.push({ url: localUrl.toString(), status: result.status });
      return;
    }

    pageQualityFailures.push(...inspectRenderedPage(result.body, publishedUrl.pathname));
    console.log(`✓ route ${result.status} ${publishedUrl.pathname}${publishedUrl.search}`);

    for (const match of result.body.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)) {
      const href = decodeHtml(match[1].trim());
      if (!href) continue;
      if (href === "#" || href.startsWith("javascript:")) {
        placeholderLinks.push({ source: publishedUrl.pathname, href });
        continue;
      }
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;

      const resolved = new URL(href, localUrl);
      if (resolved.origin === new URL(baseUrl).origin) {
        resolved.hash = "";
        internalLinks.add(resolved.toString());
      }
    }
  } catch (error) {
    routeFailures.push({ url: localUrl.toString(), status: error instanceof Error ? error.message : String(error) });
  }
});

const linkFailures = [];
await runPool([...internalLinks], async (link) => {
  try {
    const result = await fetchPage(link);
    if (!result.ok) linkFailures.push({ url: link, status: result.status });
    else console.log(`✓ link  ${result.status} ${new URL(link).pathname}${new URL(link).search}`);
  } catch (error) {
    linkFailures.push({ url: link, status: error instanceof Error ? error.message : String(error) });
  }
});

if (routeFailures.length > 0) {
  console.error("\nSitemap route failures:");
  for (const failure of routeFailures) console.error(`- ${failure.status} ${failure.url}`);
}

if (pageQualityFailures.length > 0) {
  console.error("\nRendered SEO/accessibility failures:");
  for (const failure of pageQualityFailures) console.error(`- ${failure.source}: ${failure.message}`);
}

if (placeholderLinks.length > 0) {
  console.error("\nPlaceholder or unsafe links:");
  for (const link of placeholderLinks) console.error(`- ${link.source} -> ${link.href}`);
}

if (linkFailures.length > 0) {
  console.error("\nInternal link failures:");
  for (const failure of linkFailures) console.error(`- ${failure.status} ${failure.url}`);
}

if (routeFailures.length > 0 || pageQualityFailures.length > 0 || placeholderLinks.length > 0 || linkFailures.length > 0) {
  process.exit(1);
}

console.log(
  `\nProduction crawl passed: ${locations.length} sitemap routes and ${internalLinks.size} unique internal CTA/link destinations returned successful responses. Every sitemap page has a language, title, description, one H1, indexable robots state and alt attributes on rendered images.`,
);
