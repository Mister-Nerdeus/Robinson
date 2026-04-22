## Public Route + Contact Truth Checklist

- [ ] Route smoke checks passed.
- [ ] Contact routing and emergency CTA behavior verified.
- [ ] Intake pipeline tests passed.
- [ ] Analytics smoke checks for call/router/form events passed.
- [ ] Redirect map and canonical host behavior verified.
- [ ] Screenshot evidence attached for core routes (desktop + mobile).
- [ ] Release signoff docs completed (`RELEASE_SIGNOFF`, `CUTOVER_CHECKLIST`, `POST_LAUNCH_CHECKLIST`).
- [ ] Rollback plan validated.

## Large-Screen Task Composition Gate

- [ ] Reviewed against `docs/design/task-page-large-screen-composition-contract.md`.
- [ ] Updated `docs/qa/task-page-composition-checklist.md`.
- [ ] Attached before/after desktop screenshots at 1280/1440 for touched task routes.
- [ ] Attached mobile screenshots at 390 for touched task routes.
- [ ] Updated `docs/screenshots/issues-159-162/composition-audit.json` and confirmed `passed: true`.
- [ ] Included layout mode inventory (`support-rail` and `full-width`) in PR notes.
- [ ] Answered Apple-style spatial-intent checks in PR notes:
  - blank-space intent
  - rail stability
  - form dominance
  - footer separation
  - action locality
