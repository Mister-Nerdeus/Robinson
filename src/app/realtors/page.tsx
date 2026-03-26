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
      <p className="mb-4">Dedicated lane for real-estate workflows and evaluation coordination.</p>
      <RequestForm
        type="well-septic-evaluation"
        title="Realtor Evaluation Request"
        extraFields={[
          { name: "roleInSale", label: "Role in Sale", required: true },
          { name: "realtorCompany", label: "Brokerage / Office" },
        ]}
      />
    </Section>
  );
}
