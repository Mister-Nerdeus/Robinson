import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/config/company";

export const metadata: Metadata = buildMetadata("Terms", "Service terms and website usage expectations.", "/terms");

export default function TermsPage() {
  return (
    <Section title="Terms" layout="marketing">
      <div className="grid gap-4 text-sm text-slate-700">
        <p>
          This website provides service-intake and contact routing for {company.publicBrand}.
          Final scheduling, scope, and pricing are confirmed directly by owner/ops follow-up.
        </p>
        <p>
          Emergency response depends on dispatch availability, weather, and site access conditions.
          Online submission does not guarantee immediate dispatch for active emergencies.
        </p>
        <p>
          Service quotes may change when site conditions, tank access, lane-specific details, or
          regulatory requirements differ from intake assumptions.
        </p>
        <p>
          By submitting request details, you confirm you are authorized to provide contact and site-access
          information for service coordination.
        </p>
        <p>
          Submission export and suppression actions are restricted to authenticated owner/ops review workflows.
        </p>
      </div>
    </Section>
  );
}
