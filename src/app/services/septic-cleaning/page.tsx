import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
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
      <p className="mb-4 text-slate-800">{servicesContent.septicCleaning.intro}</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
        <Image
          src="/images/curated/septic-truck.jpg"
          alt="Robinson Septic truck staged for a scheduled pumping route"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <ul className="mb-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
        {servicesContent.septicCleaning.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
      <RequestForm type="septic-service" title="Septic Service Request" extraFields={[{ name: "tankSizeGallons", label: "Tank Size (Gallons)", required: true }]} />
    </Section>
  );
}
