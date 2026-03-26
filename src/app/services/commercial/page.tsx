import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import Image from "next/image";
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
      <p className="mb-4 text-slate-800">{servicesContent.commercial.intro}</p>
      <div className="my-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
        <Image
          src="/images/curated/commercial-service.jpg"
          alt="Robinson commercial support equipment staged for route service"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <ul className="mb-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
        {servicesContent.commercial.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
      <Link className="mt-2 inline-block font-semibold underline" href="/contact">
        Request Commercial Support
      </Link>
    </Section>
  );
}
