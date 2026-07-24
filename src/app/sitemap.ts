import type { MetadataRoute } from "next";
import { applications, industries, productFamilies } from "@/data/catalog";
const base = "https://urechem-website.vercel.app";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/products/complete-range",
    "/products/compare",
    "/products/ureshield-waterproofing-grouting-systems",
    "/products/injection-grouting-systems",
    "/products/tpu-materials",
    "/applications",
    "/industries",
    "/technical-center",
    "/technical-center/documents",
    "/technical-center/testing-validation",
    "/technical-center/ai-document-search",
    "/technical-center/expert-validation",
    "/innovation-rd",
    "/about",
    "/contact",
    "/ai-solution-finder",
    "/ask-urechem-ai",
    "/technical-brief-builder",
    "/privacy",
    "/terms",
    "/legal",
  ];
  return [
    ...staticRoutes.map((url) => ({ url: `${base}${url}`, changeFrequency: "monthly" as const })),
    ...productFamilies.flatMap((f) => [
      { url: `${base}/products/${f.slug}`, changeFrequency: "monthly" as const },
      ...f.products.map((p) => ({ url: `${base}/products/${f.slug}/${p.slug}`, changeFrequency: "monthly" as const })),
    ]),
    ...applications.map((a) => ({ url: `${base}/applications/${a.slug}`, changeFrequency: "monthly" as const })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}`, changeFrequency: "monthly" as const })),
  ];
}
