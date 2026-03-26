import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { ServiceAreaBlock } from "@/components/site/ServiceAreaBlock";
import { contactContent } from "@/content/contact";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Reach Robinson Septic Cleaning for general questions and scheduling support.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Section title={contactContent.title}>
      <div className="grid gap-6 md:grid-cols-[1.02fr,0.98fr]">
        <div>
          <p className="mb-2">{contactContent.intro}</p>
          <p className="mb-2 text-sm text-slate-700">{contactContent.callout}</p>
          <p className="mb-4 text-sm">{contactContent.responseNote}</p>
          <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
            <Image src="/current/img01.jpg" alt="Robinson service truck ready for field dispatch" width={1200} height={720} className="h-[280px] w-full object-cover" />
          </div>
          <div className="mb-4">
            <ServiceAreaBlock />
          </div>
        </div>
        <RequestForm type="general-contact" title="General Contact Request" />
      </div>
    </Section>
  );
}
