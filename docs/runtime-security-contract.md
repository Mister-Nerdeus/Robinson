# Runtime Security Contract

## Summary
This contract defines production runtime hardening requirements for the real stack:
GoDaddy registrar, Cloudflare authoritative DNS, Railway app hosting, and Microsoft 365 mailbox operations on `robinsonseptic.net`.

## Production Header Posture
- `Content-Security-Policy`
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`
- `Permissions-Policy`
- `Strict-Transport-Security`

Header definitions live in `next.config.mjs` and apply to `/:path*`.

## Public-Mode Hardening Rules
Production must set:
- `RUNTIME_MODE=production`
- `SITE_URL=https://robinsonseptic.net`
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=false`
- `ENABLE_LOCAL_DEV_ADMIN_BYPASS=false`
- `SEO_ALLOW_INDEXING=true`

Runtime diagnostics and review/admin affordances remain hidden on public surfaces.

## Secrets and Mail Security Rules
- Never hardcode secrets into source files.
- Never log secret values to customer-visible responses or proof artifacts.
- Placeholder-shaped tokens are disallowed in production.
- If admin tokens are configured in production, they must be strong and non-placeholder.
- Provider-specific credentials (`RESEND_API_KEY`, SMTP credentials, Microsoft 365 credentials) stay out of repo and proof artifacts.
- Production mailbox and sending-domain env values must use `.net` contracts only.

## Public-Mode Leakage Audit
- Footer and public pages must render canonical business facts only.
- Admin workspace copy cannot expose runtime mode internals on customer-visible surfaces.
- Runtime-proof API is blocked in production.
- Develop/review affordances must never appear on `robinsonseptic.net` or `www.robinsonseptic.net`.

## Evidence
- Public mode hardening gate: `tests/public-mode-hardening.spec.ts`
- Net env topology gate: `tests/net-env-topology.spec.ts`
- Canonical host topology gate: `tests/canonical-host-topology.spec.ts`
