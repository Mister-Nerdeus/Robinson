import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
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
          "Portable toilet rental and service planning for events, homes, businesses, schools, and job sites.",
          "/services/portable-toilets",
        )}
      />
      <p className="mb-4 text-slate-800">{servicesContent.portableToilets.intro}</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
        <Image
          src="/images/curated/portable-units.jpg"
          alt="Portable toilet units ready for Robinson delivery and service"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <ul className="mb-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
        {servicesContent.portableToilets.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
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
