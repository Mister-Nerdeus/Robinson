import { serviceAreaContract } from "@/content/serviceAreas";
import { publicBusinessFacts } from "@/content/businessFacts";

export const businessContent = {
  name: publicBusinessFacts.businessName,
  legalName: publicBusinessFacts.legalName,
  primaryPhone: publicBusinessFacts.phoneSemantics.primaryServiceLine.number,
  contactPoints: [
    {
      type: "emergency",
      telephone: publicBusinessFacts.phoneSemantics.emergencyLine.number,
      areaServed: serviceAreaContract.summary,
      availableLanguage: ["en"],
    },
    {
      type: "customer service",
      telephone: publicBusinessFacts.phoneSemantics.primaryServiceLine.number,
      areaServed: serviceAreaContract.summary,
      availableLanguage: ["en"],
    },
  ],
  areaServed: serviceAreaContract.areas.map((entry) => ({ county: entry.county, cities: entry.cities })),
};
