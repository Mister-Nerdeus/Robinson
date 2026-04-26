# Reporting Regeneration Runbook

## Summary
Steps to regenerate owner-report-pack output from canonical submissions data.

## Steps
1. Authenticate to `/admin/submissions` as owner/ops.
2. Apply optional filters for lane/status/date/source.
3. Confirm summary block values update with filter state.
4. Export `Owner Report JSON` artifact.
5. Store export in controlled ops artifacts location.
6. Re-run `npm run test:owner-report-pack`.

## Determinism Check
- Re-run report generation against unchanged data.
- Expect identical aggregate content (except timestamp field).

## Export Fields
- `totals.submissions`
- `submissionsByLane[]`
- `lifecycleByLane[]`
- `deliveryStateSummary[]`
- `timeToFirstOwnerAction`
