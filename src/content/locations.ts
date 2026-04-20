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
    streetAddress: "1565 N Dagget Rd",
    city: "Pierson",
    state: "MI",
    postalCode: "49339",
    status: "published",
    publicFacing: true,
    mapEligible: true,
    notes: "Primary public-facing office location.",
    phone: "(616) 636-5565",
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
    notes: "Referenced in legacy material; not published as an active office location.",
  },
];

export const publishedLocations = publicLocations.filter(
  (location) => location.publicFacing && location.status === "published",
);
