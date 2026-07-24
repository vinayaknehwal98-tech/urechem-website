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

if (placeholderLinks.length > 0) {
  console.error("\nPlaceholder or unsafe links:");
  for (const link of placeholderLinks) console.error(`- ${link.source} -> ${link.href}`);
}

if (linkFailures.length > 0) {
  console.error("\nInternal link failures:");
  for (const failure of linkFailures) console.error(`- ${failure.status} ${failure.url}`);
}

if (routeFailures.length > 0 || placeholderLinks.length > 0 || linkFailures.length > 0) process.exit(1);

console.log(
  `\nProduction crawl passed: ${locations.length} sitemap routes and ${internalLinks.size} unique internal CTA/link destinations returned successful responses with no placeholder links.`,
);
