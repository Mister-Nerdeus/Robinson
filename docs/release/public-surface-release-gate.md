# Public Surface Release Gate

## Required Pass Conditions
- [ ] No duplicate nav rows on request routes.
- [ ] Request routes use compact task-header mode.
- [ ] No public runtime or provenance leakage (`mode`, `commit`, `ref`, `build`).
- [ ] Homepage service-lane CTAs are explicit and task-specific.
- [ ] FAQ schema is generated from visible FAQ content only.
- [ ] Canonical public business facts are sourced from `src/content/businessFacts.ts`.
- [ ] Pending-verification facts remain excluded from customer UI.

## Required Proof Bundle
- [ ] Before/after screenshots for touched routes.
- [ ] CTA inventory table.
- [ ] Copy diff summary.
- [ ] Repetition/trust governance decision table.
- [ ] Field matrix for Realtor and rental quote paths.
- [ ] Test output excerpts for route and schema contracts.

## Minimum Commands
- `npm run typecheck`
- `npm run test:homepage-structure-contract`
- `npm run test:schema-source-contract`
- `npm run test:request-flow-behavior`
- `npm run test:request-route-release-gate`
- `npm run test:business-facts-contract`
- `npm run test:request-flow-behavior-e2e`
