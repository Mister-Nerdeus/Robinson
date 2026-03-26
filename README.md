# Robinson Rebuild (Local v1)

This repository is governed by a single authority contract: [`docs/project-contract.md`](docs/project-contract.md).

## Current Scope
- Local development only (initial build phase).
- No production deployment work in the first implementation batch.
- Work must follow phase order from the source plan:
  1. shell
  2. forms
  3. trust/content cleanup
  4. later pre-launch items

## Canonical Process Rules
- Public-facing business claims are not canonical unless they are explicitly marked `confirmed`.
- If a claim is uncertain, it must be marked `provisional` or `do-not-publish-yet`.
- Issue closure must be artifact-backed per [`docs/issue-closeout-standard.md`](docs/issue-closeout-standard.md).

## Out of Scope (Initial Build Batch)
- Production infrastructure and deployment pipelines.
- Public launch checklists and launch execution.
- Unverified marketing claims, emergency assertions, or accreditation claims presented as facts.

## Quick Start
1. Copy `.env.example` to `.env`.
2. Keep `LOCAL_ONLY_MODE=true` for all initial work.
3. Use the closeout template in `docs/issue-closeout-standard.md` when finishing issues.
4. Run locally with `npm install && npm run dev` and open `http://localhost:4850`.
5. For container test runtime use `docker compose -f compose.yaml --env-file .env.test -p robinson-test up --build` and open `http://localhost:3001`.
