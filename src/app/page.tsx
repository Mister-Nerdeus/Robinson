import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(
  "24/7 Emergency Septic Service, Home-Sale Evaluations, and Portable Rentals",
  "Family owned and operated since 1979, Robinson Septic Cleaning provides emergency septic service, routine pumping, home-sale evaluations, portable toilet rentals, and commercial support.",
  "/",
);

export default function HomePage() {
  return (
    <div
      data-homepage-contract="home-hero-lanes-trust-v1"
      data-homepage-route="/"
      data-homepage-structure="hero-lanes-trust-specialty-faq-cta"
    >
      <JsonLd data={localBusinessSchema()} />

      <Section>
        <div className="grid gap-6 lg:grid-cols-[1.08fr,0.92fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{homeContent.hero.eyebrow}</p>
            <h1 className="mt-2 max-w-4xl font-display text-3xl text-[var(--brand)] sm:text-4xl md:text-5xl">{homeContent.hero.heading}</h1>
            <p className="mt-3 max-w-3xl text-slate-700">{homeContent.hero.subheading}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`tel:${company.primaryPhone}`} className="rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white">
                Call Now
              </a>
              <Link href={homeContent.hero.ctaHref} className="rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
                {homeContent.hero.ctaLabel}
              </Link>
              <Link href="/realtors" className="rounded-md border border-[#d8c1c1] bg-[#fff7f6] px-5 py-3 font-semibold text-slate-900">
                Realtor Evaluation Request
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

      <Section title="Service lanes">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>

      <Section title="Built on proven local trust">
        <div className="grid gap-5 md:grid-cols-[1.15fr,0.85fr] md:items-start">
          <div>
            <HomeTrust points={trustContent.points} />
            <p className="mt-4 max-w-4xl text-sm text-slate-700">{trustContent.trustStatement}</p>
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

      <Section title="Specialty lanes">
        <div className="grid gap-5 md:grid-cols-[1fr,1fr]">
          {homeContent.specialtyLanes.map((lane) => (
            <div key={lane.title} className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
              <Image src={lane.image} alt={lane.alt} width={1200} height={760} className="h-[260px] w-full object-cover" />
              <div className="p-5">
                <h3 className="font-display text-2xl text-[var(--brand)]">{lane.title}</h3>
                <p className="mt-2 text-slate-800">{lane.body}</p>
                <Link href={lane.href} className="mt-4 inline-flex font-semibold underline">
                  {lane.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title={homeContent.realtorLane.title}>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-5">
          <p className="text-slate-800">{homeContent.realtorLane.body}</p>
          <Link href={homeContent.realtorLane.href} className="mt-4 inline-flex font-semibold underline">
            {homeContent.realtorLane.ctaLabel}
          </Link>
        </div>
      </Section>

      <Section title="Helpful questions before service">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>

      <Section>
        <CtaBand heading="Need help right now? Call Robinson for 24/7 Emergency Service or submit a request online." href="/contact" label="Open Contact and Request Forms" />
      </Section>
    </div>
  );
}
