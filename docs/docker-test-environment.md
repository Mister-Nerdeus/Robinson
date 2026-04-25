# Docker Test Environment

## Purpose
Isolated pre-launch testing stack for routing, submissions, notifications, persistence, and operator runbook validation.

## Files
- `compose.test.yaml` (canonical test stack)
- `.env.test`
- `scripts/test-stack-up.ps1`
- `scripts/test-stack-down.ps1`
- `scripts/test-smoke.mjs`

## Services
- `web` (always on): Next.js app, host port `3001`
- `api` (profile `api`): Mailpit test inbox UI, host port `4001`
- `db` (profile `db`): PostgreSQL test instance, host port `5433`

## Isolation
- Project name: `robinson-test`
- Dedicated host ports avoid collisions with local dev defaults.
- Named volumes keep test persistence isolated from local dev artifacts.
- SQLite canonical storage stays inside `/app/data/submissions.sqlite` and is persisted by the `test_data` volume.

## Health Checks
- `web`: HTTP check on internal port `4850`
- `api`: Mailpit command check
- `db`: `pg_isready`

## Runtime-Proof Host Gate
- `REVIEW_ALLOWED_HOSTS` is passed through Docker build/runtime args and defaults to `localhost,127.0.0.1` in local/test env files.
- This keeps `/api/runtime-proof` unavailable on customer hosts even outside production mode.

## Public-Gate Proof Commands (Container or Local)
- `npm run test:request-flow-behavior-e2e`
- `npm run proof:issue-197-208`
- `npm run test:visual-public-evidence`

These commands produce and validate the screenshot/e2e proof bundle used by the service-route release gate.
