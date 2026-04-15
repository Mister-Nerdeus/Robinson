# Robinson Rebuild (Main/Develop Topology)

This repository is governed by [`docs/project-contract.md`](docs/project-contract.md).

## Branch and Deployment Contracts
- Branch deploy mapping: [`docs/branch-deploy-contract.md`](docs/branch-deploy-contract.md)
- Cloudflare routing map: [`docs/cloudflare-routing-map.md`](docs/cloudflare-routing-map.md)
- Runtime identity: [`docs/runtime-identity-contract.md`](docs/runtime-identity-contract.md)
- Public vs develop presentation: [`docs/public-vs-develop-surface-contract.md`](docs/public-vs-develop-surface-contract.md)
- Promotion runbook: [`docs/branch-promotion-runbook.md`](docs/branch-promotion-runbook.md)
- Proof pack: [`docs/main-develop-deploy-proof-pack.md`](docs/main-develop-deploy-proof-pack.md)

## Environment Templates
- Local default: `.env.example`
- Main deployment: `.env.main.example`
- Develop deployment: `.env.develop.example`
- Test stack: `.env.test`

## Deployment Commands
- Deploy main: `powershell -ExecutionPolicy Bypass -File scripts/deploy-main.ps1`
- Deploy develop: `powershell -ExecutionPolicy Bypass -File scripts/deploy-develop.ps1`
- Verify host routing: `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1`
- Verify both envs: `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`

## App Verification
- Full gate: `npm run verify:v1`
- Runtime contract: `npm run test:runtime-contract`
- SEO contract: `npm run test:seo-contract`