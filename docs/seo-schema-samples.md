# SEO Schema Samples

## LocalBusiness Sample
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Robinson Septic Service",
  "telephone": "(717) 555-0147",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "120 Robinson Lane",
    "addressLocality": "Carlisle",
    "addressRegion": "PA",
    "postalCode": "17013",
    "addressCountry": "US"
  },
  "openingHours": ["Mo-Fr 07:00-17:00"]
}
```

## FAQ Sample
- Source: `src/content/faq.ts`
- Rendered on: `/faq`

## Service Sample
- Type: `Service`
- Rendered on: each major `/services/*` route
