import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Realtor Resources",
  "Well and septic evaluation requests for Realtors, buyers, and sellers.",
  "/realtors",
);

export default function RealtorsPage() {
  return (
    <Section title="Realtor Resources">
      <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-4">
          <p className="text-slate-800">
            Need a well and septic evaluation during the home buying or selling process? Robinson works with local
            Realtors, buyers, and sellers to help keep transaction timelines moving.
          </p>

          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm leading-8 text-slate-800">
            Robinson uses this form to gather the property address, access instructions, contact information, and sale
            timing details that help the office schedule the evaluation and respond faster.
          </div>

          <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[var(--surface)] p-4 text-sm leading-8 text-slate-700">
            <li>• Built for Realtors, buyers, and sellers who need a clear evaluation request process.</li>
            <li>• Helps the office review property details before returning the call.</li>
            <li>• Makes it easier to submit access notes, occupancy details, and scheduling information up front.</li>
            <li>• Keeps home-sale evaluation requests organized when timing matters.</li>
          </ul>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
          <Image
            src="/images/enhanced/tech_evaluation_ai_enhanced.jpg"
            alt="Robinson team member on site during a property-service visit"
            width={1000}
            height={780}
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-6">
        <RequestForm
          type="well-septic-evaluation"
          title="Realtor Evaluation Request"
          extraFields={[
            { name: "roleInSale", label: "Role in Sale", required: true },
            { name: "realtorCompany", label: "Brokerage / Office" },
          ]}
        />
      </div>
    </Section>
  );
}
