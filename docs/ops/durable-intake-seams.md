# Durable Intake Seams

## Submission Storage
- Active backend storage is file-backed at `data/submissions.json`.
- Docker Compose mounts `/app/data` to named volumes so records survive container restarts.
- Storage seam remains in `src/lib/storage/submissions.ts` and can be replaced without changing the form API contract.

## Rate Limiting
- Default mode is durable file-backed (`RATE_LIMIT_MODE=file`).
- State is persisted at `data/rate-limit.json`.
- `RATE_LIMIT_MODE=memory` is still available for local-only debugging.

## Rollback
1. Set `RATE_LIMIT_MODE=memory` and redeploy.
2. Keep existing `/app/data` volume attached; no schema migration is required.
3. Re-run `npm run test:submission-contract` and `npm run test:request-flow-behavior`.
