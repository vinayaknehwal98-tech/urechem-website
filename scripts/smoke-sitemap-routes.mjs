import process from "node:process";

const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";
const sitemapUrl = new URL("/sitemap.xml", baseUrl);

async function request(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { status: response.status, ok: response.ok, finalUrl: response.url };
}

const sitemapResponse = await fetch(sitemapUrl);
if (!sitemapResponse.ok) {
  console.error(`Unable to load sitemap: ${sitemapResponse.status} ${sitemapUrl}`);
  process.exit(1);
}

const sitemap = await sitemapResponse.text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].replaceAll("&amp;", "&"));

if (locations.length === 0) {
  console.error("No routes were found in sitemap.xml");
  process.exit(1);
}

const failures = [];
const concurrency = 8;
let cursor = 0;

async function worker() {
  while (cursor < locations.length) {
    const index = cursor++;
    const publishedUrl = new URL(locations[index]);
    const localUrl = new URL(`${publishedUrl.pathname}${publishedUrl.search}`, baseUrl);

    try {
      const result = await request(localUrl);
      if (!result.ok) failures.push({ url: localUrl.toString(), status: result.status });
      else console.log(`✓ ${result.status} ${publishedUrl.pathname}${publishedUrl.search}`);
    } catch (error) {
      failures.push({ url: localUrl.toString(), status: error instanceof Error ? error.message : String(error) });
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, locations.length) }, () => worker()));

if (failures.length > 0) {
  console.error("\nSitemap route failures:");
  for (const failure of failures) console.error(`- ${failure.status} ${failure.url}`);
  process.exit(1);
}

console.log(`\nSitemap smoke test passed: ${locations.length} routes returned successful responses.`);
