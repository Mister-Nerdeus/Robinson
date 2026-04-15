import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { ServiceAreaBlock } from "@/components/site/ServiceAreaBlock";
import { buildMetadata } from "@/lib/seo/metadata";
import { contactContent } from "@/content/contact";
import { ContactIntakeRouter } from "@/components/forms/ContactIntakeRouter";

export const metadata: Metadata = buildMetadata(
  "Contact",
  "Contact Robinson Septic Cleaning for 24/7 emergency septic service, evaluations, rentals, and commercial support.",
  "/contact",
);

export default function ContactPage() {
  return (
    <Section title={contactContent.title}>
      <div className="grid gap-6 md:grid-cols-[1.02fr,0.98fr]">
        <div>
          <div className="mb-4 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Fastest path for urgent needs</p>
            <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Call Robinson for 24/7 emergency septic service.</h2>
            <p className="mt-3 text-sm sm:text-base">Choose the request lane that best matches your need. General contact stays available as a fallback.</p>
          </div>
          <p className="mb-2">{contactContent.intro}</p>
          <p className="mb-2 text-sm text-slate-700">{contactContent.callout}</p>
          <p className="mb-4 text-sm">{contactContent.responseNote}</p>
          <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
            <Image src="/images/enhanced/truck_full_ai_enhanced.jpg" alt="Robinson service truck ready for field dispatch" width={1200} height={720} className="h-[280px] w-full object-cover" />
          </div>
          <div className="mb-4">
            <ServiceAreaBlock />
          </div>
        </div>
        <ContactIntakeRouter />
      </div>
    </Section>
  );
}