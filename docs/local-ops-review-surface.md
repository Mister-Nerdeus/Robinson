# Local Ops Review Surface

## Purpose
`/admin/submissions` is a local/demo triage workspace for owner/operator review.

## Included Capabilities
- Filter by submission type.
- Filter by date range.
- Compact lane-aware summaries.
- Expand full payload per submission.
- Copy/export text area for filtered rows.

## Guarding
Route and API are blocked unless runtime contract allows it.

Required:
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- and local-only mode OR explicit override (`ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true`)

## Source Files
- `src/app/admin/submissions/page.tsx`
- `src/components/admin/SubmissionsFilters.tsx`
- `src/components/admin/SubmissionsTable.tsx`
