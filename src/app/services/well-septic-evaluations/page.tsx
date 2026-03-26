import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/lib/seo/JsonLd";
import { serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildMetadata(
  "Well and Septic Evaluations",
  "Home-sale and realtor well and septic evaluation requests.",
  "/services/well-septic-evaluations",
);

export default function WellSepticEvaluationsPage() {
  return (
    <Section title="Well & Septic Evaluations">
      <JsonLd
        data={serviceSchema(
          "Well and Septic Evaluations",
          "Evaluation requests for buyers, sellers, and real estate workflows.",
          "/services/well-septic-evaluations",
        )}
      />
      <p className="mb-4">Use this lane for home-sale and realtor workflow requests.</p>
      <div className="mb-4 overflow-hidden rounded-xl border border-[#c8c1b1]">
        <Image
          src="/images/curated/evaluation-site.jpg"
          alt="Technician preparing for a property evaluation visit"
          width={1200}
          height={640}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="mb-4 rounded-md bg-[#edf3e8] p-3">
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
