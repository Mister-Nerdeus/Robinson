import type { Metadata } from "next";
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
