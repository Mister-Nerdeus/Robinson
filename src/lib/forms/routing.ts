import type { SubmissionInput } from "@/lib/forms/schema";
import type { SubmissionType, TerritoryAssignment } from "@/lib/forms/types";

const territoryMap = [
  {
    id: "montcalm-core",
    label: "Montcalm Core",
    cities: ["pierson", "howard city", "coral", "trufant"],
    zipPrefixes: ["49339", "49329", "49322", "49347"],
  },
  {
    id: "kent-core",
    label: "Kent Core",
    cities: ["sparta", "cedar springs", "sand lake", "grand rapids"],
    zipPrefixes: ["49345", "49319", "49343", "495"],
  },
] as const;

const officeByLane: Record<SubmissionType, { officeId: string; officeLabel: string }> = {
  general: { officeId: "intake-desk", officeLabel: "Intake Desk" },
  "septic-service": { officeId: "septic-dispatch", officeLabel: "Septic Dispatch" },
  evaluation: { officeId: "evaluation-desk", officeLabel: "Evaluation Desk" },
  rental: { officeId: "rental-desk", officeLabel: "Rental Desk" },
  "commercial-service": { officeId: "commercial-desk", officeLabel: "Commercial Desk" },
};

function normalize(value: string | undefined): string {
  return (value || "").trim().toLowerCase();
}

function territoryFromLocation(city: string | undefined, zip: string | undefined) {
  const normalizedCity = normalize(city);
  const normalizedZip = (zip || "").trim();

  for (const territory of territoryMap) {
    if (territory.cities.some((city) => city === normalizedCity)) {
      return territory;
    }

    if (territory.zipPrefixes.some((prefix) => normalizedZip.startsWith(prefix))) {
      return territory;
    }
  }

  return {
    id: "west-michigan-fallback",
    label: "West Michigan Fallback",
  };
}

export function assignTerritoryAndOffice(submission: Pick<SubmissionInput, "type" | "city" | "zip">): TerritoryAssignment {
  const territory = territoryFromLocation(submission.city, submission.zip);
  const office = officeByLane[submission.type];

  return {
    territoryId: territory.id,
    territoryLabel: territory.label,
    officeId: office.officeId,
    officeLabel: office.officeLabel,
    routingRule: "territory-v1-city-zip-plus-lane",
  };
}

export const routingCoverageByLane = officeByLane;
