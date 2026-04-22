import { businessFactRegistry, publicBusinessFacts } from "@/content/businessFacts";

export type PublicLocation = {
  id: "pierson-office" | "sparta-legacy";
  label: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  status: "published" | "legacy-reference" | "internal-only";
  publicFacing: boolean;
  mapEligible: boolean;
  notes: string;
  phone?: string;
};

export const publicLocations: PublicLocation[] = [
  {
    id: "pierson-office",
    label: "Pierson Office",
    streetAddress: publicBusinessFacts.primaryAddress.line1,
    city: publicBusinessFacts.primaryAddress.city,
    state: publicBusinessFacts.primaryAddress.state,
    postalCode: publicBusinessFacts.primaryAddress.postalCode,
    status: "published",
    publicFacing: true,
    mapEligible: true,
    notes: "Primary public-facing office location from canonical business facts.",
    phone: publicBusinessFacts.primaryServiceLine,
  },
  {
    id: "sparta-legacy",
    label: "Sparta Legacy Listing",
    streetAddress: "113 South Union",
    city: "Sparta",
    state: "MI",
    postalCode: "49345",
    status: "legacy-reference",
    publicFacing: false,
    mapEligible: false,
    notes:
      businessFactRegistry.find((fact) => fact.key === "sparta_legacy_address")?.notes ??
      "Referenced in legacy material; not published as an active office location.",
  },
];

export const publishedLocations = publicLocations.filter(
  (location) => location.publicFacing && location.status === "published",
);
