export type ClaimStatus = "confirmed" | "do-not-publish-yet";

export type BusinessClaim = {
  key: string;
  value: string;
  status: ClaimStatus;
  note: string;
};

export type CompanyProfile = {
  legalName: string;
  publicBrand: string;
  tagline: string;
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
  legalName: "Robinson Septic Service",
  publicBrand: "Robinson Septic Service",
  tagline: "Septic cleaning, home-sale evaluations, and portable toilet rentals.",
  primaryPhone: "(717) 555-0147",
  email: "service@robinsonseptic.com",
  address: {
    line1: "120 Robinson Lane",
    city: "Carlisle",
    state: "PA",
    postalCode: "17013",
  },
  serviceHours: "Monday-Friday 7:00 AM-5:00 PM",
  emergencyService: {
    claim: "After-hours response may be available for active service customers.",
    status: "confirmed",
    note: "Softened wording approved; no blanket 24/7 promise.",
  },
  claims: [
    {
      key: "family_owned",
      value: "Family-owned local service company",
      status: "confirmed",
      note: "Approved for public trust copy.",
    },
    {
      key: "years_in_business",
      value: "Serving local customers since 1988",
      status: "confirmed",
      note: "Approved for publication in trust copy.",
    },
    {
      key: "bbb_accreditation",
      value: "BBB accreditation",
      status: "do-not-publish-yet",
      note: "Retain as blocked until independently verified.",
    },
    {
      key: "fax_workflow",
      value: "Fax intake is retired; use phone or online forms",
      status: "confirmed",
      note: "Approved retirement decision.",
    },
  ],
};
