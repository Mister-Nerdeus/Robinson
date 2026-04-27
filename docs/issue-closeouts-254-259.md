# Issue Closeouts 254-259

## Issue #254 - Convert the homepage Apple-UX review into an executable contract gate

### Summary
- Added executable homepage UX gate test: `tests/homepage-apple-ux-contract.spec.ts`.
- Added gate runner with synthetic failure mode: `scripts/check-homepage-apple-ux-gate.mjs`.
- Wired gate into package scripts and `verify:v1`.
- Updated UX gate docs to reference executable and manifest-backed evidence.

### Files Changed
- `tests/homepage-apple-ux-contract.spec.ts`
- `scripts/check-homepage-apple-ux-gate.mjs`
- `package.json`
- `docs/homepage-apple-ux-gate.md`
- `docs/ui-ux-audit-pack.md`

### Homepage UX Gate Coverage Table
| Contract | Executable Check |
| --- | --- |
| Footer compactness | `data-footer-surface="compact-contact-v1"` + single `<Footer />` in layout |
| Header hierarchy | call CTA before request CTA in header source |
| Hero stability | `HeroMedia` required; `HomeSlideshow` forbidden |
| Copy plain-language | banned jargon checks on `homeContent` |
| Service chooser calmness | `md:grid-cols-2`, `xl:grid-cols-3`, `min-h-[21rem]` card constraint |
| Trust/Realtor IA separation | trust marker must render before realtor marker + distinct titles |

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-apple-ux-contract`: PASS
- Synthetic failure proof: `node scripts/check-homepage-apple-ux-gate.mjs --synthetic-fail` -> FAIL (`synthetic failure mode triggered`)

### Closeout Evidence
- New gate test/script added and wired.
- Gate included in `verify:v1` and CI workflow.
- Manual UX gate doc now points to executable companion and manifest.

---

## Issue #255 - Create a canonical public CTA contract across hero, header, footer, mobile rail, and service chooser

### Summary
- Added canonical CTA source: `src/content/cta.ts`.
- Updated global CTA surfaces to consume canonical call/request family labels.
- Updated route-specific homepage CTA labels to contract-bound values.
- Added dedicated CTA contract test and documentation.

### CTA Matrix by Surface
| Surface | Call Family | Request Family | Route-Specific |
| --- | --- | --- | --- |
| Homepage hero | `Call Emergency Dispatch` | `Request Service` | N/A |
| Header | `Call Emergency Dispatch` | `Request Service` (marketing mode) | N/A |
| Footer | `Call Emergency Dispatch (number)` | N/A | N/A |
| Mobile action rail | `Call Emergency Dispatch` | `Request Service` | N/A |
| Service chooser cards | N/A | N/A | `Call Emergency Service`, `Schedule Pumping`, `Request Evaluation`, `Request Rentals`, `Get Commercial Help` |
| Realtor band | N/A | N/A | `View Realtor Services` |

### Files Changed
- `src/content/cta.ts`
- `src/content/home.ts`
- `src/app/page.tsx`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `src/components/site/MobileActionRail.tsx`
- `src/components/home/LaneTaskCard.tsx`
- `tests/public-cta-contract.spec.ts`
- `docs/public-cta-contract.md`
- `package.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:public-cta-contract`: PASS

### Closeout Evidence
- Canonical CTA contract source added.
- Cross-surface labels now bound to one contract.
- Generic CTA labels are explicitly blocked by contract.

---

## Issue #256 - Close the homepage structure and copy loophole for content-driven labels and CTAs

### Summary
- Split contracts by responsibility:
- structure/order: `tests/homepage-structure-contract.spec.ts`
- content-driven copy/CTA: `tests/homepage-content-contract.spec.ts`
- Added direct assertions against `src/content/home.ts`.

### Loophole Before/After
| State | Coverage |
| --- | --- |
| Before | `page.tsx` order markers were validated, but content-driven strings in `home.ts` could drift |
| After | `home.ts` content is directly validated for CTA families, jargon bans, IA separation, and generic CTA bans |

### Files Changed
- `tests/homepage-structure-contract.spec.ts`
- `tests/homepage-content-contract.spec.ts`
- `docs/homepage-copy-contract.md`
- `docs/homepage-ia-contract.md`
- `package.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-structure-contract`: PASS
- `npm run test:homepage-content-contract`: PASS

### Closeout Evidence
- New content-driven homepage contract test closes the loophole.
- Structure contract remains focused on section order.

---

## Issue #257 - Add screenshot freshness and evidence-manifest binding for homepage/public UX proof

### Summary
- Added manifest generator: `scripts/generate-homepage-ux-evidence-manifest.mjs`.
- Added manifest contract test: `tests/homepage-evidence-manifest.spec.ts`.
- Added manifest artifact: `docs/screenshots/homepage-ux-evidence-manifest.json`.
- Updated UX docs to point to manifest-backed evidence.

### Manifest Schema
| Field | Purpose |
| --- | --- |
| `manifestVersion` | pinned schema version (`homepage-ux-evidence-v1`) |
| `issueBatch` | binds proof to issue set (`254-259`) |
| `generatedAtUtc` | freshness timestamp |
| `captureMethod` | capture provenance (`playwright-local`) |
| `provenance.sourceCommit` | source commit binding |
| `contractReferences[]` | contracts this proof satisfies |
| `entries[]` | per-route viewport evidence with artifact path + capture metadata |

### Files Changed
- `scripts/generate-homepage-ux-evidence-manifest.mjs`
- `tests/homepage-evidence-manifest.spec.ts`
- `docs/screenshots/homepage-ux-evidence-manifest.json`
- `docs/ui-ux-audit-pack.md`
- `docs/homepage-apple-ux-gate.md`
- `package.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-evidence-manifest`: PASS

### Closeout Evidence
- Manifest binds screenshot evidence to contract references and source provenance.
- Stale/unbound artifacts now fail via:
- freshness assertion (`generatedAtUtc` max age)
- commit-binding assertion (`sourceCommit` must match current `HEAD`)
- missing-artifact and missing-contract-reference assertions

---

## Issue #258 - Enforce measurable public-route performance budgets for home, contact, and core services

### Summary
- Added measurable performance audit script: `scripts/audit-public-route-performance.mjs`.
- Added contract test: `tests/performance-budget-public-routes.spec.ts`.
- Added generated artifact: `docs/verification/public-route-performance.json`.
- Updated budget doc with measurable route thresholds and script/artifact contract.

### Route Budget Table
| Route | LCP Budget | FCP Budget | TTFB Budget | Measured (latest) | Result |
| --- | --- | --- | --- | --- | --- |
| `/` | 3200ms | 3200ms | 1000ms | LCP 96ms / FCP 96ms / TTFB 8.2ms | PASS |
| `/contact` | 2500ms | 1700ms | 900ms | LCP 36ms / FCP 36ms / TTFB 14.7ms | PASS |
| `/services/septic-cleaning` | 2800ms | 1800ms | 1000ms | LCP 52ms / FCP 36ms / TTFB 6.2ms | PASS |

### Files Changed
- `scripts/audit-public-route-performance.mjs`
- `tests/performance-budget-public-routes.spec.ts`
- `docs/PERFORMANCE_BUDGET_PUBLIC_ROUTES.md`
- `docs/verification/public-route-performance.json`
- `package.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:performance-budget-public-routes`: PASS

### Closeout Evidence
- Performance audit writes route-by-route artifact with explicit pass/fail checks.
- Gate fails when any route exceeds thresholds or when artifact schema is invalid.

---

## Issue #259 - Add a mobile action-rail no-overlap and safe-area contract for core public routes

### Summary
- Added mobile rail contract doc and executable audit.
- Added safe-area-aware shared spacing tokens in global layout CSS.
- Added screenshot capture + audit artifact for required mobile routes.
- Added dedicated mobile rail contract test.

### Route Coverage Table
| Route | Category | Overlap Result | Screenshot |
| --- | --- | --- | --- |
| `/` | homepage | PASS (`overlapPx: 0`) | `docs/screenshots/mobile-action-rail-home-390.png` |
| `/contact` | form | PASS (`overlapPx: 0`) | `docs/screenshots/mobile-action-rail-contact-390.png` |
| `/services/septic-cleaning` | core service form | PASS (`overlapPx: 0`) | `docs/screenshots/mobile-action-rail-service-390.png` |
| `/faq` | non-form public route | PASS (`overlapPx: 0`) | `docs/screenshots/mobile-action-rail-faq-390.png` |

### Files Changed
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/site/MobileActionRail.tsx`
- `scripts/capture-mobile-action-rail-proof.mjs`
- `tests/mobile-action-rail-contract.spec.ts`
- `docs/mobile-action-rail-contract.md`
- `docs/verification/mobile-action-rail-contract.json`
- `docs/screenshots/mobile-action-rail-home-390.png`
- `docs/screenshots/mobile-action-rail-contact-390.png`
- `docs/screenshots/mobile-action-rail-service-390.png`
- `package.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:mobile-action-rail-contract`: PASS

### Closeout Evidence
- Global safe-area contract documented and source-enforced (`body.site-shell` + `--mobile-action-rail-height`).
- Route-by-route no-overlap results are artifact-backed in `docs/verification/mobile-action-rail-contract.json`.

