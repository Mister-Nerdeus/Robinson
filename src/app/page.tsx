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
import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata(
  "24/7 Emergency Septic Service, Home-Sale Evaluations, and Portable Rentals",
  "Family owned and operated since 1979, Robinson Septic Cleaning provides emergency septic service, routine pumping, home-sale evaluations, portable toilet rentals, and commercial support.",
  "/",
);

export default function HomePage() {
  return (
    <>
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

      <Section title="Choose the service you need">
        <LaneGrid lanes={homeContent.lanes} />
      </Section>

      <Section title="Emergency, routine service, and home-sale support">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Emergency septic calls</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Call now for active backups and urgent warnings</h3>
            <p className="mt-2 text-sm text-slate-800">The fastest response starts with a direct call, then a quick request with property notes if needed.</p>
            <Link href="/services/septic-cleaning" className="mt-4 inline-flex font-semibold underline">
              Open septic service
            </Link>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Routine pumping</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Schedule before small issues become big repairs</h3>
            <p className="mt-2 text-sm text-slate-800">Share tank location, access details, and preferred dates so service can be planned quickly.</p>
            <Link href="/services/septic-cleaning" className="mt-4 inline-flex font-semibold underline">
              Request routine service
            </Link>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Realtor and home-sale evaluations</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Keep transaction deadlines moving</h3>
            <p className="mt-2 text-sm text-slate-800">Buyers, sellers, and agents can submit contacts, property details, and timing priorities in one place.</p>
            <Link href="/realtors" className="mt-4 inline-flex font-semibold underline">
              Open Realtor resources
            </Link>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <HomeSlideshow slides={homeContent.slideshow} />
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

      <Section title="Portable rentals and commercial support">
        <div className="grid gap-5 md:grid-cols-[1fr,1fr]">
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/portable_toilets_group_ai_enhanced.jpg"
              alt="Portable toilet rentals prepared for delivery"
              width={1200}
              height={760}
              className="h-[260px] w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">Portable toilets for events and job sites</h3>
              <p className="mt-2 text-slate-800">Request unit counts, delivery windows, and maintenance schedules for short-term or long-term rentals.</p>
              <Link href="/services/portable-toilets" className="mt-4 inline-flex font-semibold underline">
                Request portable rental
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/truck_closeup_ai_enhanced.jpg"
              alt="Robinson truck supporting commercial septic work"
              width={1200}
              height={760}
              className="h-[260px] w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">Commercial grease trap and lift pump service</h3>
              <p className="mt-2 text-slate-800">Restaurants and facilities can request commercial work directly, with site contacts and system notes included up front.</p>
              <Link href="/services/commercial" className="mt-4 inline-flex font-semibold underline">
                Request commercial service
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Helpful questions before service">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>

      <Section>
        <CtaBand heading="Need help right now? Call Robinson for 24/7 Emergency Service or submit a request online." href="/contact" label="Open Contact and Request Forms" />
      </Section>
    </>
  );
}
