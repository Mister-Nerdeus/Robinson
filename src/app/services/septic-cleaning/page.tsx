import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "Septic Tank Cleaning",
  "Routine and priority septic tank cleaning requests with detailed intake.",
  "/services/septic-cleaning",
);

export default function SepticCleaningPage() {
  return (
    <Section title="Septic Tank Cleaning">
      <JsonLd
        data={serviceSchema(
          "Septic Tank Cleaning",
          "Routine and priority septic tank cleaning and pumping support.",
          "/services/septic-cleaning",
        )}
      />
      <p className="mb-4">Request septic cleaning and pumping with tank details and access notes.</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#c8c1b1]">
        <Image
          src="/images/curated/septic-truck.jpg"
          alt="Septic service truck prepared for scheduled pumping route"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <RequestForm type="septic-service" title="Septic Service Request" extraFields={[{ name: "tankSizeGallons", label: "Tank Size (Gallons)", required: true }]} />
    </Section>
  );
}
