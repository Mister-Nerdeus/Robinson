import type { Metadata } from "next";
import { company } from "@/config/company";

const baseTitle = company.publicBrand;

export function buildMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | ${baseTitle}`,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${baseTitle}`,
      description,
      type: "website",
      url: path,
    },
  };
}
