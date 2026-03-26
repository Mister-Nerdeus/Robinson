# Issue Closeouts (1-14)

## Closeout: Issue 1 - Repo authority and closure standard
### Definition of Done Status
- PASS
### Evidence
- `README.md` defines local-only scope and out-of-scope exclusions.
- `docs/project-contract.md` establishes authority + phase order.
- `docs/issue-closeout-standard.md` defines artifact-backed closeout template.

## Closeout: Issue 2 - Canonical business facts and claim registry
### Definition of Done Status
- PASS
### Evidence
- Canonical config: `src/config/company.ts`
- Registry: `docs/claim-registry.md`
- Verification checklist: `docs/verification-checklist.md`
- Hardcoding proof commands:
  - `rg -n "\b\d{3}[-.)\s]?\d{3}[-.\s]?\d{4}\b" src/app src/components` -> no matches
  - `rg -n "\b\d+\s+[A-Za-z0-9.'-]+\s+(Street|St|Avenue|Ave|Road|Rd|Lane|Ln|Drive|Dr)\b" src/app src/components` -> no matches

## Closeout: Issue 3 - Legacy source/media authority
### Definition of Done Status
- PASS
### Evidence
- Source mapping: `docs/source-map.md`
- Media manifest: `docs/media-manifest.md`
- Raw intake layer: `src/content/raw/README.md`, `src/content/raw/legacy-intake.yml`
- Temporary assets staged under `public/images/legacy/*`

## Closeout: Issue 4 - App shell and isolated local runtime
### Definition of Done Status
- PASS
### Evidence
- Stack scaffolded in `package.json`, `tsconfig.json`, `tailwind.config.ts`, `components.json`
- Docker: `Dockerfile`, `docker-compose.yml`
- Local startup on dedicated port: `4850`
- Container mapping: host `3017` -> container `4850`

## Closeout: Issue 5 - Route authority and IA
### Definition of Done Status
- PASS
### Evidence
- Route contract: `docs/route-map.md`
- Shared navigation shell in `src/components/site/Header.tsx` and `Footer.tsx`
- Placeholder/real routes compile (validated by `next build` route table)

## Closeout: Issue 6 - Shared design system and trust-first shell
### Definition of Done Status
- PASS
### Evidence
- Primitives: `Header`, `Footer`, `Section`, `Hero`, `ServiceCard`, `TrustBand`, `CtaBand`
- Design spec: `docs/design-system.md`
- Reuse ratio note: homepage/routes assembled with shared primitives (no route-level bespoke shell duplication)

## Closeout: Issue 7 - Homepage conversion lanes
### Definition of Done Status
- PASS
### Evidence
- Homepage route: `src/app/page.tsx`
- Home modules: `src/components/home/*`, `src/content/home.ts`
- CTA audit:
  - Hero -> `/contact`
  - Septic lane -> `/services/septic-cleaning`
  - Realtor lane -> `/services/well-septic-evaluations`
  - Rental lane -> `/services/portable-toilets`
  - Final CTA -> `/contact`

## Closeout: Issue 8 - Service/support pages
### Definition of Done Status
- PASS
### Evidence
- Implemented routes under `src/app/services/*`, plus `/realtors`, `/faq`, `/contact`
- Internal linking includes explicit realtor support links and service index links
- Each route includes a clear CTA/form or next action

## Closeout: Issue 9 - Structured evidence-backed content modules
### Definition of Done Status
- PASS
### Evidence
- Content modules: `src/content/home.ts`, `services.ts`, `faq.ts`, `trust.ts`
- Proof map: `docs/content-proof-map.md`
- No-inline-long-copy rule added to proof map

## Closeout: Issue 10 - Submission contract + shared schema
### Definition of Done Status
- PASS
### Evidence
- Schema/types/defaults: `src/lib/forms/schema.ts`, `types.ts`, `defaults.ts`
- Contract doc: `docs/submission-contract.md`
- Submission types preserved in discriminated union

## Closeout: Issue 11 - Form UI system and lane embedding
### Definition of Done Status
- PASS
### Evidence
- Shared form components: `src/components/forms/FormField.tsx`, `RequestForm.tsx`
- Forms embedded in `/contact`, `/services/septic-cleaning`, `/services/well-septic-evaluations`, `/services/portable-toilets`, `/realtors`
- Success/error UX implemented in shared request form component

## Closeout: Issue 12 - Local persistence + gated review
### Definition of Done Status
- PASS
### Evidence
- Persistence: `src/lib/storage/submissions.ts` (local JSON file)
- Submission actions: `src/lib/forms/actions.ts`
- Admin review route: `src/app/admin/submissions/page.tsx`
- Env gate documented in `docs/local-submissions-review.md`

## Closeout: Issue 13 - Publishability guards
### Definition of Done Status
- PASS
### Evidence
- Guards: `scripts/check-hardcoded-contact.cjs`, `scripts/check-provisional-claims.mjs`
- Rule doc: `docs/publishability-gates.md`
- Sample failing case executed with temporary file:
  - `hardcoded_exit=1`
  - `claims_exit=1`
- Passing case validated by `npm run verify:v1`

## Closeout: Issue 14 - Quality gates + smoke checks + proof pack
### Definition of Done Status
- PASS
### Evidence
- Unified verification command: `npm run verify:v1`
- Smoke coverage script: `tests/smoke-routes.ts`
- Runbook: `docs/local-runbook.md`
- Final proof pack: `docs/v1-proof-pack.md`
