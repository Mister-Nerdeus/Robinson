import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = buildMetadata(
  "Commercial Services",
  "Commercial septic support including grease trap cleaning and lift pump service.",
  "/services/commercial",
);

export default function CommercialPage() {
  return (
    <Section title="Commercial Services">
      <JsonLd
        data={serviceSchema(
          "Commercial Services",
          "Commercial septic support including grease trap cleaning and lift pump service.",
          "/services/commercial",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial septic support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Keep facilities and operations running.</h2>
        <p className="mt-3 text-sm sm:text-base">Grease trap and lift pump issues can become urgent quickly. Send site details and service needs in one request.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.commercial.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/current/grease-01-tmb.jpg" alt="Grease trap related field work and service context" width={1000} height={720} className="h-[240px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/truck_closeup_ai_enhanced.jpg" alt="Robinson support truck staged for commercial or route work" width={1000} height={720} className="h-[240px] w-full object-cover" />
            </div>
          </div>
          <ul className="mb-5 mt-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.commercial.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">Common reasons to request</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {servicesContent.commercial.reasonsToCall.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">What to have ready</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {servicesContent.commercial.whatToHaveReady.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <Link className="mt-4 inline-block font-semibold underline" href="/contact">
            Need immediate help? Open Contact
          </Link>
        </div>
        <RequestForm type="general-contact" title="Request Commercial Service" extraFields={[{ name: "facilityName", label: "Facility or Business Name", required: true }]} />
      </div>
    </Section>
  );
}
