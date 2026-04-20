import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/config/company";
import { PrimaryCallBand } from "@/components/contact/PrimaryCallBand";
import { ContactLaneGrid } from "@/components/contact/ContactLaneGrid";
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
          primary={<ContactIntakeRouter initialLane={initialLane} />}
          support={
            <div className="grid gap-5">
              <AvailabilityNotice />
              <LocationCard />
            </div>
          }
        />
        <details className="rounded-xl border border-[#d8c1c1] bg-[#fff8f7] p-4">
          <summary className="cursor-pointer text-sm font-semibold text-[var(--brand)]">
            Need a different lane?
          </summary>
          <div className="mt-3">
            <ContactLaneGrid />
          </div>
        </details>
      </div>
    </Section>
  );
}
