# Main/Develop Deploy Proof Pack

## Scope
Proof artifacts for issues `#4877` to `#4882`.

## Branch/host topology
- Main branch host: `https://robinson.hearthcore.app`
- Develop branch host: `https://robinson-demo.hearthcore.app`
- Contract reference: `docs/branch-deploy-contract.md`
- Cloudflare map reference: `docs/cloudflare-routing-map.md`

## Verification commands
- `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`
- `npm run test:runtime-contract`
- `npm run test:seo-contract`

## Evidence checklist
- GitHub branches visible (`main`, `develop`)
- Docker project containers for `robinson-main` and `robinson-develop`
- Host checks for both public URLs
- Footer behavior check:
- main = no debug/runtime stamp
- develop = review/runtime surfaces with nonblank provenance

## Captured screenshots (2026-04-15)
- `docs/screenshots/main-home-footer-2026-04-15.png`
- `docs/screenshots/develop-home-footer-2026-04-15.png`
- `docs/screenshots/develop-contact-default-2026-04-15.png`
- `docs/screenshots/develop-contact-general-lane-2026-04-15.png`

## Operator notes
- Store screenshots in `docs/screenshots/` using date-stamped names.
- Keep command output transcript in deployment ticket for audit continuity.
