# Branch Deploy Contract

## Canonical branch-to-hostname mapping
- `main` -> `https://robinson.hearthcore.app`
- `develop` -> `https://robinson-demo.hearthcore.app`

Each branch owns exactly one public hostname.

## Docker stack mapping
- `main` stack
- Compose file: `docker-compose.yml`
- Project name: `robinson-main`
- External port: `3010`
- Internal port: `4850`
- Data volume: `main_data`
- Env file: `.env.main`

- `develop` stack
- Compose file: `compose.yaml`
- Project name: `robinson-develop`
- External port: `3011`
- Internal port: `4850`
- Data volume: `develop_data`
- Env file: `.env.develop`

## Runtime identity contract
- `main` must run `RUNTIME_MODE=production`, `REVIEW_SURFACES_VISIBLE=false`, `DEPLOYMENT_STAMP_VISIBLE=false`, `SEO_ALLOW_INDEXING=true`.
- `develop` must run `RUNTIME_MODE=demo`, `REVIEW_SURFACES_VISIBLE=true`, `DEPLOYMENT_STAMP_VISIBLE=true`, `SEO_ALLOW_INDEXING=false`.
- Provenance values are injected by deploy scripts on each deploy:
- `DEPLOY_COMMIT_SHA`
- `DEPLOY_REF`
- `DEPLOY_BUILD_TIME_UTC`

## Deterministic deployment commands
- Main: `powershell -ExecutionPolicy Bypass -File scripts/deploy-main.ps1`
- Develop: `powershell -ExecutionPolicy Bypass -File scripts/deploy-develop.ps1`

## Verification commands
- Host routing and stack checks: `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1`
- Dual environment quick proof: `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`