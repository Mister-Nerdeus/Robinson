# Public Browser Security Headers

Public routes are configured with:
- `Content-Security-Policy`
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `Referrer-Policy`
- `Permissions-Policy`

The runtime diagnostics endpoint (`/api/runtime-proof`) is blocked on production and requires explicit review auth outside production.
