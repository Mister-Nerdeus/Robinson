# Public Facts Contract

## Canonical Source
`src/config/company.ts` is the canonical source for publishable business identity facts.

## Alignment Rules
- `src/content/businessFacts.ts` must mirror canonical brand/address/phone facts from `company.ts`.
- `src/lib/seo/schema.ts` must emit values aligned with canonical facts.
- Footer/contact/legal surfaces must not contradict canonical facts.

## Verification Buckets
- `confirmed`: publishable now
- `provisional`: internal-only until owner verification
- `do-not-publish-yet`: blocked from public trust copy

## Legal Surfaces
Public routes `/privacy` and `/terms` are required and linked from global footer navigation.
