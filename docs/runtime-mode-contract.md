# Runtime Mode Contract

## Purpose
Enforce runtime safety in application code, including review/admin access control.

## Canonical Flags
- `RUNTIME_MODE=local|demo|production`
- `LOCAL_ONLY_MODE=true|false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true|false`
- `ADMIN_OWNER_TOKEN=<secret>`
- `ADMIN_OPS_TOKEN=<secret>`
- `ADMIN_SESSION_COOKIE_NAME=<cookie-name>`
- `ENABLE_LOCAL_DEV_ADMIN_BYPASS=true|false` (local-only convenience)

## Guard Rules
- Admin submissions workspace/API opens only when runtime policy is enabled and owner/ops auth is configured.
- Env flags shape runtime behavior but are not sufficient by themselves for protected data access.
- Requests must be authenticated as owner/ops via bearer token or admin session cookie.

## Production Safety Rules
- Production must keep:
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `SEO_ALLOW_INDEXING=true`

## Implementation Source of Truth
- `src/lib/runtime/env.ts`
- `src/middleware.ts`
- `src/app/admin/submissions/page.tsx`
- `src/app/api/submissions/route.ts`

## Test Coverage
- `tests/runtime-mode-contract.spec.ts`
