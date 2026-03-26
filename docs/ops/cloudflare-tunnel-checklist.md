# Cloudflare Tunnel Demo Access Checklist (Operator Closeout)

## Repo-Owned Deliverables
- [ ] `docs/ops/cloudflare-tunnel-demo-access.md` present
- [ ] `docs/ops/cloudflare-tunnel-checklist.md` present
- [ ] `ops/cloudflare/config.template.yml` present and redacted
- [ ] `scripts/windows/cloudflare-tunnel-verify.ps1` present
- [ ] `docs/verification/cloudflare-tunnel-demo-proof.md` present

## Manual Operator Tasks
- [ ] Tunnel created/selected in Cloudflare
- [ ] Published route created for `https://<hostname>` -> `http://localhost:3001`
- [ ] Windows service installed and running
- [ ] External-device validation captured

## Explicit Exclusions
- [ ] Mailpit is not publicly exposed
- [ ] No admin/dev tools published
