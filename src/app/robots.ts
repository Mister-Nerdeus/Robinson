import type { MetadataRoute } from "next";
import { getRuntimeEnv } from "@/lib/runtime/env";

export default function robots(): MetadataRoute.Robots {
  const env = getRuntimeEnv();

  return {
    rules: env.seoAllowIndexing
      ? {
          userAgent: "*",
          allow: "/",
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${env.siteUrl}/sitemap.xml`,
  };
}
