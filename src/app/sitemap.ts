import type { MetadataRoute } from "next";
import { applications, industries, productFamilies } from "@/data/catalog";
const base = "https://www.urechem.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/products/compare", "/applications", "/industries", "/technical-center", "/innovation-rd", "/about", "/contact", "/ai-solution-finder", "/ask-urechem-ai", "/technical-brief-builder"];
  return [
    ...staticRoutes.map((url) => ({ url: `${base}${url}` })),
    ...productFamilies.flatMap((f) => [{ url: `${base}/products/${f.slug}` }, ...f.products.map((p) => ({ url: `${base}/products/${f.slug}/${p.slug}` }))]),
    ...applications.map((a) => ({ url: `${base}/applications/${a.slug}` })),
    ...industries.map((i) => ({ url: `${base}/industries/${i.slug}` })),
  ];
}
