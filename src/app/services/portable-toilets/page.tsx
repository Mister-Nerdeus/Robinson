import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "Portable Toilet Rentals",
  "Portable toilet rental requests for events and job sites.",
  "/services/portable-toilets",
);

export default function PortableToiletsPage() {
  return (
    <Section title="Portable Toilet Rentals">
      <JsonLd
        data={serviceSchema(
          "Portable Toilet Rentals",
          "Portable toilet rental and service planning for events and job sites.",
          "/services/portable-toilets",
        )}
      />
      <p className="mb-4">Rental requests stay distinct from septic-service requests.</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#c8c1b1]">
        <Image
          src="/images/curated/portable-units.jpg"
          alt="Portable toilet units arranged for event and jobsite delivery"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <RequestForm
        type="portable-toilet-rental"
        title="Portable Toilet Rental Request"
        extraFields={[
          { name: "eventType", label: "Event / Jobsite Type", required: true },
          { name: "unitCount", label: "Unit Count", required: true },
        ]}
      />
    </Section>
  );
}
