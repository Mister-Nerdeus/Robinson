import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
  "24/7 Emergency Septic Service, Evaluations, Rentals, and Commercial Support",
  "Family owned and operated since 1979, Robinson Septic Cleaning provides 24/7 emergency service, residential and commercial septic pumping, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  "/",
);

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessSchema()} />
      <Section>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Emergency service and core service highlights</p>
            <h2 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">Start with the most urgent call, then move straight to the right service lane.</h2>
            <p className="mt-2 max-w-3xl text-slate-700">The rotating panel now carries Robinson’s emergency message along with septic pumping, portable toilets, commercial support, and home-sale evaluations so the homepage stays focused without repeating the same content twice.</p>
          </div>
        </div>
        <HomeSlideshow slides={homeContent.slideshow} />
      </Section>
      <Section title="Fast paths for the work Robinson handles every day">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/truck_closeup_ai_enhanced.jpg"
              alt="Robinson Septic truck ready for emergency or scheduled service"
              width={1200}
              height={760}
              className="h-[240px] w-full object-cover sm:h-[260px]"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Emergency and routine service</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">Call fast for backups, slow drains, overdue pumping, or warning signs.</h3>
              <p className="mt-3 text-slate-800">
                Robinson handles urgent septic problems and routine pumping with one clear path for homeowners, landlords, and commercial customers who need service scheduled without extra back-and-forth.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/portable_toilet_single_ai_enhanced.jpg"
              alt="Robinson portable toilet rental unit ready for delivery"
              width={1200}
              height={760}
              className="h-[240px] w-full object-cover sm:h-[260px]"
            />
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Beyond septic pumping</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">Portable rentals, Realtor support, grease traps, and lift pumps all stay visible.</h3>
              <p className="mt-3 text-slate-800">
                Customers can quickly see that Robinson also supports events, job sites, home sales, restaurants, and facilities instead of burying those services under general septic-only messaging.
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
            <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
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
      <Section title="Fast ways to reach the right service team">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Emergency septic</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Get urgent help moving</h3>
            <p className="mt-3 text-sm text-slate-800">Customers immediately see that Robinson handles emergency septic calls 24/7, which makes the fastest next step obvious when a problem cannot wait.</p>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Real-estate lane</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Keep closings on schedule</h3>
            <p className="mt-3 text-sm text-slate-800">Buyers, sellers, and Realtors get a direct path for evaluations, property notes, and timing details when a sale is already on the clock.</p>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial and rentals</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Cover sites, events, and facilities</h3>
            <p className="mt-3 text-sm text-slate-800">Portable toilets, grease traps, and lift pump service stay visible so customers can request the right work without guessing where to start.</p>
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
              src="/images/enhanced/tech_evaluation_ai_enhanced.jpg"
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
        <CtaBand heading="Need help right now? Call Robinson for 24/7 emergency septic service or use the online request forms." href="/contact" label="Open Contact and Request Forms" />
      </Section>
    </>
  );
}
