import type { MetadataRoute } from "next";
import { getRuntimeEnv } from "@/lib/runtime/env";

export default function robots(): MetadataRoute.Robots {
  const env = getRuntimeEnv();
  const shouldIndex = env.mode === "production" && env.seoAllowIndexing;

  return {
    rules: shouldIndex
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    host: env.siteUrl,
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}