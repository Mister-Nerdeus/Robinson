# Secrets And Environment Policy

## Summary
Environment and secret policy for production/public runtime operations.

## Secret Inputs
- `ADMIN_OWNER_TOKEN`
- `ADMIN_OPS_TOKEN`
- `SMTP_PASS`
- `RESEND_API_KEY`
- `ABUSE_CHALLENGE_SECRET`

## Rules
- Secrets must be supplied via environment variables only.
- Secrets must be runtime-only and must not be supplied as Docker build arguments.
- Never hardcode secrets in source files.
- Secrets must never be committed to Git.
- Secrets must not be copied into screenshots, logs, or proof-pack exports.
- Production deployments must not use template/placeholders (`replace-with`, `example`, `local-*`, `test-*`).

## Validation
- Runtime guard: `src/lib/runtime/env.ts` (`validateRuntimeIdentityForRender`)
- Public hardening gate: `tests/public-mode-hardening.spec.ts`

## Operational Checklist
- Store secrets in deployment secret store.
- Rotate owner/ops and provider credentials on role change.
- Re-run `npm run verify:v1` after secret-related environment updates.
