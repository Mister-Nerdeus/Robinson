import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { ServiceAreaBlock } from "@/components/site/ServiceAreaBlock";
import { contactContent } from "@/content/contact";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Reach Robinson Septic Service for general service questions and scheduling support.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Section title={contactContent.title}>
      <p className="mb-2">{contactContent.intro}</p>
      <p className="mb-4 text-sm">{contactContent.responseNote}</p>
      <div className="mb-4">
        <ServiceAreaBlock />
      </div>
      <RequestForm type="general-contact" title="General Contact Request" />
    </Section>
  );
}
