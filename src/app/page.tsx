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
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
              24/7 emergency service, pumping, rentals, and evaluations
            </p>
            <h2 className="mt-2 max-w-5xl font-display text-2xl text-[var(--brand)] sm:text-3xl md:text-5xl">
              Call fast for septic emergencies, routine pumping, portable toilets, and home-sale support.
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Robinson helps homeowners, businesses, event organizers, buyers, sellers, and Realtors reach the right service without guesswork.
            </p>
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
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">
                Backups, slow drains, warning signs, and overdue pumping all have a clear next step.
              </h3>
              <p className="mt-3 text-slate-800">
                Robinson gives homeowners, landlords, and commercial customers a faster path to urgent septic help or scheduled pumping without getting lost in a general contact page.
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
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)] sm:text-3xl">
                Portable rentals, Realtor support, grease traps, and lift pumps stay easy to find.
              </h3>
              <p className="mt-3 text-slate-800">
                The homepage makes it clear that Robinson handles more than one type of call, which helps events, job sites, restaurants, and home-sale customers move faster.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Local offers and business trust signals">
        <div className="grid gap-5 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Website coupon</p>
            <div className="mt-4 overflow-hidden rounded-xl border border-[#e1d1c8] bg-[#faf4e7] p-4">
              <Image
                src="/current/coupon.gif"
                alt="Robinson Septic Cleaning coupon for ten dollars off any service"
                width={900}
                height={360}
                className="h-auto w-full rounded-md object-contain"
              />
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-800">
              Robinson&apos;s legacy website promoted a <span className="font-semibold">$10.00 off any service</span> website coupon. Customers can mention the website coupon code when scheduling service.
            </p>
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Association membership</p>
              <div className="mt-4 flex items-center gap-4 rounded-xl border border-[#ead6d6] bg-[#fff9f8] p-4">
                <Image
                  src="/current/mi-septic-tank-assoc-logo.gif"
                  alt="Michigan Septic Tank Association logo"
                  width={120}
                  height={120}
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
                <p className="text-base font-semibold leading-7 text-slate-800">
                  Robinson Septic Cleaning LLC is a member of the Michigan Septic Tank Association.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Facebook and local visibility</p>
              <div className="mt-4 rounded-xl border border-[#d4abab] bg-[#b3131f] px-5 py-4 text-center">
                <span className="text-3xl font-bold tracking-tight text-white">facebook</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-800">
                The legacy marketing materials also highlighted Robinson&apos;s Facebook presence alongside phone-first service, coupons, and local trust signals.
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
            <p className="mt-3 text-sm text-slate-800">
              Make the emergency number and online request path obvious when a backup, overflow, or warning sign needs a quick response.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Real-estate lane</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Keep closings on schedule</h3>
            <p className="mt-3 text-sm text-slate-800">
              Give buyers, sellers, and Realtors a cleaner place to submit property notes, access details, and deadline-sensitive evaluation requests.
            </p>
          </div>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial and rentals</p>
            <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Cover sites, events, and facilities</h3>
            <p className="mt-3 text-sm text-slate-800">
              Keep portable toilets, grease traps, and lift pump support visible so commercial customers can move straight to the right request lane.
            </p>
          </div>
        </div>
      </Section>

      <Section title={homeContent.realtorLane.title}>
        <div className="grid gap-5 md:grid-cols-[1.05fr,0.95fr] md:items-stretch">
          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-6">
            <p className="max-w-3xl text-base leading-8 text-slate-800">{homeContent.realtorLane.body}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#ead6d6] bg-white px-4 py-3 text-sm text-slate-800">
                <p className="font-semibold text-[var(--brand)]">Built for time-sensitive requests</p>
                <p className="mt-1">A cleaner path for sale deadlines, property access, and evaluation scheduling.</p>
              </div>
              <div className="rounded-xl border border-[#ead6d6] bg-white px-4 py-3 text-sm text-slate-800">
                <p className="font-semibold text-[var(--brand)]">Useful before the call back</p>
                <p className="mt-1">Property details, buyer or seller context, and notes can be submitted up front.</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={homeContent.realtorLane.href} className="inline-flex items-center rounded-md border border-[var(--brand)] px-5 py-3 font-semibold text-[var(--brand)] transition hover:bg-[#fff3f2]">
                {homeContent.realtorLane.ctaLabel}
              </Link>
              <Link href="/services/well-septic-evaluations" className="inline-flex items-center rounded-md bg-[var(--brand)] px-5 py-3 font-semibold text-white transition hover:opacity-95">
                Request an Evaluation
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
            <Image
              src="/images/enhanced/tech_evaluation_ai_enhanced.jpg"
              alt="Robinson field technician working through a residential service or evaluation visit"
              width={900}
              height={700}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section title="Helpful questions before you call or submit a request">
        <FaqPreview items={homeContent.faqPreview} />
      </Section>

      <Section>
        <CtaBand
          heading="Need help right now? Call Robinson for 24/7 emergency septic service or use the online request forms."
          href="/contact"
          label="Open Contact and Request Forms"
        />
      </Section>
    </>
  );
}
