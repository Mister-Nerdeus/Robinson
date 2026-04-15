# Runtime Identity Contract

## Goal
Ensure displayed runtime identity is always truthful and cannot render partial deployment provenance.

## Source of truth
- Runtime parsing and validation: `src/lib/runtime/env.ts`
- Runtime enforcement callsite: `src/app/layout.tsx`
- Stamp rendering: `src/components/site/DeploymentStamp.tsx`
- Footer visibility policy: `src/components/site/Footer.tsx`

## Rules
- If deployment stamp is visible, all provenance fields must be nonblank.
- Production (`main`) must not expose review surfaces.
- Non-production (`develop`, `local`) must remain noindex.
- Production must remain indexable.

## Required env values when stamp is visible
- `DEPLOY_COMMIT_SHA`
- `DEPLOY_REF`
- `DEPLOY_BUILD_TIME_UTC`

## Enforcement behavior
- `validateRuntimeIdentityForRender()` runs in app layout.
- Invalid runtime identity throws during render.
- `shouldRenderDeploymentStamp()` returns false in production.

## Test coverage
- `tests/runtime-mode-contract.spec.ts`