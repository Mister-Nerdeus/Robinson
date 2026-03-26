# Location Display Strategy

## Public-facing model
Use one primary address anchor plus one approved secondary location reference, paired with a clear West Michigan service-area summary.

## Canonical display values
- Brand: Robinson Septic Cleaning
- Primary phone: (616) 636-5565
- Secondary phone: (616) 887-2060
- Primary address anchor: 1565 N Dagget Rd, Pierson, MI 49339
- Secondary location reference: 113 South Union, Sparta, MI 49345
- Service area summary: West Michigan including Pierson, Sparta, Cedar Springs, Sand Lake, Trufant, Coral, Howard City, and greater Grand Rapids.

## Enforcement expectations
- Footer, contact page, and structured data must use the same contact facts.
- Route files cannot hardcode contact facts; they must read from canonical config/content.
- If location strategy changes later, update `src/config/company.ts`, `src/content/serviceArea.ts`, and claim docs in the same change set.
