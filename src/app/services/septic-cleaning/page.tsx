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
  "Septic tank pumping, tank location help, and practical scheduling support from Robinson Septic Cleaning.",
  "/services/septic-cleaning",
);

export default function SepticCleaningPage() {
  return (
    <Section title="Septic Tank Cleaning">
      <JsonLd
        data={serviceSchema(
          "Septic Tank Cleaning",
          "Residential and commercial septic tank pumping with tank location help, access notes, and route scheduling support.",
          "/services/septic-cleaning",
        )}
      />
      <div className="grid gap-6 md:grid-cols-[1.15fr,0.85fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.septicCleaning.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/current/img05.jpg" alt="Robinson septic tanker and hose setup on route" width={1000} height={640} className="h-[240px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/current/septic-01-tmb.jpg" alt="Robinson septic truck at a residential property" width={1000} height={640} className="h-[240px] w-full object-cover" />
            </div>
          </div>
          <ul className="mt-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.septicCleaning.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
        </div>
        <RequestForm type="septic-service" title="Septic Service Request" extraFields={[{ name: "tankSizeGallons", label: "Tank Size (Gallons)", required: true }]} />
      </div>
    </Section>
  );
}
