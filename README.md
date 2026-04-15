# Robinson Rebuild (Local v1)

This repository is governed by [`docs/project-contract.md`](docs/project-contract.md).

## Runtime Contracts
- Deployment truth: [`docs/deployment-truth-contract.md`](docs/deployment-truth-contract.md)
- Runtime mode/local-only policy: [`docs/runtime-mode-contract.md`](docs/runtime-mode-contract.md)
- SEO runtime behavior: [`docs/seo-runtime-contract.md`](docs/seo-runtime-contract.md)

## Quick Start
1. Copy `.env.example` to `.env`.
2. Keep `RUNTIME_MODE=local` and `LOCAL_ONLY_MODE=true` for local work.
3. Provide deployment provenance fields (`DEPLOY_COMMIT_SHA`, `DEPLOY_REF`, `DEPLOY_BUILD_TIME_UTC`) when `DEPLOYMENT_STAMP_VISIBLE=true`.
4. Run `npm install && npm run dev` and open `http://localhost:4850`.

## Verification
- Full gate: `npm run verify:v1`
- Provenance guard only: `npm run verify:provenance`
- Docker test runtime: `docker compose -f compose.yaml --env-file .env.test -p robinson-test up --build`

## Admin Review Surface
- Admin workspace route: `/admin/submissions`
- Opens only when:
  - `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
  - and (`LOCAL_ONLY_MODE=true` or `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true`)
