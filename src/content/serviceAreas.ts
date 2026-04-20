export type ServiceAreaEntry = {
  county: string;
  cities: string[];
  status: "verified" | "legacy-reference";
  notes: string;
};

export const serviceAreaContract = {
  radiusMilesFromGrandRapids: 60,
  radiusStatus: "legacy-reference" as const,
  summary:
    "Robinson serves West Michigan with a core footprint around Pierson, Sparta, Cedar Springs, Sand Lake, Trufant, Coral, Howard City, and greater Grand Rapids.",
  areas: [
    {
      county: "Kent County",
      cities: ["Sparta", "Cedar Springs", "Sand Lake", "Grand Rapids"],
      status: "verified" as const,
      notes: "Public lane copy can reference county + city coverage.",
    },
    {
      county: "Montcalm County",
      cities: ["Pierson", "Howard City", "Coral", "Trufant"],
      status: "verified" as const,
      notes: "Legacy and current material align on these service points.",
    },
  ] as ServiceAreaEntry[],
};
