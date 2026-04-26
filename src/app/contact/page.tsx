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
          mode="supportRail"
          primary={
            <div className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Request routing</p>
              <h3 className="mt-2 font-display text-2xl text-[var(--brand)]">Choose a lane, then start the first step immediately.</h3>
              <p className="mt-2 text-sm text-slate-700">
                Emergency needs should still call first (24/7 response line). Routine scheduling runs{" "}
                {company.serviceHoursContract.normalBusinessHoursLabel}.
              </p>
            </div>
          }
          support={
            <div className="grid gap-5 rounded-xl border border-[#d8c1c1] bg-[#fffdfb] p-4">
              <p className="text-sm text-slate-700">
                Keep pre-form context short. Availability and location detail are placed right after the active form.
              </p>
            </div>
          }
        />
        <TaskPageLayout
          route="/contact"
          mode="formDominant"
          primary={<ContactIntakeRouter initialLane={initialLane} />}
          primaryClassName="task-page-form-shell"
        />
        <TaskPageLayout
          route="/contact"
          mode="fullWidthSupport"
          primary={
            <div className="grid gap-5 lg:grid-cols-2">
              <AvailabilityNotice />
              <LocationCard />
            </div>
          }
        />
      </div>
    </Section>
  );
}
