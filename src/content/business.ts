import { company } from "@/config/company";
import { serviceAreaContract } from "@/content/serviceAreas";

export const businessContent = {
  name: company.publicBrand,
  legalName: company.legalName,
  primaryPhone: company.primaryPhone,
  contactPoints: [
    {
      type: "customer service",
      telephone: company.primaryPhone,
      areaServed: serviceAreaContract.summary,
      availableLanguage: ["en"],
    },
  ],
  areaServed: serviceAreaContract.areas.map((entry) => ({ county: entry.county, cities: entry.cities })),
};
