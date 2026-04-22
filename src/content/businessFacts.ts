export type FactStatus = "verified" | "marketing" | "pending-verification";

export type BusinessFact = {
  key: string;
  label: string;
  value: string;
  status: FactStatus;
  public: boolean;
  notes: string;
};

export const publicBusinessFacts = {
  businessName: "Robinson Septic Cleaning",
  legalName: "Robinson Septic Tank Cleaning LLC",
  primaryServiceLine: "(616) 636-5565",
  additionalOfficeLine: "(616) 887-2060",
  primaryAddress: {
    line1: "1565 N Dagget Rd",
    city: "Pierson",
    state: "MI",
    postalCode: "49339",
  },
  serviceHours: "24/7 Emergency Service • Routine scheduling available by phone or request form",
};

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
    key: "primary_service_line",
    label: "Primary service line",
    value: publicBusinessFacts.primaryServiceLine,
    status: "verified",
    public: true,
    notes: "Dominant customer call-to-action line across public routes.",
  },
  {
    key: "additional_office_line",
    label: "Additional office line",
    value: publicBusinessFacts.additionalOfficeLine,
    status: "verified",
    public: true,
    notes: "Secondary office line shown as non-primary support contact.",
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
