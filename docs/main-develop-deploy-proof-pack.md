# Main/Develop Deploy Proof Pack

## Scope
Proof artifacts for issues `#35` to `#42`.

## Branch/host topology
- Main branch host: `https://robinson.hearthcore.app`
- Develop branch host: `https://robinson-demo.hearthcore.app`

## Verification commands
- `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`
- `npm run test:runtime-contract`
- `npm run test:seo-contract`

## Runtime host proof
- Endpoint: `/api/runtime-proof`
- Main: production + main intent + indexing enabled.
- Develop: demo + develop intent + nonblank provenance.

## Access protection proof
- Anonymous `/admin/submissions` blocked on develop.
- Authorized develop access succeeds with `?review_access=...`.
- Main admin route blocked.

## Notification proof
- Develop SMTP route configured to controlled inbox with `[DEVELOP PROOF]` prefix.

## Captured screenshots (2026-04-16)
- `docs/screenshots/develop-admin-blocked-anonymous-2026-04-16.png`
- `docs/screenshots/develop-admin-authorized-2026-04-16.png`
- `docs/screenshots/contact-neutral-default-2026-04-16.png`
- `docs/screenshots/contact-general-selected-2026-04-16.png`
- `docs/screenshots/runtime-proof-main-2026-04-16.png`
- `docs/screenshots/runtime-proof-develop-2026-04-16.png`

## Operator notes
- Keep Cloudflare route and tunnel ingress aligned with `docs/cloudflare-routing-map.md`.
- Keep proof artifacts date-stamped in `docs/screenshots/`.