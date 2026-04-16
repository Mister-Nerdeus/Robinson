# Runtime Mode Contract

## Purpose
Enforce runtime safety in application code, including review/admin access control.

## Canonical Flags
- `RUNTIME_MODE=local|demo|production`
- `LOCAL_ONLY_MODE=true|false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true|false`
- `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true|false`
- `REVIEW_ACCESS_KEY=<secret>`
- `REVIEW_ACCESS_COOKIE_NAME=<cookie-name>`

## Guard Rules
- Admin submissions workspace/API opens only when:
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- and (`LOCAL_ONLY_MODE=true` or `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true`)
- and `REVIEW_ACCESS_KEY` is configured (minimum 16 chars)
- and request carries valid review-access cookie

## Production Safety Rules
- Production must keep:
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=false`
- `SEO_ALLOW_INDEXING=true`

## Implementation Source of Truth
- `src/lib/runtime/env.ts`
- `src/middleware.ts`
- `src/app/admin/submissions/page.tsx`
- `src/app/api/submissions/route.ts`

## Test Coverage
- `tests/runtime-mode-contract.spec.ts`