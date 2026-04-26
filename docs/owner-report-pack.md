# Owner Report Pack

## Summary
Compact owner-facing reporting pack generated from canonical persisted submissions and lane/lifecycle data.

## Pack Definition
- Submissions by lane
- Lifecycle status by lane
- Delivery-state summary
- Time-to-first-owner-action (from `createdAt` to first non-system triage update where available)

## Data Source
- `src/lib/submissions/repository.ts` (`listOwnerReportPack`)
- Source records remain canonical persisted submissions

## Regeneration
- Admin workspace report block + JSON export
- Deterministic regeneration gate: `tests/owner-report-pack.spec.ts`
- Procedure: `docs/reporting-regeneration-runbook.md`

## Evidence
- Sample export: `docs/samples/owner-report-pack-sample.json`
- Admin screenshot: `docs/screenshots/admin-submissions-workspace-desktop-1440.png`
