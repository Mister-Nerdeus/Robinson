import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { CommercialSupportGrid } from "@/components/services/CommercialSupportGrid";
import { RequestForm } from "@/components/forms/RequestForm";
import { TaskPageLayout } from "@/components/layout/TaskPageLayout";

export const metadata: Metadata = buildMetadata(
  "Commercial Services",
  "Operationally distinct commercial lanes for grease trap, lift pump, and septic support.",
  "/services/commercial",
);

const workTypeMap: Record<string, "grease-trap" | "lift-pump" | "septic-pumping" | "inspection"> = {
  "grease-trap": "grease-trap",
  "lift-pump": "lift-pump",
  "septic-pumping": "septic-pumping",
  "catch-all": "inspection",
};

type CommercialPageProps = {
  searchParams?: Promise<{ work?: string | string[] }>;
};

export default async function CommercialPage({ searchParams }: CommercialPageProps) {
  const params = (await searchParams) ?? {};
  const requestedWork = Array.isArray(params.work) ? params.work[0] : params.work;
  const initialServiceNeeded = requestedWork ? workTypeMap[requestedWork] : undefined;

  return (
    <Section title="Commercial Services" layout="task">
      <div className="grid gap-5">
        <div className="rounded-2xl border border-[#d8c1c1] bg-[#fff1ef] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Commercial Operations</p>
          <h2 className="mt-2 font-display text-3xl text-[var(--brand)]">Choose the exact commercial service lane.</h2>
          <p className="mt-3 text-sm text-slate-700">
            Grease trap, lift pump, and commercial septic paths are intentionally split so requests route without ambiguity. A catch-all troubleshooting path is still available when work type is uncertain.
          </p>
        </div>
        <TaskPageLayout
          route="/services/commercial"
          mode="supportRail"
          primary={
            <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4">
              <p className="text-sm text-slate-700">
                Use the commercial lane for structured facility, access-window, and urgency details before dispatch follow-up.
              </p>
            </div>
          }
          support={<CommercialSupportGrid />}
        />
        <TaskPageLayout
          route="/services/commercial"
          mode="formDominant"
          primary={
            <RequestForm
              type="commercial-service"
              title="Request Commercial Service"
              initialValues={initialServiceNeeded ? { serviceNeeded: initialServiceNeeded } : undefined}
            />
          }
          primaryClassName="task-page-form-shell"
        />
      </div>
    </Section>
  );
}
