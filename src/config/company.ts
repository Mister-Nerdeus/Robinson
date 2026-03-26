export type ClaimStatus = "confirmed" | "provisional" | "do-not-publish-yet";

export type BusinessClaim = {
  key: string;
  value: string;
  status: ClaimStatus;
  note: string;
};

export type CompanyProfile = {
  legalName: string;
  publicBrand: string;
  brandVariants: string[];
  tagline: string;
  trustHeadline: string;
  primaryPhone: string;
  secondaryPhone?: string;
  fax?: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    postalCode: string;
  };
  serviceHours: string;
  emergencyService: {
    claim: string;
    status: ClaimStatus;
    note: string;
  };
  claims: BusinessClaim[];
};

export const company: CompanyProfile = {
  legalName: "Robinson Septic Tank Cleaning LLC",
  publicBrand: "Robinson Septic Cleaning",
  brandVariants: [
    "Robinson Septic Cleaning",
    "Robinson Septic Tank Cleaning",
    "Robinson Septic Tank Cleaning LLC",
  ],
  tagline: "Family owned and operated septic cleaning, evaluations, rentals, and support service.",
  trustHeadline: "Family owned and operated since 1979",
  primaryPhone: "(616) 636-5565",
  secondaryPhone: "(231) 937-8282",
  email: "Use the online request forms or call for scheduling.",
  address: {
    line1: "5757 Henkel Rd",
    city: "Howard City",
    state: "MI",
    postalCode: "49329",
  },
  serviceHours: "Monday-Friday 8:00 AM-5:00 PM",
  emergencyService: {
    claim: "After-hours help may be available depending on crew and routing.",
    status: "provisional",
    note: "Legacy evidence suggests emergency willingness in some cases, but no blanket 24/7 promise should be published.",
  },
  claims: [
    {
      key: "family_owned",
      value: "Family owned and operated",
      status: "confirmed",
      note: "Supported across source pack and safe for trust copy.",
    },
    {
      key: "founded_1979",
      value: "Founded in 1979",
      status: "confirmed",
      note: "Strong source-pack trust signal and safe for public use.",
    },
    {
      key: "residential_commercial",
      value: "Residential and commercial septic service",
      status: "confirmed",
      note: "Repeated across legacy site and evidence inventory.",
    },
    {
      key: "home_sale_evaluations",
      value: "Well and septic evaluations for home sales",
      status: "confirmed",
      note: "Core conversion lane discovered in source materials.",
    },
    {
      key: "portable_toilet_rentals",
      value: "Portable toilet rentals",
      status: "confirmed",
      note: "Dedicated service lane on legacy site and in PDFs.",
    },
    {
      key: "grease_trap_cleaning",
      value: "Grease trap cleaning",
      status: "confirmed",
      note: "Supported by services source PDF.",
    },
    {
      key: "lift_pump_service",
      value: "Lift pump service",
      status: "confirmed",
      note: "Supported by services source PDF.",
    },
    {
      key: "pierson_address",
      value: "1565 N Dagget Rd, Pierson, MI 49339",
      status: "provisional",
      note: "Publicly associated address that still needs owner clarification for customer-facing use.",
    },
    {
      key: "sparta_address",
      value: "113 South Union, Sparta, MI 49345",
      status: "do-not-publish-yet",
      note: "Older web-era office reference; keep out of customer-facing surfaces until confirmed.",
    },
    {
      key: "portable_toilet_radius",
      value: "Within a 60-mile radius of the greater Grand Rapids area",
      status: "provisional",
      note: "Source-supported and useful, but still treat as owner-verification-sensitive.",
    },
    {
      key: "credit_cards",
      value: "Accepts all major credit cards",
      status: "provisional",
      note: "Listing clue exists, but should be owner-verified before customer-facing publication.",
    },
    {
      key: "fax_workflow",
      value: "Legacy fax/email workflow existed for inspection requests",
      status: "provisional",
      note: "Historically true, but primary digital experience should not depend on fax.",
    },
  ],
};
