import type { Metadata } from "next";
import { Section } from "@/components/site/Section";
import { buildMetadata } from "@/lib/seo/metadata";
import { company } from "@/config/company";
import { ContactHero } from "@/components/contact/ContactHero";
import { PrimaryCallBand } from "@/components/contact/PrimaryCallBand";
import { ContactLaneGrid } from "@/components/contact/ContactLaneGrid";
import { AvailabilityNotice } from "@/components/contact/AvailabilityNotice";
import { LocationCard } from "@/components/contact/LocationCard";
import { ContactIntakeRouter } from "@/components/forms/ContactIntakeRouter";
import { ServiceAreaBlock } from "@/components/site/ServiceAreaBlock";
import type { SubmissionType } from "@/lib/forms/types";

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
    <Section title="Contact Command Center">
      <div className="grid gap-5">
        <PrimaryCallBand />
        <ContactHero />
        <ContactLaneGrid />
        <div className="grid gap-5 lg:grid-cols-[1.5fr,1fr]">
          <ContactIntakeRouter initialLane={initialLane} />
          <div className="grid gap-5">
            <AvailabilityNotice />
            <LocationCard />
            <ServiceAreaBlock />
          </div>
        </div>
      </div>
    </Section>
  );
}
