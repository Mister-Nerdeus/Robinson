# Local Submissions Review

## Purpose
Provide local-only visibility into captured form submissions during v1.

## Gate
- Route: `/admin/submissions`
- Enabled only when `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`.

## Storage
- Local JSON file: `data/submissions.json`.
- Each record includes timestamp and submission type.
- JSON-first rationale for initial phase: avoids native driver setup friction on local Windows environments while preserving deterministic local proof.

## Notes
- This is intentionally lightweight and local-only for initial phase.
- No production auth stack is implemented in this phase.
