# Publishability Gates

## Automated Checks
- `npm run check:hardcoded-contact` blocks hardcoded phone/address patterns in route and component files.
- `npm run check:provisional-claims` blocks risky unresolved claims in app/content files.

## Blocked Claim Classes
- 24/7 emergency-service assertion.
- BBB accreditation claims.
- Inflated review-count language.

## Rule Intent
- Contact facts must come from canonical config (`src/config/company.ts`).
- Unresolved claims must remain provisional or blocked until verification.
