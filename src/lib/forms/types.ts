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
  streetAddress: string;
  city: string;
  zip: string;
  state: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  urgency: "normal" | "urgent" | "emergency";
  message: string;
};

export type GeneralSubmissionRecord = SubmissionBase & {
  type: "general";
  topic: string;
  serviceLocationInvolved: "yes" | "no" | "unsure";
};

export type SepticServiceSubmissionRecord = SubmissionBase & {
  type: "septic-service";
  tankSizeGallons: "500" | "750" | "1000" | "1250" | "1500" | "2000-plus" | "unknown";
  tankCount: "1" | "2" | "3-plus" | "unknown";
  lidsExposed: "yes" | "no" | "unknown";
  tankLocationKnown: "yes" | "no" | "unsure";
  problemSigns: string[];
  additionalWarningDetails: string;
  accessIssues: string[];
  dispatchContactName: string;
  dispatchContactPhone: string;
  truckAccessLevel: "direct" | "limited" | "blocked" | "unknown";
  occupancyAtService: "occupied" | "vacant" | "tenant-occupied" | "unknown";
};

export type EvaluationSubmissionRecord = SubmissionBase & {
  type: "evaluation";
  roleInSale: "buyer" | "seller" | "realtor" | "other";
  deadlineType: "closing-date" | "inspection-contingency" | "financing-window" | "other";
  brokerageOrCompany: string;
  closingDate: string;
  timelineFlexibility: "firm-date" | "plus-minus-2-days" | "week-window";
  occupancyStatus: string;
  accessContactName: string;
  accessContactPhone: string;
  accessInstructions: string;
  transactionNotes: string;
  utilityOnStatus: "yes" | "no" | "unknown";
  occupantPresent: "yes" | "no" | "unknown";
  propertyType: "single-family" | "multi-family" | "vacant-land" | "other";
};

export type RentalSubmissionRecord = SubmissionBase & {
  type: "rental";
  eventType: string;
  unitCount: string;
  rentalDuration: string;
  serviceFrequency: string;
  siteType: string;
  handwashStationNeeded: "yes" | "no";
  adaUnitNeeded: "yes" | "no";
  placementSurface: "grass" | "gravel" | "pavement" | "mixed" | "unknown";
  siteAccessNotes: string;
};

export type CommercialServiceSubmissionRecord = SubmissionBase & {
  type: "commercial-service";
  facilityName: string;
  facilityType: string;
  serviceNeeded: string;
  greaseTrapCount: string;
  onSiteContact: string;
  accessHours: string;
  greaseTrapLocation: "indoor" | "outdoor" | "mixed" | "unknown";
  previousServiceHistoryKnown: "yes" | "no" | "unknown";
  serviceUrgency: "normal" | "urgent" | "emergency";
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

function formatList(values: string[]) {
  return values.length ? values.join(", ") : "-";
}

function formatLocation(record: SubmissionRecord) {
  if (record.streetAddress && record.city && record.zip) {
    return `${record.streetAddress}, ${record.city}, ${record.state || "MI"} ${record.zip}`;
  }

  return record.address || "-";
}

export function getSubmissionSummaryFields(record: SubmissionRecord): SubmissionSummaryField[] {
  const shared = [
    { label: "Urgency", value: record.urgency },
    { label: "Preferred Date", value: record.preferredDate || "-" },
    { label: "Preferred Time", value: record.preferredTime || "-" },
    { label: "Street", value: record.streetAddress || "-" },
    { label: "City", value: record.city || "-" },
    { label: "ZIP", value: record.zip || "-" },
    { label: "Address", value: formatLocation(record) },
  ];

  switch (record.type) {
    case "general":
      return [
        { label: "Topic", value: record.topic },
        { label: "Service Location Involved", value: record.serviceLocationInvolved },
        ...shared,
      ];
    case "septic-service":
      return [
        { label: "Tank Size", value: record.tankSizeGallons },
        { label: "Tank Count", value: record.tankCount },
        { label: "Lids Exposed", value: record.lidsExposed },
        { label: "Tank Location Known", value: record.tankLocationKnown },
        { label: "Problem Signs", value: formatList(record.problemSigns) },
        { label: "Warning Details", value: record.additionalWarningDetails || "-" },
        { label: "Access Issues", value: formatList(record.accessIssues) },
        { label: "Dispatch Contact", value: record.dispatchContactName || "-" },
        { label: "Dispatch Contact Phone", value: record.dispatchContactPhone || "-" },
        { label: "Truck Access", value: record.truckAccessLevel },
        { label: "Occupancy At Service", value: record.occupancyAtService },
        ...shared,
      ];
    case "evaluation":
      return [
        { label: "Sale Role", value: record.roleInSale },
        { label: "Primary Deadline", value: record.deadlineType },
        { label: "Closing Date", value: record.closingDate || "-" },
        { label: "Timeline Flexibility", value: record.timelineFlexibility || "-" },
        { label: "Brokerage", value: record.brokerageOrCompany || "-" },
        { label: "Occupancy", value: record.occupancyStatus },
        { label: "Utility On", value: record.utilityOnStatus },
        { label: "Occupant Present", value: record.occupantPresent },
        { label: "Property Type", value: record.propertyType },
        { label: "Access Contact", value: record.accessContactName || "-" },
        { label: "Access Contact Phone", value: record.accessContactPhone || "-" },
        { label: "Access Instructions", value: record.accessInstructions || "-" },
        { label: "Transaction Notes", value: record.transactionNotes || "-" },
        ...shared,
      ];
    case "rental":
      return [
        { label: "Event Type", value: record.eventType },
        { label: "Units", value: record.unitCount },
        { label: "Duration", value: record.rentalDuration },
        { label: "Service Frequency", value: record.serviceFrequency },
        { label: "Site Type", value: record.siteType },
        { label: "Handwash Needed", value: record.handwashStationNeeded },
        { label: "ADA Unit Needed", value: record.adaUnitNeeded },
        { label: "Placement Surface", value: record.placementSurface },
        { label: "Site Access Notes", value: record.siteAccessNotes || "-" },
        ...shared,
      ];
    case "commercial-service":
      return [
        { label: "Facility", value: record.facilityName },
        { label: "Facility Type", value: record.facilityType },
        { label: "Service Needed", value: record.serviceNeeded },
        { label: "Trap Count", value: record.greaseTrapCount },
        { label: "On-site Contact", value: record.onSiteContact },
        { label: "Grease Trap Location", value: record.greaseTrapLocation },
        { label: "Previous Service Known", value: record.previousServiceHistoryKnown },
        { label: "Service Urgency", value: record.serviceUrgency },
        ...shared,
      ];
  }
}
