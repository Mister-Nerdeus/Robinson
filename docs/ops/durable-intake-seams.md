# Durable Intake Seams

## Submission Storage
- Active backend storage is SQLite-backed at `data/submissions.sqlite` (or `SUBMISSIONS_DB_PATH`).
- Docker Compose mounts `/app/data` to named volumes so records survive container restarts.
- Canonical storage seam is `src/lib/submissions/repository.ts` with DB bootstrap in `src/lib/db/sqlite.ts`.
- Legacy JSON import seam remains via `scripts/import-submissions-json.ts`.

## Rate Limiting
- Default mode is durable file-backed (`RATE_LIMIT_MODE=file`).
- State is persisted at `data/rate-limit.json`.
- `RATE_LIMIT_MODE=memory` is still available for local-only debugging.

## Rollback
1. Set `RATE_LIMIT_MODE=memory` and redeploy.
2. Keep existing `/app/data` volume attached; no schema migration is required.
3. Re-run `npm run test:submission-contract` and `npm run test:request-flow-behavior`.
