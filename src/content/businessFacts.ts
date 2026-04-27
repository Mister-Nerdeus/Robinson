import { company } from "@/config/company";

export type FactStatus = "verified" | "marketing" | "pending-verification";

export type BusinessFact = {
  key: string;
  label: string;
  value: string;
  status: FactStatus;
  public: boolean;
  notes: string;
};

export type PublicPhoneSemanticRole = "emergency_line" | "primary_service_line" | "secondary_office_line";

export type PublicPhoneSemantic = {
  role: PublicPhoneSemanticRole;
  label: string;
  number: string;
  dominant: boolean;
  placementNote: string;
};

const emergencyAndPrimaryNumber = company.primaryPhone;
const secondaryOfficeNumber = company.secondaryPhone || "";

export const publicBusinessFacts = {
  businessName: company.publicBrand,
  legalName: company.legalName,
  phoneSemantics: {
    emergencyLine: {
      role: "emergency_line",
      label: "Emergency dispatch line (call first)",
      number: emergencyAndPrimaryNumber,
      dominant: true,
      placementNote: "Always shown as the highest-priority action for active septic emergencies.",
    } as PublicPhoneSemantic,
    primaryServiceLine: {
      role: "primary_service_line",
      label: "Primary service scheduling line",
      number: emergencyAndPrimaryNumber,
      dominant: true,
      placementNote: "Dominant public line for routine scheduling, requests, and callback routing.",
    } as PublicPhoneSemantic,
    secondaryOfficeLine: {
      role: "secondary_office_line",
      label: "Secondary office line",
      number: secondaryOfficeNumber,
      dominant: false,
      placementNote: "Shown only as subordinate support contact when needed.",
    } as PublicPhoneSemantic,
  },
  primaryServiceLine: emergencyAndPrimaryNumber,
  additionalOfficeLine: secondaryOfficeNumber,
  primaryAddress: {
    line1: company.address.line1,
    city: company.address.city,
    state: company.address.state,
    postalCode: company.address.postalCode,
  },
  serviceHours: company.serviceHours,
  hoursSummary: `${company.serviceHoursContract.normalBusinessHoursLabel} routine scheduling; 24/7 emergency call-first response.`,
  normalBusinessHours: company.serviceHoursContract.normalBusinessHoursLabel,
  emergencyResponsePolicy: company.serviceHoursContract.emergencyResponsePolicy,
  usesSharedDispatchNumber: true,
};

export const publicPhoneSemanticsMap: PublicPhoneSemantic[] = [
  publicBusinessFacts.phoneSemantics.emergencyLine,
  publicBusinessFacts.phoneSemantics.primaryServiceLine,
  publicBusinessFacts.phoneSemantics.secondaryOfficeLine,
];

export const businessFactRegistry: BusinessFact[] = [
  {
    key: "business_name",
    label: "Public business name",
    value: publicBusinessFacts.businessName,
    status: "verified",
    public: true,
    notes: "Canonical customer-facing business name.",
  },
  {
    key: "phone_semantic_emergency",
    label: "Emergency line semantic",
    value: `${publicBusinessFacts.phoneSemantics.emergencyLine.number} (${publicBusinessFacts.phoneSemantics.emergencyLine.label})`,
    status: "verified",
    public: true,
    notes: "Emergency lane remains call-first and dominant.",
  },
  {
    key: "phone_semantic_primary",
    label: "Primary service line semantic",
    value: `${publicBusinessFacts.phoneSemantics.primaryServiceLine.number} (${publicBusinessFacts.phoneSemantics.primaryServiceLine.label})`,
    status: "verified",
    public: true,
    notes: "Primary public call path for routine and scheduled work.",
  },
  {
    key: "phone_semantic_secondary",
    label: "Secondary office line semantic",
    value: `${publicBusinessFacts.phoneSemantics.secondaryOfficeLine.number} (${publicBusinessFacts.phoneSemantics.secondaryOfficeLine.label})`,
    status: "verified",
    public: true,
    notes: "Secondary office line must remain clearly subordinate in placement.",
  },
  {
    key: "primary_address",
    label: "Primary address",
    value: `${publicBusinessFacts.primaryAddress.line1}, ${publicBusinessFacts.primaryAddress.city}, ${publicBusinessFacts.primaryAddress.state} ${publicBusinessFacts.primaryAddress.postalCode}`,
    status: "verified",
    public: true,
    notes: "Canonical published office address.",
  },
  {
    key: "normal_business_hours",
    label: "Normal business hours",
    value: publicBusinessFacts.normalBusinessHours,
    status: "verified",
    public: true,
    notes: "Canonical normal office scheduling hours shown on public surfaces.",
  },
  {
    key: "emergency_response_policy",
    label: "Emergency response policy",
    value: publicBusinessFacts.emergencyResponsePolicy,
    status: "verified",
    public: true,
    notes: "Explicitly separates 24/7 emergency response from normal office scheduling hours.",
  },
  {
    key: "sparta_legacy_address",
    label: "Legacy Sparta address",
    value: "113 South Union, Sparta, MI 49345",
    status: "pending-verification",
    public: false,
    notes: "Retained for owner verification only; excluded from customer UI.",
  },
  {
    key: "legacy_secondary_phone_variant",
    label: "Legacy secondary phone variant",
    value: "(231) 937-8282",
    status: "pending-verification",
    public: false,
    notes: "Unverified historical line; excluded from customer UI.",
  },
];

export const publicBusinessFactTable = businessFactRegistry.filter((fact) => fact.public);
