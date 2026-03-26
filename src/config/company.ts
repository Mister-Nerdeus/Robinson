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
  tagline: "24/7 emergency septic service, pumping, evaluations, rentals, and commercial support across West Michigan.",
  trustHeadline: "Family owned and operated since 1979",
  primaryPhone: "(616) 636-5565",
  secondaryPhone: "(616) 887-2060",
  fax: "(231) 937-8383",
  email: "Call for immediate scheduling or use the online request forms.",
  address: {
    line1: "1565 N Dagget Rd",
    city: "Pierson",
    state: "MI",
    postalCode: "49339",
  },
  serviceHours: "24/7 Emergency Service • Routine scheduling available by phone or request form",
  emergencyService: {
    claim: "24/7 Emergency Service",
    status: "confirmed",
    note: "Displayed across the provided legacy site PDFs and homepage artwork.",
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
      key: "emergency_24_7",
      value: "24/7 Emergency Service",
      status: "confirmed",
      note: "Shown repeatedly in the legacy site source PDFs.",
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
      status: "confirmed",
      note: "Appears on the provided contact source PDF.",
    },
    {
      key: "sparta_address",
      value: "113 South Union, Sparta, MI 49345",
      status: "confirmed",
      note: "Appears on the provided contact source PDF as an additional location.",
    },
    {
      key: "portable_toilet_radius",
      value: "Within a 60-mile radius of the greater Grand Rapids area",
      status: "confirmed",
      note: "Presented on the provided portable toilet rental source PDF.",
    },
    {
      key: "fax_workflow",
      value: "Pump and inspection request forms can also be faxed to (231) 937-8383",
      status: "confirmed",
      note: "Listed in provided services and Realtor source PDFs.",
    },
  ],
};
