import { company } from "@/config/company";
import { faqContent } from "@/content/faq";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.publicBrand,
    alternateName: company.brandVariants,
    telephone: company.primaryPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.postalCode,
      addressCountry: "US",
    },
    openingHours: ["Mo-Fr 08:00-17:00"],
    areaServed: "West Michigan / greater Grand Rapids area",
    description:
      "Family owned and operated since 1979. Residential and commercial septic cleaning, home-sale evaluations, portable toilet rentals, grease trap cleaning, and lift pump service.",
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: company.publicBrand },
    areaServed: "West Michigan / greater Grand Rapids area",
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
