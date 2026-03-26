import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/Section";
import { RequestForm } from "@/components/forms/RequestForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata(
  "Realtor Resources",
  "Dedicated request path for home-sale well and septic evaluations.",
  "/realtors",
);

export default function RealtorsPage() {
  return (
    <Section title="Realtor Resources">
      <div className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-4">
          <p className="text-slate-800">
            Need a well and septic evaluation during the home buying or selling process? Robinson works with local Realtors, buyers, and sellers to help keep transaction timelines moving.
          </p>
          <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm text-slate-800">
            This request lane is designed to capture property details, deadline pressure, access notes, and contact information up front so the office can review the job faster and follow up with clearer scheduling.
          </div>
          <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[var(--surface)] p-4 text-sm text-slate-700">
            <li>• Built for buyers, sellers, and Realtors.</li>
            <li>• Legacy source materials describe evaluations typically completed within 1 to 3 business days.</li>
            <li>• Helps collect property access notes before dispatch follow-up.</li>
            <li>• Gives the office one place to review sale-related timing needs.</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#d3c0c0] bg-[var(--surface)] shadow-sm">
          <Image src="/images/enhanced/tech_evaluation_ai_enhanced.jpg" alt="Robinson team member on site during a property-service visit" width={1000} height={780} className="h-full min-h-[320px] w-full object-cover" />
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
