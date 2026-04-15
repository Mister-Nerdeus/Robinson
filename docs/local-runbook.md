# Local Runbook

## Install
- `npm install`

## Configure
1. Copy `.env.example` to `.env`.
2. Keep local contract defaults:
- `RUNTIME_MODE=local`
- `LOCAL_ONLY_MODE=true`
- `DEPLOYMENT_STAMP_VISIBLE=true`
3. Set deployment provenance values for the visible stamp:
- `DEPLOY_COMMIT_SHA`
- `DEPLOY_REF`
- `DEPLOY_BUILD_TIME_UTC`

## Run (local)
- `npm run dev`
- Visit `http://localhost:4850`
- Verify footer stamp shows commit/ref/build timestamp

## Run (docker local)
- `docker compose -f compose.yaml --env-file .env.test -p robinson-test up --build`
- Visit `http://localhost:3001`

## Verification
- `npm run verify:v1`
- Missing-provenance failure check: `npm run verify:provenance`

## Optional admin review
- Set `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- Open `/admin/submissions`
- Outside local-only mode, explicit override is required: `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true`
