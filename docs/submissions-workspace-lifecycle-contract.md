# Submissions Workspace Lifecycle Contract

## Goal
Admin workspace should support lightweight owner triage, not only read-only filtering.

## Required capabilities
- Lifecycle states per submission:
- `new`
- `in-progress`
- `scheduled`
- `closed`
- Internal notes editable in protected admin workspace.
- Note presence and status visible in table rows.

## Security
- Workspace remains protected by review-access middleware.
- Internal notes never appear on public routes.

## Source of truth
- Types: `src/lib/forms/types.ts`
- Storage: `src/lib/storage/submissions.ts`
- Actions: `src/lib/forms/actions.ts`
- UI: `src/components/admin/SubmissionsTable.tsx`
- Filters: `src/components/admin/SubmissionsFilters.tsx`