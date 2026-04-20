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
  `${company.publicBrand} provides emergency septic service, routine pumping, home-sale evaluations, portable toilet rentals, and commercial support across West Michigan.`,
  "/",
);

export default function HomePage() {
  return (
    <div
      data-homepage-contract="home-hero-lanes-trust-v1"
      data-homepage-route="/"
      data-homepage-structure="hero-primary-task-ctas-service-lanes-trust-realtor-faq-final-cta"
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
                Call Emergency Service
              </a>
              <Link href={homeContent.hero.ctaHref} className="rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)]">
                {homeContent.hero.ctaLabel}
              </Link>
              <Link href="/realtors" className="rounded-md border border-[#d8c1c1] bg-[#fff7f6] px-5 py-3 font-semibold text-slate-900">
                Open Realtor Evaluation Lane
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

      <Section title="Primary task CTAs">
        <div className="grid gap-4 md:grid-cols-3">
          {homeContent.primaryTaskCtas.map((item) => (
            <article key={item.title} className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">{item.title}</h3>
              <p className="mt-2 text-slate-800">{item.body}</p>
              <Link href={item.href} className="mt-4 inline-flex font-semibold underline">
                {item.ctaLabel}
              </Link>
            </article>
          ))}
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
        <CtaBand heading="Need help right now? Call Robinson for 24/7 Emergency Service or open the structured request lanes." href="/contact" label="Open Contact Intake Lanes" />
      </Section>
    </div>
  );
}
