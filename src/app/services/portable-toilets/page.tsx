import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = buildMetadata(
  "Portable Toilet Rentals",
  "Portable toilet rentals for events, homes, businesses, schools, and job sites.",
  "/services/portable-toilets",
);

export default function PortableToiletsPage() {
  return (
    <Section title="Portable Toilet Rentals">
      <JsonLd
        data={serviceSchema(
          "Portable Toilet Rentals",
          "Portable toilet rental and maintenance planning for events, homes, businesses, schools, and job sites.",
          "/services/portable-toilets",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Events and site support</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Portable rental service that is easy to schedule.</h2>
        <p className="mt-3 text-sm sm:text-base">Send delivery dates, unit counts, and site instructions in one request for faster quoting and planning.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.portableToilets.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/portable_toilet_single_ai_enhanced.jpg" alt="Single Robinson portable toilet on location" width={1000} height={720} className="h-[260px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/portable_toilets_group_ai_enhanced.jpg" alt="Multiple Robinson portable toilet units staged together" width={1000} height={720} className="h-[260px] w-full object-cover" />
            </div>
          </div>
          <ul className="mb-5 mt-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.portableToilets.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">Common reasons to request</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {servicesContent.portableToilets.reasonsToCall.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
              <h3 className="font-display text-2xl text-[var(--brand)]">What to have ready</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-700">
                {servicesContent.portableToilets.whatToHaveReady.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <RequestForm type="portable-toilet-rental" title="Request Portable Toilet Rental" extraFields={[{ name: "eventType", label: "Event / Jobsite Type", required: true }, { name: "unitCount", label: "Unit Count", required: true }]} />
      </div>
    </Section>
  );
}
