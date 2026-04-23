# Issues 197-208 Closeout

## #197 Remove duplicated navigation rendering from service request routes
### Header render-state matrix
| Route type | Desktop header nav source | Mobile header nav source | Footer secondary route-list panel |
| --- | --- | --- | --- |
| Marketing (`/`, `/faq`, etc.) | `getHeaderNavLinks("marketing")` | `getHeaderNavLinks("marketing")` via shared `navLinks` prop | Visible |
| Task (`/contact`, `/realtors`, `/services/*`) | `getHeaderNavLinks("task")` | `getHeaderNavLinks("task")` via shared `navLinks` prop | Hidden |

### Root-cause summary
- Duplicate route-list chrome came from footer route links showing on request/task routes while compact header nav was already present.
- Header route source is now canonicalized through `getHeaderNavLinks(...)`, and footer route links are suppressed for task routes.

### Before/after screenshot set
- Before: `docs/screenshots/issues-185-196/septic-cleaning-desktop-1280.png`
- After: `docs/screenshots/issues-197-208/septic-cleaning-desktop-1280.png`
- Before: `docs/screenshots/issues-185-196/contact-desktop-1280.png`
- After: `docs/screenshots/issues-197-208/contact-desktop-1280.png`

### Regression-test update summary
- Updated `tests/navigation-contract.spec.ts` to validate canonical header nav source usage and footer marker presence.
- Updated `tests/routes/requestFlowBehavior.e2e.ts` to assert no secondary route-list nav chrome on request routes.

### Closeout evidence
- DOM/text snapshot proof: `tests/routes/requestFlowBehavior.e2e.ts` (`header[data-site-header]`, `nav[data-primary-nav="desktop"]`, `[data-secondary-route-links]` assertions).
- Test output: `[request-flow-behavior-e2e] nav singularity ... pass`.

## #198 Remove public demo/runtime provenance and deployment metadata from customer routes
### Leakage inventory
- Public route body leakage terms blocked by e2e pattern: `Mode:`, `Commit:`, `Ref:`, `Build`.
- Runtime proof endpoint hardened: unauthorized access now returns `404 not-found`, not `401`.

### Removal diff summary
- `src/app/api/runtime-proof/route.ts`: invalid/missing review cookie now returns `404`.
- `src/middleware.ts`: `/api/runtime-proof` unauthorized path returns `404`.

### Public/internal boundary note
- Runtime-proof diagnostics remain non-production only, host-gated, and now non-discoverable to unauthorized requests.

### Regression test note
- Updated `tests/routes/requestFlowBehaviorContract.spec.ts` to enforce no auth-leakage style `401` contract for runtime-proof.
- `tests/routes/requestFlowBehavior.e2e.ts` continues route-text leakage checks.

### Closeout evidence
- Before/after screenshots: `docs/screenshots/issues-185-196/*` vs `docs/screenshots/issues-197-208/*`.
- Route text proof: leakage pattern assertions in `requestFlowBehavior.e2e.ts`.
- Test output: `[request-flow-behavior] ... provenance behavior guards pass`.

## #199 Replace homepage “Learn more” with task-specific lane CTAs
### Before/after CTA inventory
| Lane | Before state | After CTA |
| --- | --- | --- |
| Emergency | Generic style CTA risk | `Call + Open Emergency Lane` |
| Routine pumping | Generic style CTA risk | `Start Routine Pumping` |
| Evaluation | Generic style CTA risk | `Start Evaluation Request` |
| Rental | Generic style CTA risk | `Start Rental Request` |
| Commercial | Generic style CTA risk | `Start Commercial Request` |

### Lane-to-destination table
| Lane | Destination |
| --- | --- |
| Emergency + routine septic | `/contact?lane=septic-service` |
| Evaluation | `/contact?lane=evaluation` |
| Rental | `/contact?lane=rental` |
| Commercial | `/contact?lane=commercial-service` |

### Copy diff summary
- Homepage CTA copy remains task/action specific; no generic “Learn more”.
- Contract remains enforced by `tests/homepage-structure-contract.spec.ts` and `tests/content/copyRules.spec.ts`.

### Closeout evidence
- Before/after screenshots: `docs/screenshots/issues-185-196/home-desktop-1280.png` vs `docs/screenshots/issues-197-208/home-desktop-1280.png`.
- CTA table: included above.

## #200 Consolidate homepage trust and lane messaging into one stronger conversion hierarchy
### Repetition audit
- Prior layout split trust and Realtor/evaluation proof into separate stacked sections.
- Trust/lane proof now consolidated into one combined conversion-proof section.

### Section consolidation plan
- Keep: hero, lane router, FAQ preview, final CTA.
- Consolidate: trust + Realtor proof into single `conversionProof` section.
- Remove repeated trust storytelling block duplication.

### Final homepage section map
1. Hero
2. Lane router
3. Conversion proof (trust + Realtor deadline fit)
4. FAQ preview
5. Final CTA

### Copy diff
- `src/content/home.ts` migrated from `trustBand + realtorProof + trustPanel` to `conversionProof`.
- `src/app/page.tsx` updated to match consolidated hierarchy.

### Closeout evidence
- Before/after screenshots: `docs/screenshots/issues-185-196/home-desktop-1440.png` vs `docs/screenshots/issues-197-208/home-desktop-1440.png`.
- Repetition inventory: consolidation summary above.

## #201 Canonicalize public business facts and isolate unresolved legacy facts from customer UI
### Canonical fact table
- Source of truth: `src/content/businessFacts.ts` (`publicBusinessFacts`, `publicBusinessFactTable`, `businessFactRegistry`).
- Dominant lines: emergency + primary service semantics, secondary office line subordinate.
- Canonical publishable address: `1565 N Dagget Rd, Pierson, MI 49339`.

### Legacy conflict inventory
- `sparta_legacy_address` marked `pending-verification`, `public: false`.
- `legacy_secondary_phone_variant` marked `pending-verification`, `public: false`.

### Verified vs pending fact map
- Verified/public: business name, emergency line semantic, primary line semantic, secondary office semantic, primary address.
- Pending/internal-only: legacy Sparta address, legacy secondary phone variant.

### Route adoption summary
- Header/footer/contact/service routes continue consuming canonical phone/address via `publicBusinessFacts` and `publicLocations` derived from it.
- Business-facts contract enforces no pending-verification public facts.

### Closeout evidence
- Fact table: `docs/business-truth/owner-truth-dashboard.md`.
- Search/diff proof: `src/content/businessFacts.ts`, `tests/content/businessFactsContract.spec.ts`.
- Route screenshots: `docs/screenshots/issues-197-208/*`.

## #202 Rebuild septic request route around decisive service narrative
### Service narrative block spec
- Added explicit septic narrative block near form:
  - `What service includes`
  - `Pricing factors`
  - `What happens next`
- Marker: `data-septic-narrative-spec="includes-pricing-next-steps"`.

### Source mapping note
- Uses `entry.slots.includedItems`, `entry.slots.pricingFactors`, and `servicesContent.septicCleaning.nextSteps`.

### Section-order summary
- Hero summary
- Decisive narrative trio
- Call-first support rail
- Form
- Compact emergency reminder post-form

### Copy diff
- Removed broad pre-form septic prep module.
- Replaced with concise narrative cards and quick-prep support.

### Closeout evidence
- Before/after screenshots: `issues-185-196/septic-cleaning-desktop-1440.png` vs `issues-197-208/septic-cleaning-desktop-1440.png`.
- Source mapping: `src/components/site/ServiceRequestPageTemplate.tsx`.

## #203 Compress pre-form support content and move low-value detail out of first task path
### Pre-form content audit
- Removed multi-column `SepticPrepModule` heavy block.
- Kept only concise quick prep and decisive narrative cards.

### Compression/relocation plan
- Moved less-critical guidance out of top pre-form stack.
- Kept immediate call-first + first-step messaging nearest form entry.

### Scroll-depth comparison
- Gate threshold continues enforced in e2e:
  - Desktop first editable septic control `< 1550`
  - Mobile first editable septic control `< 1850`

### Before/after screenshots
- Before: `docs/screenshots/issues-185-196/septic-cleaning-mobile-390.png`
- After: `docs/screenshots/issues-197-208/septic-cleaning-mobile-390.png`

### Closeout evidence
- Content diff: `src/components/site/ServiceRequestPageTemplate.tsx`.
- Test output: `[request-flow-behavior-e2e] ... early first-step ... pass`.

## #204 Differentiate Realtor/evaluation lane into deadline-first transaction workflow
### Realtor workflow map
- Route remains transaction-first with explicit deadline/coordination framing.
- Separate from routine pumping lanes.

### Deadline-field summary
- Request flow uses evaluation form lane (`RealtorEvaluationFlow` -> `RequestForm` type `evaluation`) with deadline/access transaction context fields.

### Route copy plan
- Early copy emphasizes closing windows, timeline pressure, access readiness, and role-based context.

### CTA alignment note
- Support rail CTA: call-first evaluation coordination.
- Homepage conversion proof CTA: `Open Deadline-First Realtor Lane`.

### Closeout evidence
- Route screenshots: `docs/screenshots/issues-197-208/realtors-desktop-1280.png`, `realtors-mobile-390.png`.
- Field/copy references: `src/app/realtors/page.tsx`, `src/components/forms/RealtorEvaluationFlow.tsx`.

## #205 Expand portable-toilet route around rental scenarios, cadence, and coverage
### Rental scenario matrix
- Homes, events, schools, businesses, jobsites supported in copy and field prompts.

### Quote-field rationale table
| Field intent | Capture path |
| --- | --- |
| Unit count | Rental form fields |
| Duration | Rental form fields |
| Service cadence | Rental form fields |
| Access notes | Rental form fields |

### Coverage language summary
- Coverage remains qualified and source-backed: “qualified 60-mile radius” wording.

### Copy diff
- Scenario-first route and support copy preserved with explicit cadence/coverage callouts.

### Closeout evidence
- Before/after screenshots: `issues-185-196/portable-toilets-desktop-1280.png` vs `issues-197-208/portable-toilets-desktop-1280.png`.
- Field matrix: existing form contract + route copy.

## #206 Split commercial support into distinct sub-lanes
### Commercial lane map
- Grease trap
- Lift pump
- Commercial septic
- Catch-all troubleshooting

### CTA matrix
- `Request Grease Trap Service`
- `Request Lift Pump Support`
- `Request Commercial Septic Service`
- `Open Commercial Troubleshooting`

### Routing summary
- CTA query param maps to form initial value via `workTypeMap` in commercial route.

### Copy diff
- Commercial route copy preserves explicit sub-lane distinction and catch-all path.

### Closeout evidence
- Route screenshots: `docs/screenshots/issues-197-208/commercial-desktop-1280.png`, `commercial-mobile-390.png`.
- Routing implementation: `src/app/services/commercial/page.tsx`, `src/components/services/CommercialSupportGrid.tsx`.

## #207 Govern/remove legacy coupon, Facebook, and old trust blocks
### Trust block inventory
- Source inventory maintained in `src/content/trust.ts` and `docs/trust/*`.

### Keep/update/remove table
- Keep: family-owned signal, emergency responsiveness, lane breadth, Realtor support.
- Update: association promotional signal.
- Remove: legacy Facebook prompt, legacy coupon trust block.

### Governance note
- Ownership/status/freshness metadata required per trust signal.
- Release reviews reference trust governance registry before publishing trust changes.

### Before/after screenshot summary
- Trust area remains present but consolidated with conversion proof hierarchy on homepage.

### Closeout evidence
- Trust inventory + decision table: `docs/trust/trust-governance-registry.md`.
- Homepage screenshots: `issues-185-196/home-*` vs `issues-197-208/home-*`.

## #208 Combined release-quality gate for hygiene/truth/screenshot proof
### Release gate checklist
- Consolidated in:
  - `docs/release/final-service-route-release-gate.md`
  - `docs/release/request-route-release-gate.md`
  - `docs/release/public-surface-release-gate.md`
- PR template updated with explicit CTA/provenance/proof-bundle checks.

### Proof artifact inventory
- Added batch capture + validation for `docs/screenshots/issues-197-208/*`.
- CI workflow now runs `proof:issue-197-208`.
- New example bundle doc: `docs/release/example-proof-bundle-197-208.md`.

### Route release workflow note
- CI + PR template block release unless hygiene, business-truth, and screenshot artifacts are complete.

### Example completed bundle
- `docs/release/example-proof-bundle-197-208.md`.

## Command Evidence
- `npm run test:navigation-contract`
- `npm run test:homepage-structure-contract`
- `npm run test:request-flow-behavior`
- `npm run test:request-route-release-gate`
- `npm run test:business-facts-contract`
- `npm run typecheck`
- `npm run test:request-flow-behavior-e2e`
- `npm run proof:issue-197-208`
- `npm run test:visual-public-evidence`
