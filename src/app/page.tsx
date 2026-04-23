import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { LaneGrid } from "@/components/home/LaneGrid";
import { FaqPreview } from "@/components/home/FaqPreview";
import { homeContent } from "@/content/home";
import { trustContent } from "@/content/trust";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { localBusinessSchema } from "@/lib/seo/schema";
import { company } from "@/config/company";
import { publicBusinessFacts } from "@/content/businessFacts";

export const metadata: Metadata = buildMetadata(
  "24/7 Emergency Septic Service, Home-Sale Evaluations, and Portable Rentals",
  `${company.publicBrand} provides emergency septic service, routine pumping, home-sale evaluations, portable toilet rentals, and commercial support across West Michigan.`,
  "/",
);

export default function HomePage() {
  return (
    <div
      data-homepage-contract="home-hero-router-trust-proof-faq-final-v2"
      data-homepage-route="/"
      data-homepage-structure="hero-lane-router-conversion-proof-faq-final-cta"
    >
      <JsonLd data={localBusinessSchema()} />

      <Section layout="marketing">
        <div className="grid gap-6 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{homeContent.hero.eyebrow}</p>
            <h1 className="mt-2 max-w-4xl font-display text-3xl text-[var(--brand)] sm:text-4xl md:text-5xl">{homeContent.hero.heading}</h1>
            <p className="mt-3 max-w-3xl text-slate-700">{homeContent.hero.subheading}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`tel:${publicBusinessFacts.phoneSemantics.emergencyLine.number}`} className="rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">
                Call Emergency Dispatch
              </a>
              <Link href={homeContent.hero.ctaHref} className="rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
                {homeContent.hero.ctaLabel}
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/truck_full_ai_enhanced.jpg"
              alt="Robinson Septic service truck ready for dispatch"
              width={1200}
              height={780}
              className="h-[280px] w-full object-cover sm:h-[330px]"
            />
          </div>
        </div>
      </Section>

      <Section title="Choose your task lane" layout="marketing">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>

      <Section title={homeContent.conversionProof.title} layout="marketing">
        <div className="grid gap-5 md:grid-cols-[1.15fr,0.85fr] md:items-start">
          <div className="rounded-2xl border border-[#c5d3bd] bg-[linear-gradient(145deg,#edf4e7,#e2edd8)] p-5">
            <h3 className="font-display text-[1.75rem] leading-tight text-[var(--brand)]">Local proof customers can trust</h3>
            <ul className="mt-3 grid gap-1.5 pl-5 text-sm text-slate-800">
              {trustContent.points.map((point) => (
                <li key={point} className="list-disc">
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-700">{trustContent.trustStatement}</p>
          </div>
          <div className="rounded-2xl border border-[#d9cbc1] bg-[#fffaf3] p-5">
            <p className="text-sm text-slate-800">{homeContent.conversionProof.body}</p>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {homeContent.conversionProof.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
            <Link
              href={homeContent.conversionProof.ctaHref}
              className="mt-4 inline-flex min-h-11 items-center rounded-md border border-[var(--brand)] px-4 py-3 text-sm font-semibold text-[var(--brand)]"
            >
              {homeContent.conversionProof.ctaLabel}
            </Link>
          </div>
        </div>
      </Section>

      <Section title="Helpful questions before service" layout="marketing">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>

      <Section layout="marketing">
        <CtaBand heading="Need help right now? Call Robinson for 24/7 Emergency Service or open the structured request lanes." href="/contact" label="Open Contact Intake Lanes" />
      </Section>
    </div>
  );
}
