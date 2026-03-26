import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
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
      <div className="grid gap-6 md:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.commercial.intro}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/current/grease-01-tmb.jpg" alt="Grease trap related field work and service context" width={1000} height={720} className="h-[240px] w-full object-cover" />
            </div>
            <div className="overflow-hidden rounded-xl border border-[#d3c0c0]">
              <Image src="/current/img01.jpg" alt="Robinson support truck staged for commercial or route work" width={1000} height={720} className="h-[240px] w-full object-cover" />
            </div>
          </div>
          <ul className="mb-5 mt-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.commercial.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <Link className="mt-2 inline-block font-semibold underline" href="/contact">
            Request Commercial Support
          </Link>
        </div>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-6">
          <h3 className="font-display text-3xl text-[var(--brand)]">Support work that should be easy to reach</h3>
          <p className="mt-3 text-slate-800">
            Grease trap cleaning and lift pump problems can affect restaurants, facilities, and pressurized septic systems quickly. This lane keeps that work visible so Robinson can review the job without forcing commercial customers through generic residential-only messaging.
          </p>
          <ul className="mt-4 grid gap-2 text-sm text-slate-700">
            {servicesContent.commercial.sellingPoints.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
