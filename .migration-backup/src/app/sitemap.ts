import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { PRODUCT_PAGES } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    ...PRODUCT_PAGES.map((p) => `/${p.slug}`),
    "/terms",
    "/privacy",
  ];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "monthly" : "yearly",
    priority: path === "" ? 1 : 0.7,
  }));
}
