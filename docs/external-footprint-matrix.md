# External Footprint Matrix

## Matrix Version
- Version: `external-footprint-v1`
- Canonical source: `src/config/company.ts` (`externalListingContract`) and `src/content/businessFacts.ts`

## Platform Matrix

| platform/surface | name | primary phone | address | routine hours | emergency wording | status | disposition |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Google Business Profile | Robinson Septic Cleaning | (616) 636-5565 | 1565 N Dagget Rd, Pierson, MI 49339 | Mon-Fri 8:00 AM-5:00 PM | 24/7 call-first emergency response | needs-update | Update to canonical fields |
| Facebook Page | Robinson Septic Cleaning | (616) 636-5565 | 1565 N Dagget Rd, Pierson, MI 49339 | Mon-Fri 8:00 AM-5:00 PM | 24/7 call-first emergency response | needs-update | Update branding + contact consistency |
| BBB-facing wording | Robinson Septic Tank Cleaning LLC | (616) 636-5565 | 1565 N Dagget Rd, Pierson, MI 49339 | Mon-Fri 8:00 AM-5:00 PM | verify-first wording only | unresolved | Hold until owner verification |
| Major citation directories | Robinson Septic Cleaning | (616) 636-5565 | 1565 N Dagget Rd, Pierson, MI 49339 | Mon-Fri 8:00 AM-5:00 PM | 24/7 call-first emergency response | needs-update | Queue updates and suppress duplicates |
| Legacy website references | n/a | n/a | n/a | n/a | n/a | retired-suppress | Suppress stale mirror records |

## Canonical Mapping
- `publicName` -> external listing `Name`
- `primaryPhone` -> external listing primary call number
- `streetAddress + cityStateZip` -> listing address blocks
- `normalBusinessHours` -> routine office/scheduling hours
- `emergencyPolicy` -> emergency call-first wording

## Legacy Facts (Tracked, Not Published)
- `113 South Union, Sparta, MI 49345`
- `(231) 937-8282`
- `5757 Henkel Rd, Howard City, MI 49329`
