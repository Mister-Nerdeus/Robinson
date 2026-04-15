# Runtime Mode Contract

## Purpose
Enforce local-only/admin safety in runtime code instead of relying on policy text.

## Canonical Flags
- `RUNTIME_MODE=local|demo|production`
- `LOCAL_ONLY_MODE=true|false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true|false`
- `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true|false`

## Guard Rules
- Admin submissions workspace/API opens only when:
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- and (`LOCAL_ONLY_MODE=true` or `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true`)

## Unsafe Surface Contract
- If `LOCAL_ONLY_MODE=false`, local-only/admin surfaces must remain blocked unless explicit override is enabled.
- Omission of env flags must never accidentally expose admin review.

## Implementation Source of Truth
- `src/lib/runtime/env.ts`
- `src/app/admin/submissions/page.tsx`
- `src/app/api/submissions/route.ts`

## Test Coverage
- `tests/runtime-mode-contract.spec.ts`
- `tests/smoke-routes.ts`
