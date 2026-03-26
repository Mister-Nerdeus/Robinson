import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";
import { servicesContent } from "@/content/services";

export const metadata: Metadata = buildMetadata(
  "Well and Septic Evaluations",
  "Evaluation requests for buyers, sellers, and Realtor workflows.",
  "/services/well-septic-evaluations",
);

export default function WellSepticEvaluationsPage() {
  return (
    <Section title="Well & Septic Evaluations">
      <JsonLd
        data={serviceSchema(
          "Well and Septic Evaluations",
          "Home-sale well and septic evaluations for buyers, sellers, and local Realtor workflows.",
          "/services/well-septic-evaluations",
        )}
      />
      <p className="mb-4 text-slate-800">{servicesContent.evaluations.intro}</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
        <Image
          src="/images/curated/evaluation-site.jpg"
          alt="Property evaluation visit prepared for a Robinson home-sale workflow"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <ul className="mb-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
        {servicesContent.evaluations.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
      <div className="mb-4 rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm text-slate-800">
        Robinson works with local Realtors, buyers, and sellers, and legacy source material points to a typical 1-3 business day turnaround for this lane when scheduling allows.
      </div>
      <div className="mb-4 rounded-md bg-[#f5eded] p-3">
        <Link className="font-semibold underline" href="/realtors">Open Realtor Resources</Link>
      </div>
      <RequestForm
        type="well-septic-evaluation"
        title="Evaluation / Realtor Request"
        extraFields={[
          { name: "roleInSale", label: "Role in Sale (buyer, seller, realtor)", required: true },
          { name: "realtorCompany", label: "Realtor Company" },
        ]}
      />
    </Section>
  );
}
