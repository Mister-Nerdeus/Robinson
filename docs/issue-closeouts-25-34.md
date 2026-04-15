# Issue Closeouts 25-34

## #25 Freeze demo/source truth and expose deployment provenance
Status: PASS

Evidence:
- Runtime helper: `src/lib/runtime/env.ts`
- Demo/local stamp: `src/components/site/DeploymentStamp.tsx`, `src/components/site/Footer.tsx`
- Contract: `docs/deployment-truth-contract.md`
- Screenshot: `docs/screenshots/home-deployment-stamp-desktop-1440.png`
- Missing-provenance failure path:
  - Command: `npx tsx -e "import { validateDeploymentProvenanceForRuntime } from './src/lib/runtime/env.ts'; ..."`
  - Output: `Error: Deployment provenance is required ... Missing: DEPLOY_COMMIT_SHA, DEPLOY_REF, DEPLOY_BUILD_TIME_UTC`

## #26 Enforce local-only/runtime contract
Status: PASS

Evidence:
- Central runtime guard: `src/lib/runtime/env.ts`
- Guarded route/API: `src/app/admin/submissions/page.tsx`, `src/app/api/submissions/route.ts`
- Contract: `docs/runtime-mode-contract.md`
- Tests: `tests/runtime-mode-contract.spec.ts`, `tests/smoke-routes.ts`

Runtime flag matrix (after):
- `LOCAL_ONLY_MODE=true`, `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`, `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=false` => admin enabled
- `LOCAL_ONLY_MODE=false`, `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`, `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=false` => admin blocked
- `LOCAL_ONLY_MODE=false`, `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`, `ALLOW_ADMIN_OUTSIDE_LOCAL_MODE=true` => admin enabled (explicit override)

## #27 Freeze submission domain contract
Status: PASS

Evidence:
- Contract doc: `docs/submission-contract.md`
- Types/schema/actions: `src/lib/forms/types.ts`, `src/lib/forms/schema.ts`, `src/lib/forms/actions.ts`
- Notification lockstep: `src/lib/notifications/send.ts`
- Contract test: `tests/submission-contract.spec.ts`

## #28 Repair commercial lane + facility preservation
Status: PASS

Evidence:
- Dedicated type in UI + schema: `src/app/services/commercial/page.tsx`, `src/components/forms/RequestForm.tsx`, `src/lib/forms/schema.ts`
- Admin rendering with commercial summary fields: `src/components/admin/SubmissionsTable.tsx`
- Regression test: `tests/commercial-submission.spec.ts`
- Screenshot: `docs/screenshots/commercial-form-desktop-1440.png`

## #29 Dispatch-grade intake fields across lanes
Status: PASS

Evidence:
- Lane-specific UI fields: `src/components/forms/RequestForm.tsx`
- Schema/types coverage: `src/lib/forms/schema.ts`, `src/lib/forms/types.ts`
- Matrix doc: `docs/intake-field-matrix.md`
- Service page integrations: `src/app/contact/page.tsx`, `src/app/services/*/page.tsx`, `src/app/realtors/page.tsx`

## #30 Local-ops submissions workspace
Status: PASS

Evidence:
- Workspace page: `src/app/admin/submissions/page.tsx`
- Components: `src/components/admin/SubmissionsFilters.tsx`, `src/components/admin/SubmissionsTable.tsx`
- Review surface doc: `docs/local-ops-review-surface.md`
- Screenshot: `docs/screenshots/admin-submissions-workspace-desktop-1440.png`

## #31 Homepage IA tightening
Status: PASS

Evidence:
- IA contract: `docs/homepage-ia-contract.md`
- Updated home composition: `src/app/page.tsx`
- Updated content modules: `src/content/home.ts`, `src/content/trust.ts`
- Screenshots: `docs/screenshots/home-desktop-1440.png`, `docs/screenshots/home-mobile-390.png`

## #32 SEO runtime correctness
Status: PASS

Evidence:
- Metadata/sitemap/robots: `src/lib/seo/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`
- Removed localhost static robots leak: `public/robots.txt` deleted
- Contract: `docs/seo-runtime-contract.md`
- Test: `tests/seo-contract.spec.ts`

## #33 Trust/media source-backed contract
Status: PASS

Evidence:
- Trust map: `docs/public-trust-surface-map.md`
- Registry update: `docs/claim-registry.md`
- Media canonical/review split: `docs/media-manifest.md`
- Content-proof alignment: `docs/content-proof-map.md`

## #34 Phase 3 proof pack
Status: PASS

Evidence:
- Proof pack: `docs/v3-proof-pack.md`
- Closeout index: `docs/issue-closeouts-25-34.md`
- Screenshot inventory: `docs/screenshots/*` (Phase 3 captures)
- Gate outputs: `npm run verify:v1` (pass)
