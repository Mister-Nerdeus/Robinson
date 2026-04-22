## Service-Route Release Gate

- [ ] Route smoke checks passed.
- [ ] Contact routing and emergency CTA behavior verified.
- [ ] Intake pipeline tests passed.
- [ ] Analytics smoke checks for call/router/form events passed.
- [ ] Redirect map and canonical host behavior verified.
- [ ] Screenshot proof attached for changed routes using required widths (`desktop 1280/1440`, `mobile 390`).
- [ ] Release signoff docs completed (`RELEASE_SIGNOFF`, `CUTOVER_CHECKLIST`, `POST_LAUNCH_CHECKLIST`).
- [ ] Rollback plan validated.
- [ ] No duplicate nav rows on request routes.
- [ ] No public provenance/runtime leakage (`mode`, `commit`, `ref`, `build`).
- [ ] Lane CTA inventory updated for changed routes.
- [ ] Business-truth status reviewed against `docs/business-truth/owner-truth-dashboard.md`.
- [ ] Canonical public business-facts table updated when contact facts change.
- [ ] Pending-verification facts are excluded from customer UI.
- [ ] Trust-signal changes reviewed against `docs/trust/trust-governance-registry.md`.
- [ ] FAQ/schema alignment checked where route copy changed.

## Screenshot Proof Matrix

- [ ] Homepage: desktop `1280`, desktop `1440`, mobile `390`.
- [ ] Contact: desktop `1280`, desktop `1440`, mobile `390`.
- [ ] Septic: desktop `1280`, desktop `1440`, mobile `390`.
- [ ] Evaluations: desktop `1280`, desktop `1440`, mobile `390`.
- [ ] Rentals: desktop `1280`, desktop `1440`, mobile `390`.
- [ ] Commercial: desktop `1280`, desktop `1440`, mobile `390`.

## Large-Screen Task Composition Gate

- [ ] Reviewed against `docs/design/task-page-large-screen-composition-contract.md`.
- [ ] Updated `docs/qa/task-page-composition-checklist.md`.
- [ ] Updated composition evidence JSON and before/after matrix for touched routes.
- [ ] Included layout mode inventory (`supportRail`, `formDominant`, `fullWidthSupport`) in PR notes.
- [ ] Included spatial-intent checks in PR notes:
  - blank-space intent
  - rail stability
  - form dominance
  - footer separation
  - action locality
