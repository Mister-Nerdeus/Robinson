import type { Metadata } from "next";
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
      <div className="grid gap-4">
        <p className="text-slate-800">
          Need a well and septic evaluation during the home buying or selling process? Robinson works with local Realtors, buyers, and sellers to help keep transaction timelines moving.
        </p>
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff7f6] p-4 text-sm text-slate-800">
          Our evaluation request lane is designed to capture property details, timeline needs, and contact information up front. Legacy source material indicates this workflow is often completed within 1-3 business days when scheduling allows.
        </div>
        <ul className="grid gap-2 rounded-2xl border border-[#ead6d6] bg-[var(--surface)] p-4 text-sm text-slate-700">
          <li>• Built for buyers, sellers, and Realtors.</li>
          <li>• Helps collect property access notes before dispatch follow-up.</li>
          <li>• Replaces the old fax/email-first workflow with a cleaner digital intake path.</li>
        </ul>
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
