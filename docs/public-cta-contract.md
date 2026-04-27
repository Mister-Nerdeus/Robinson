# Public CTA Contract

## Canonical Contract Version
- `public-cta-contract-v1` from `src/content/cta.ts`

## Global CTA Families
1. Global call family:
- Label: `Call Emergency Dispatch`
- Surfaces: homepage hero, header, footer primary call button, mobile action rail
- Rule: call-family action appears before request-family action where both appear together
2. Global request family:
- Label: `Request Service`
- Surfaces: homepage hero, header (marketing mode), mobile action rail, final homepage CTA

## Route-Specific CTA Family
- Homepage service chooser labels remain specialized and explicit:
- `Call Emergency Service`
- `Schedule Pumping`
- `Request Evaluation`
- `Request Rentals`
- `Get Commercial Help`
- Realtor band route-specific CTA: `View Realtor Services`

## Disallowed Drift
- Generic public labels blocked unless explicitly approved:
- `Learn More`
- `Contact Us`
- `Click Here`
- Internal workflow wording must not appear in public CTA labels.

## Executable Gates
- `tests/public-cta-contract.spec.ts`
- `tests/homepage-content-contract.spec.ts`
- `tests/homepage-apple-ux-contract.spec.ts`
