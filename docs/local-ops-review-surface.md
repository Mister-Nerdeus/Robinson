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
Route and API are blocked unless runtime contract allows it and owner/ops auth succeeds.

Required:
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- `ADMIN_OWNER_TOKEN` and/or `ADMIN_OPS_TOKEN`
- authenticated bearer token or session cookie (`ADMIN_SESSION_COOKIE_NAME`, default `robinson_admin_session`)

## Source Files
- `src/app/admin/submissions/page.tsx`
- `src/components/admin/SubmissionsFilters.tsx`
- `src/components/admin/SubmissionsTable.tsx`
