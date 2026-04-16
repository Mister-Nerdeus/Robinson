export const submissionTypes = [
  "general",
  "septic-service",
  "evaluation",
  "rental",
  "commercial-service",
] as const;

export const submissionLifecycleStates = [
  "new",
  "in-progress",
  "scheduled",
  "closed",
] as const;

export type SubmissionType = (typeof submissionTypes)[number];
export type SubmissionLifecycleState = (typeof submissionLifecycleStates)[number];

export type SubmissionBase = {
  id: string;
  createdAt: string;
  triageUpdatedAt: string;
  lifecycleState: SubmissionLifecycleState;
  internalNote: string;
  type: SubmissionType;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  preferredDate: string;
  urgency: "normal" | "urgent" | "emergency";
  message: string;
};

export type GeneralSubmissionRecord = SubmissionBase & {
  type: "general";
  topic: string;
};

export type SepticServiceSubmissionRecord = SubmissionBase & {
  type: "septic-service";
  tankSizeGallons: string;
  tankCount: string;
  lidsExposed: "yes" | "no" | "unknown";
  backupSigns: string;
};

export type EvaluationSubmissionRecord = SubmissionBase & {
  type: "evaluation";
  roleInSale: "buyer" | "seller" | "realtor" | "other";
  brokerageOrCompany: string;
  closingDate: string;
  occupancyStatus: string;
};

export type RentalSubmissionRecord = SubmissionBase & {
  type: "rental";
  eventType: string;
  unitCount: string;
  rentalDuration: string;
  serviceFrequency: string;
  siteType: string;
};

export type CommercialServiceSubmissionRecord = SubmissionBase & {
  type: "commercial-service";
  facilityName: string;
  facilityType: string;
  serviceNeeded: string;
  greaseTrapCount: string;
  onSiteContact: string;
};

export type SubmissionRecord =
  | GeneralSubmissionRecord
  | SepticServiceSubmissionRecord
  | EvaluationSubmissionRecord
  | RentalSubmissionRecord
  | CommercialServiceSubmissionRecord;

export type SubmissionSummaryField = {
  label: string;
  value: string;
};

export function getSubmissionSummaryFields(record: SubmissionRecord): SubmissionSummaryField[] {
  const shared = [
    { label: "Urgency", value: record.urgency },
    { label: "Preferred Date", value: record.preferredDate || "-" },
    { label: "Address", value: record.address || "-" },
  ];

  switch (record.type) {
    case "general":
      return [{ label: "Topic", value: record.topic }, ...shared];
    case "septic-service":
      return [
        { label: "Tank Size", value: record.tankSizeGallons },
        { label: "Tank Count", value: record.tankCount },
        { label: "Lids Exposed", value: record.lidsExposed },
        ...shared,
      ];
    case "evaluation":
      return [
        { label: "Sale Role", value: record.roleInSale },
        { label: "Closing Date", value: record.closingDate || "-" },
        { label: "Brokerage", value: record.brokerageOrCompany || "-" },
        ...shared,
      ];
    case "rental":
      return [
        { label: "Event Type", value: record.eventType },
        { label: "Units", value: record.unitCount },
        { label: "Duration", value: record.rentalDuration },
        ...shared,
      ];
    case "commercial-service":
      return [
        { label: "Facility", value: record.facilityName },
        { label: "Facility Type", value: record.facilityType },
        { label: "Service Needed", value: record.serviceNeeded },
        ...shared,
      ];
  }
}