## Request-Route Release Gate

- [ ] Route smoke checks passed.
- [ ] Contact routing and emergency CTA behavior verified.
- [ ] Intake pipeline tests passed.
- [ ] Analytics smoke checks for call/router/form events passed.
- [ ] Redirect map and canonical host behavior verified.
- [ ] Screenshot evidence attached for core routes (desktop + mobile).
- [ ] Release signoff docs completed (`RELEASE_SIGNOFF`, `CUTOVER_CHECKLIST`, `POST_LAUNCH_CHECKLIST`).
- [ ] Rollback plan validated.
- [ ] No duplicate nav rows on request routes.
- [ ] No public provenance/runtime leakage (`mode`, `commit`, `ref`, `build`).
- [ ] Business-truth service content preserved on touched request routes.

## Large-Screen Task Composition Gate

- [ ] Reviewed against `docs/design/task-page-large-screen-composition-contract.md`.
- [ ] Updated `docs/qa/task-page-composition-checklist.md`.
- [ ] Attached before/after desktop screenshots at 1280/1440 for touched task routes.
- [ ] Attached mobile screenshots at 390 for touched task routes.
- [ ] Updated `docs/screenshots/issues-163-172/composition-audit.json` and confirmed `passed: true`.
- [ ] Included layout mode inventory (`supportRail`, `formDominant`, `fullWidthSupport`) in PR notes.
- [ ] Answered Apple-style spatial-intent checks in PR notes:
  - blank-space intent
  - rail stability
  - form dominance
  - footer separation
  - action locality
