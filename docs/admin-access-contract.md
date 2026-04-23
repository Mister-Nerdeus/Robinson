# Admin Access Contract

## Scope
Protected surfaces:
- `/admin/submissions`
- `GET /api/forms`
- `GET /api/submissions`
- `PATCH /api/submissions`
- `GET /api/runtime-proof`

## Authorization Model
1. Runtime policy must enable review surface: `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`.
2. Auth tokens must be configured: `ADMIN_OWNER_TOKEN` and/or `ADMIN_OPS_TOKEN`.
3. Request must be authenticated as owner/ops by either:
- `Authorization: Bearer <ADMIN_OWNER_TOKEN|ADMIN_OPS_TOKEN>`
- session cookie `robinson_admin_session` (name configurable with `ADMIN_SESSION_COOKIE_NAME`).

## Session Bootstrap
Open `/admin/submissions?admin_access=<token>` to set the secure session cookie for browser workflows.

## Local Dev Convenience
`ENABLE_LOCAL_DEV_ADMIN_BYPASS=true` may be used only in local runtime to bypass token checks explicitly.

## Security Invariants
- Anonymous users are blocked from admin page and admin APIs.
- Env flags alone do not authorize protected data access.
- Owner/ops identity is required for protected submissions data.
