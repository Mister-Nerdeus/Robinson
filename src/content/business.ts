import { serviceAreaContract } from "@/content/serviceAreas";
import { publicBusinessFacts } from "@/content/businessFacts";

export const businessContent = {
  name: publicBusinessFacts.businessName,
  legalName: publicBusinessFacts.legalName,
  primaryPhone: publicBusinessFacts.primaryServiceLine,
  contactPoints: [
    {
      type: "customer service",
      telephone: publicBusinessFacts.primaryServiceLine,
      areaServed: serviceAreaContract.summary,
      availableLanguage: ["en"],
    },
  ],
  areaServed: serviceAreaContract.areas.map((entry) => ({ county: entry.county, cities: entry.cities })),
};
