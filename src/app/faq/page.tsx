import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { faqContent } from "@/content/faq";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "FAQ",
  "Common questions about septic service, evaluations, rentals, and scheduling.",
  "/faq",
);

export default function FaqPage() {
  return (
    <Section title="FAQ">
      <JsonLd data={faqSchema()} />
      <div className="mb-6 grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-slate-800">
            These are the questions customers ask most often before booking septic service, planning a home-sale evaluation, or arranging portable toilet rentals. Use the answers below to get your bearings, then call for urgent problems or use the request form that matches the service you need.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
          <Image src="/images/enhanced/truck_closeup_ai_enhanced.jpg" alt="Robinson septic truck close-up for service and FAQ context" width={1200} height={720} className="h-[220px] w-full object-cover" />
        </div>
      </div>
      <div className="grid gap-3">
        {faqContent.map((item) => (
          <article className="rounded-lg border border-[#c8c1b1] bg-[var(--surface)] p-4" key={item.question}>
            <h3 className="font-display text-2xl text-[var(--brand)]">{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
