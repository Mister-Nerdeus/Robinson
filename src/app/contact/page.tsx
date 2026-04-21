import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/config/company";
import { PrimaryCallBand } from "@/components/contact/PrimaryCallBand";
import { AvailabilityNotice } from "@/components/contact/AvailabilityNotice";
import { LocationCard } from "@/components/contact/LocationCard";
import { ContactIntakeRouter } from "@/components/forms/ContactIntakeRouter";
import type { SubmissionType } from "@/lib/forms/types";
import { TaskPageLayout } from "@/components/layout/TaskPageLayout";

export const metadata: Metadata = buildMetadata(
  "Contact Command Center",
  `Emergency, pumping, evaluations, rentals, and commercial support routing for ${company.publicBrand}.`,
  "/contact",
);

const contactLaneSet: ReadonlySet<SubmissionType> = new Set([
  "general",
  "septic-service",
  "evaluation",
  "rental",
  "commercial-service",
]);

type ContactPageProps = {
  searchParams?: Promise<{
    lane?: string | string[];
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const laneParam = resolvedSearchParams.lane;
  const requestedLane = Array.isArray(laneParam) ? laneParam[0] : laneParam;
  const initialLane =
    requestedLane && contactLaneSet.has(requestedLane as SubmissionType)
      ? (requestedLane as SubmissionType)
      : null;

  return (
    <Section title="Contact Command Center" layout="task">
      <div className="grid gap-5">
        <PrimaryCallBand />
        <TaskPageLayout
          route="/contact"
          mode="support-rail"
          primary={
            <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Request routing</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Choose a lane, then complete the active step flow.</h3>
              <p className="mt-2 text-sm text-slate-700">
                Emergency needs should still call first. Lane selection keeps form steps focused and route-ready.
              </p>
            </div>
          }
          support={
            <div className="grid gap-5">
              <AvailabilityNotice />
              <LocationCard />
            </div>
          }
        />
        <TaskPageLayout
          route="/contact"
          mode="full-width"
          primary={<ContactIntakeRouter initialLane={initialLane} />}
          primaryClassName="task-page-form-shell"
        />
      </div>
    </Section>
  );
}
