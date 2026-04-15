import type { Metadata } from "next";
import { company } from "@/config/company";
import { canonicalUrl, getRuntimeEnv } from "@/lib/runtime/env";

const baseTitle = company.publicBrand;

export function buildMetadata(title: string, description: string, path: string): Metadata {
  const env = getRuntimeEnv();
  const canonical = canonicalUrl(path);

  return {
    title: `${title} | ${baseTitle}`,
    description,
    metadataBase: new URL(env.siteUrl),
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description,
      type: "website",
      url: canonical,
    },
  };
}
