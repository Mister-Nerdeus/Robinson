import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "Commercial Services",
  "Commercial septic and support service scheduling.",
  "/services/commercial",
);

export default function CommercialPage() {
  return (
    <Section title="Commercial Services">
      <JsonLd
        data={serviceSchema(
          "Commercial Services",
          "Commercial route service and project scheduling support.",
          "/services/commercial",
        )}
      />
      <p>Commercial support remains visible as its own service route for recurring and project-based work.</p>
      <div className="my-4 overflow-hidden rounded-xl border border-[#c8c1b1]">
        <Image
          src="/images/curated/commercial-service.jpg"
          alt="Commercial service equipment staged for recurring support route"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <Link className="mt-2 inline-block font-semibold underline" href="/contact">
        Request Commercial Support
      </Link>
    </Section>
  );
}
