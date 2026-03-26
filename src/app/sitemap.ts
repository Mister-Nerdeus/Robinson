import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "http://localhost:4850";
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
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
