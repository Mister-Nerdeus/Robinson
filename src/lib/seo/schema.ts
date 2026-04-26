import { company } from "@/config/company";
import { faqContent } from "@/content/faq";
import { serviceAreaContract } from "@/content/serviceAreas";
import { publicBusinessFacts } from "@/content/businessFacts";

function areaServedList() {
  return serviceAreaContract.areas.map((entry) => ({
    "@type": "AdministrativeArea",
    name: entry.county,
  }));
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: publicBusinessFacts.businessName,
    legalName: company.legalName,
    alternateName: company.brandVariants,
    telephone: publicBusinessFacts.primaryServiceLine,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: publicBusinessFacts.primaryServiceLine,
        areaServed: "US-MI",
        availableLanguage: "English",
      },
      ...(publicBusinessFacts.additionalOfficeLine
        ? [
            {
              "@type": "ContactPoint",
              contactType: "office",
              telephone: publicBusinessFacts.additionalOfficeLine,
              areaServed: "US-MI",
              availableLanguage: "English",
            },
          ]
        : []),
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: publicBusinessFacts.primaryAddress.line1,
      addressLocality: publicBusinessFacts.primaryAddress.city,
      addressRegion: publicBusinessFacts.primaryAddress.state,
      postalCode: publicBusinessFacts.primaryAddress.postalCode,
      addressCountry: "US",
    },
    openingHours: company.serviceHoursContract.openingHoursSchema,
    areaServed: areaServedList(),
    description:
      "Family owned and operated since 1979. Residential and commercial septic cleaning, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
    hoursAvailable: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "17:00",
      },
    ],
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: company.publicBrand },
    areaServed: areaServedList(),
    url: path,
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqContent.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
