# Deployment Truth Contract

## Purpose
Tie every demo/local deployment to an exact source state so reviewers can answer "what code is live?" without guesswork.

## Canonical Env Keys
- `DEPLOY_COMMIT_SHA`: git commit SHA for deployed build.
- `DEPLOY_REF`: branch/tag/ref used to build.
- `DEPLOY_BUILD_TIME_UTC`: build timestamp in UTC ISO-8601.
- `DEPLOYMENT_STAMP_VISIBLE`: enables visible provenance stamp.

## Rendering Contract
- When `DEPLOYMENT_STAMP_VISIBLE=true`, the footer stamp must render:
- commit SHA
- ref
- build timestamp
- runtime mode

## Enforcement Contract
- `validateDeploymentProvenanceForRuntime()` throws when stamp is visible and any provenance field is missing.
- Verification command: `npm run verify:provenance`.

## Demo/Local Usage
- Local and demo defaults keep stamp visible.
- Example values:
- `DEPLOY_COMMIT_SHA=abcdef123456`
- `DEPLOY_REF=refs/heads/main`
- `DEPLOY_BUILD_TIME_UTC=2026-04-15T12:00:00Z`

## Production Suppression
- Public production may suppress stamp with `DEPLOYMENT_STAMP_VISIBLE=false`.
- Provenance fields should still be set for audit logging even if hidden.
