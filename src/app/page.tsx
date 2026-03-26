import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  "Septic Cleaning, Evaluations, Rentals, and Support Service",
  "Family owned and operated since 1979, Robinson Septic Cleaning provides residential and commercial septic service, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Hero {...homeContent.hero} />
      <Section>
        <div className="overflow-hidden rounded-xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
          <Image
            src="/images/curated/home-crew.jpg"
            alt="Robinson Septic service truck and equipment ready for field work"
            width={1400}
            height={700}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </Section>
      <Section title="Direct service lanes for the work Robinson actually does">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>
      <Section title="Why local customers and Realtors use Robinson">
        <HomeTrust points={trustContent.points} />
        <p className="mt-4 max-w-4xl text-sm text-slate-700">{trustContent.trustStatement}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {homeContent.proofPoints.map((point) => (
            <div key={point} className="rounded-xl border border-[#ead6d6] bg-[#fff9f8] px-4 py-3 text-sm font-semibold text-slate-800">
              {point}
            </div>
          ))}
        </div>
      </Section>
      <Section title={homeContent.realtorLane.title}>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-6">
          <p className="max-w-3xl text-base text-slate-800">{homeContent.realtorLane.body}</p>
          <Link href={homeContent.realtorLane.href} className="mt-4 inline-block rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
            {homeContent.realtorLane.ctaLabel}
          </Link>
        </div>
      </Section>
      <Section title="Helpful questions before you call or submit a request">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>
      <Section>
        <CtaBand heading="Not sure which request lane fits your job?" href="/contact" label="Open General Contact Form" />
      </Section>
    </>
  );
}
