# Local Runbook

## Install
- `npm install`

## Run (local)
- `npm run dev`
- Visit `http://localhost:4850`

## Run (docker local)
- `docker compose -f compose.yaml --env-file .env.test -p robinson-test up --build`
- Visit `http://localhost:3001`

## Verification
- `npm run verify:v1`

## Optional admin review
- Set `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true` in `.env`
- Open `/admin/submissions`
