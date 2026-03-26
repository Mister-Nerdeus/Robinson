import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
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
          "Home-sale well and septic evaluations for buyers, sellers, and local Realtors.",
          "/services/well-septic-evaluations",
        )}
      />
      <div className="grid gap-6 md:grid-cols-[1.05fr,0.95fr]">
        <div>
          <p className="mb-4 text-slate-800">{servicesContent.evaluations.intro}</p>
          <div className="mb-4 overflow-hidden rounded-xl border border-[#d3c0c0]">
            <Image
              src="/images/enhanced/tech_evaluation_ai_enhanced.jpg"
              alt="Robinson team member handling a residential property visit"
              width={1200}
              height={720}
              className="h-[320px] w-full object-cover"
            />
          </div>
          <ul className="mb-5 grid gap-2 rounded-2xl border border-[#ead6d6] bg-[#fff8f7] p-4 text-sm text-slate-700">
            {servicesContent.evaluations.bullets.map((bullet) => (
              <li key={bullet}>• {bullet}</li>
            ))}
          </ul>
          <div className="mb-4 rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm text-slate-800">
            Robinson works with local Realtors, buyers, and sellers and gathers the property details, access notes,
            and contact information needed to review the request and schedule the evaluation more efficiently.
          </div>
          <div className="rounded-md bg-[#f5eded] p-3">
            <Link className="font-semibold underline" href="/realtors">
              Open Realtor Resources
            </Link>
          </div>
          <div className="mt-5 rounded-2xl border border-[#d8c1c1] bg-[var(--surface)] p-5">
            <h3 className="font-display text-2xl text-[var(--brand)]">Why buyers, sellers, and Realtors use this service</h3>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {servicesContent.evaluations.sellingPoints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
        <RequestForm
          type="well-septic-evaluation"
          title="Evaluation / Realtor Request"
          extraFields={[
            { name: "roleInSale", label: "Role in Sale (buyer, seller, realtor)", required: true },
            { name: "realtorCompany", label: "Realtor Company" },
          ]}
        />
      </div>
    </Section>
  );
}
