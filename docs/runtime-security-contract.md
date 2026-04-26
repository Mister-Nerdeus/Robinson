# Runtime Security Contract

## Summary
This contract defines production runtime hardening requirements before public go-live.

## Production Header Posture
- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`
- `Strict-Transport-Security`

Header definitions live in `next.config.mjs` and apply to `/:path*`.

## Public-Mode Hardening Rules
- Production must set:
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=false`
- `ENABLE_LOCAL_DEV_ADMIN_BYPASS=false`
- `SEO_ALLOW_INDEXING=true`
- Runtime diagnostics and review/admin affordances remain hidden on public surfaces.

## Secret Handling Rules
- Never hardcode secrets into source files.
- Never log secret values to customer-visible responses or proof artifacts.
- Placeholder-shaped tokens are disallowed in production.
- If admin tokens are configured in production, they must be strong and non-placeholder.

## Public-Mode Leakage Audit
- Footer and public pages must render canonical business facts only.
- Admin workspace copy cannot expose runtime mode internals on customer-visible surfaces.
- Runtime-proof API is blocked in production.

## Evidence
- Before screenshot (develop footer): `docs/screenshots/develop-home-footer-2026-04-15.png`
- After screenshot (main footer): `docs/screenshots/main-home-footer-2026-04-15.png`
- Public mode hardening gate: `tests/public-mode-hardening.spec.ts`
