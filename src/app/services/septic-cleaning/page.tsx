import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = buildMetadata(
  "Septic Tank Cleaning",
  "24/7 emergency septic pumping, tank location help, and practical scheduling support from Robinson Septic Cleaning.",
  "/services/septic-cleaning",
);

export default function SepticCleaningPage() {
  return (
    <Section title="Septic Tank Cleaning">
      <JsonLd
        data={serviceSchema(
          "Septic Tank Cleaning",
          "Residential and commercial septic tank pumping with 24/7 emergency service, tank location help, access notes, and route scheduling support.",
          "/services/septic-cleaning",
        )}
      />
      <div className="mb-5 rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">24/7 Emergency Service</p>
        <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">When your septic system backs up, Robinson should be easy to reach.</h2>
        <p className="mt-3 text-sm sm:text-base">This page now sells both urgent response and routine pumping instead of treating all septic work like a generic maintenance request.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-[1.15fr,0.85fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.septicCleaning.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/truck_closeup_ai_enhanced.jpg" alt="Robinson septic tanker and hose setup on route" width={1000} height={640} className="h-[240px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/images/enhanced/truck_full_ai_enhanced.jpg" alt="Robinson septic truck at a residential property" width={1000} height={640} className="h-[240px] w-full object-cover" />
            </div>
          </div>
          <ul className="mt-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.septicCleaning.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <div className="mt-5 rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
            <h3 className="font-display text-2xl text-[var(--brand)]">Why customers use this lane</h3>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {servicesContent.septicCleaning.sellingPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <RequestForm type="septic-service" title="Septic Service Request" extraFields={[{ name: "tankSizeGallons", label: "Tank Size (Gallons)", required: true }]} />
      </div>
    </Section>
  );
}
