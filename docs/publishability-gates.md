# Publishability Gates

## Automated Checks
- `npm run check:hardcoded-contact` blocks route/component hardcoded phone or street-address patterns.
- `npm run check:provisional-claims` blocks high-risk unsupported marketing claims in `src/app` and `src/content`.

## Canonical Policy
- Contact facts and emergency wording must come from `src/config/company.ts`.
- 24/7 emergency-service wording is publishable and allowed.
- Primary and secondary phones, fax, and approved addresses must stay consistent with `src/config/company.ts` and `docs/claim-registry.md`.

## Blocked Claim Classes
- BBB accreditation statements.
- Inflated review-count statements.
- Any newly introduced unverified business fact not represented in the canonical config/registry.

## Route Compliance Rules
- No direct hardcoded phone/address values in `src/app/**` or `src/components/**`.
- Customer-facing claims must be traceable to `confirmed` entries in the claim registry.
- Mailpit/admin/dev tooling must not be framed as public customer routes.
