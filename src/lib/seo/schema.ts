import { company } from "@/config/company";
import { faqContent } from "@/content/faq";

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.publicBrand,
    telephone: company.primaryPhone,
    email: company.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.line1,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.postalCode,
      addressCountry: "US",
    },
    openingHours: ["Mo-Fr 07:00-17:00"],
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: { "@type": "LocalBusiness", name: company.publicBrand },
    areaServed: "Cumberland County, PA",
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
