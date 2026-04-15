# V3 Proof Pack

## Scope
Closeout artifacts for issues #25-#34 covering deployment truth, runtime safety, submission/domain contracts, IA cleanup, and SEO/runtime correctness.

## Contracts Added/Updated
- `docs/deployment-truth-contract.md`
- `docs/runtime-mode-contract.md`
- `docs/submission-contract.md`
- `docs/intake-field-matrix.md`
- `docs/local-ops-review-surface.md`
- `docs/homepage-ia-contract.md`
- `docs/seo-runtime-contract.md`
- `docs/public-trust-surface-map.md`
- `docs/claim-registry.md`
- `docs/media-manifest.md`
- `docs/content-proof-map.md`

## Screenshot Inventory (Phase 3)
- `docs/screenshots/home-desktop-1440.png`
- `docs/screenshots/home-mobile-390.png`
- `docs/screenshots/home-deployment-stamp-desktop-1440.png`
- `docs/screenshots/contact-desktop-1440.png`
- `docs/screenshots/septic-cleaning-desktop-1440.png`
- `docs/screenshots/evaluations-desktop-1440.png`
- `docs/screenshots/portable-toilets-desktop-1440.png`
- `docs/screenshots/commercial-form-desktop-1440.png`
- `docs/screenshots/admin-submissions-workspace-desktop-1440.png`

## Gate Outputs
### Full gate
Command:
- `npm run verify:v1`

Result highlights:
- `lint`: pass
- `typecheck`: pass
- `next build`: pass
- `test:smoke`: pass
- `test:runtime-contract`: pass
- `test:submission-contract`: pass
- `test:commercial-submission`: pass
- `test:seo-contract`: pass
- `check:hardcoded-contact`: pass
- `check:provisional-claims`: pass

### Provenance missing failure path
Command:
- `npx tsx -e "import { validateDeploymentProvenanceForRuntime } from './src/lib/runtime/env.ts'; ..."`

Output excerpt:
- `Error: Deployment provenance is required when DEPLOYMENT_STAMP_VISIBLE=true. Missing: DEPLOY_COMMIT_SHA, DEPLOY_REF, DEPLOY_BUILD_TIME_UTC`

## Runtime/SEO Samples
### Example env values used
- `RUNTIME_MODE=demo`
- `SITE_URL=https://demo.robinsonseptic.com`
- `LOCAL_ONLY_MODE=true`
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- `DEPLOYMENT_STAMP_VISIBLE=true`
- `DEPLOY_COMMIT_SHA=proofpacksha123`
- `DEPLOY_REF=refs/heads/phase-3`
- `DEPLOY_BUILD_TIME_UTC=2026-04-15T15:00:00Z`
- `SEO_ALLOW_INDEXING=false`

### Generated sitemap sample
- `https://demo.robinsonseptic.com/`
- `https://demo.robinsonseptic.com/services`
- `https://demo.robinsonseptic.com/services/septic-cleaning`

### Robots sample
```json
{
  "rules": { "userAgent": "*", "disallow": "/" },
  "sitemap": "https://demo.robinsonseptic.com/sitemap.xml"
}
```

### Metadata canonical sample
- `https://demo.robinsonseptic.com/services/commercial`

## Issue Mapping
- Full issue-by-issue mapping and closeout details: `docs/issue-closeouts-25-34.md`
