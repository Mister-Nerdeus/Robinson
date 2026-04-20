import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/runtime/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/services/septic-cleaning",
    "/services/well-septic-evaluations",
    "/services/portable-toilets",
    "/services/commercial",
    "/realtors",
    "/faq",
    "/contact",
    "/privacy",
  ];

  return routes.map((path) => ({
    url: canonicalUrl(path || "/"),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
