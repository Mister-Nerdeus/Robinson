# Local Submissions Review

## Purpose
Provide local-only visibility into captured form submissions during v1.

## Gate
- Route: `/admin/submissions`
- Enabled only when `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`.

## Storage
- Canonical SQLite file: `data/submissions.sqlite` (configurable via `SUBMISSIONS_DB_PATH`).
- Each record includes lane, lifecycle, attribution, and triage metadata.
- Legacy JSON imports are still supported through `npm run import:submissions-json`.

## Notes
- Local runtime remains lightweight, but admin access is token-authenticated unless explicit local bypass is enabled.
