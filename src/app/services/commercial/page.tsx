import type { Metadata } from "next";
import { ServiceRequestPageTemplate } from "@/components/site/ServiceRequestPageTemplate";
import { getServiceTemplateEntry } from "@/content/serviceTemplates";
import { buildMetadata } from "@/lib/seo/metadata";

const entry = getServiceTemplateEntry("commercial");

export const metadata: Metadata = buildMetadata(
  entry.metadataTitle,
  entry.metadataDescription,
  entry.route,
);

export default function CommercialPage() {
  return <ServiceRequestPageTemplate entry={entry} />;
}
