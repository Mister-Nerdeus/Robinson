# Issue Closeouts 4877-4882

## 4877 Deploy topology
- Added explicit branch-to-hostname contract and Cloudflare routing map.
- Added separate Docker stack definitions for main and develop with unique ports and volumes.
- Added deterministic deploy scripts for each environment.

## 4878 Runtime identity and provenance
- Added render-time runtime identity validation in app layout.
- Deployment stamp cannot render with blank provenance values.
- Expanded runtime contract tests.

## 4879 Public vs develop surfaces
- Footer runtime/debug badges and deployment stamp hidden in production.
- Review surfaces remain available for develop/local by env contract.
- SEO metadata/robots behavior aligned with runtime mode and indexing intent.

## 4880 Contact intake hub
- `/contact` now includes lane routing for septic, evaluation, rental, commercial, and general fallback.
- Emergency messaging remains call-first.

## 4881 Homepage polish
- Removed sticky header blur bleed-through.
- Tightened service card, trust, and FAQ spacing/typography.

## 4882 Proof pack and runbook
- Added proof pack and promotion runbook docs.
- Added `scripts/verify-main-develop.ps1` for dual-host verification.

## References
- `docs/main-develop-deploy-proof-pack.md`
- `docs/branch-promotion-runbook.md`
- `docs/branch-deploy-contract.md`
- `docs/runtime-identity-contract.md`
- `docs/public-vs-develop-surface-contract.md`