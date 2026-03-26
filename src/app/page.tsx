import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { Section } from "@/components/site/Section";
import { CtaBand } from "@/components/site/CtaBand";
import { LaneGrid } from "@/components/home/LaneGrid";
import { FaqPreview } from "@/components/home/FaqPreview";
import { HomeTrust } from "@/components/home/HomeTrust";
import { HomeSlideshow } from "@/components/home/HomeSlideshow";
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
      <Section className="pt-0">
        <HomeSlideshow slides={homeContent.slideshow} />
      </Section>
      <Section title="Direct service lanes for the work Robinson actually does">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/current/img01.jpg"
              alt="Robinson Septic truck ready for a scheduled service visit"
              width={1200}
              height={760}
              className="h-[240px] w-full object-cover sm:h-[260px]"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Scheduled field service</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">Septic work that starts with better information and faster follow-up.</h3>
              <p className="mt-3 text-slate-800">
                Robinson's service forms are built to gather the property details, access notes, and timing needs that help crews route the work faster and help customers get clearer follow-up.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/current/portable-toilet-rental.jpg"
              alt="Robinson portable toilet units prepared for rental delivery"
              width={1200}
              height={760}
              className="h-[240px] w-full object-cover sm:h-[260px]"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Rental support</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">Portable toilet rentals stay easy to find and easy to request.</h3>
              <p className="mt-3 text-slate-800">
                Homes, schools, events, and job sites can route delivery questions, service cadence, and pickup details through a dedicated rental lane instead of a generic contact form.
              </p>
            </div>
          </div>
        </div>
      </Section>
      <Section title="Why local customers and Realtors use Robinson">
        <div className="grid gap-5 md:grid-cols-[1.2fr,0.8fr] md:items-start">
          <div>
            <HomeTrust points={trustContent.points} />
            <p className="mt-4 max-w-4xl text-sm text-slate-700">{trustContent.trustStatement}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-2">
              {homeContent.proofPoints.map((point) => (
                <div key={point} className="rounded-xl border border-[#ead6d6] bg-[#fff9f8] px-4 py-3 text-sm font-semibold text-slate-800">
                  {point}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-5">
            <h3 className="font-display text-2xl text-[var(--brand)]">{homeContent.trustPanel.title}</h3>
            <p className="mt-3 text-slate-800">{homeContent.trustPanel.body}</p>
            <ul className="mt-4 grid gap-2 text-sm text-slate-700">
              {homeContent.trustPanel.highlights.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section title={homeContent.realtorLane.title}>
        <div className="grid gap-5 md:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-6">
            <p className="max-w-3xl text-base text-slate-800">{homeContent.realtorLane.body}</p>
            <Link href={homeContent.realtorLane.href} className="mt-4 inline-block rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
              {homeContent.realtorLane.ctaLabel}
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/current/residential-01-tmb.jpg"
              alt="Robinson field technician working through a residential service or evaluation visit"
              width={900}
              height={700}
              className="h-full min-h-[240px] w-full object-cover"
            />
          </div>
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
