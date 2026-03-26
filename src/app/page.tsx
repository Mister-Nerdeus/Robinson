import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { LaneGrid } from "@/components/home/LaneGrid";
import { FaqPreview } from "@/components/home/FaqPreview";
import { HomeTrust } from "@/components/home/HomeTrust";
import { homeContent } from "@/content/home";
import { trustContent } from "@/content/trust";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { localBusinessSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "Septic Service, Evaluations, and Rentals",
  "Robinson Septic Service provides septic tank cleaning, home-sale evaluations, and portable toilet rentals.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero {...homeContent.hero} />
      <Section>
        <div className="overflow-hidden rounded-xl border border-[#c8c1b1]">
          <Image
            src="/images/curated/home-crew.jpg"
            alt="Robinson Septic Service crew vehicle staged for local service dispatch"
            width={1400}
            height={700}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </Section>
      <Section title="Choose Your Request Lane">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>
      <Section title="Trust and Process">
        <HomeTrust points={trustContent.points} />
        <p className="mt-3 text-sm">{trustContent.trustStatement}</p>
      </Section>
      <Section title="FAQ Preview">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>
      <Section>
        <CtaBand heading="Need help choosing the right request?" href="/contact" label="Open General Contact Form" />
      </Section>
    </>
  );
}
