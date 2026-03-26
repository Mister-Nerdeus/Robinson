# Docker Test Environment

## Purpose
Isolated pre-launch testing stack for routing, submissions, notifications, persistence, and operator runbook validation.

## Files
- `compose.yaml` (canonical)
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

## Health Checks
- `web`: HTTP check on internal port `4850`
- `api`: Mailpit command check
- `db`: `pg_isready`
