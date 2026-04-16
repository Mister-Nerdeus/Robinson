# Review Surface Access Contract

## Goal
Review and admin surfaces must never be publicly anonymous, even on develop.

## Rules
- `main` (`RUNTIME_MODE=production`) must hard-block admin review routes.
- `develop` may enable review/admin surfaces only when all are true:
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true` or `LOCAL_ONLY_MODE=true`
- `REVIEW_ACCESS_KEY` is set (minimum 16 chars)
- Anonymous access to `/admin/submissions` and `GET /api/submissions` must fail.

## Access mechanism
- `src/middleware.ts` enforces route gating.
- Access cookie is set only after `?review_access=<REVIEW_ACCESS_KEY>` on `/admin/submissions`.
- Cookie name defaults to `robinson_review_access` and is configurable by `REVIEW_ACCESS_COOKIE_NAME`.

## Source of truth
- Runtime policy: `src/lib/runtime/env.ts`
- Route protection: `src/middleware.ts`
- Admin page: `src/app/admin/submissions/page.tsx`
- API read protection: `src/app/api/submissions/route.ts`