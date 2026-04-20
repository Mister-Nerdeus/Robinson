import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata("Terms", "Service terms and website usage expectations.", "/terms");

export default function TermsPage() {
  return (
    <Section title="Terms">
      <div className="grid gap-3 text-sm text-slate-700">
        <p>Use this site to request service and routing support. Operational scheduling is confirmed by direct follow-up.</p>
        <p>Emergency response depends on dispatch availability and site access conditions.</p>
      </div>
    </Section>
  );
}
