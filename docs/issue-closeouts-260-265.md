# Issue Closeouts 260-265

## Issue #260 - Enforce live-homepage parity between develop and the deployed demo

### Summary
- Added a homepage-specific live parity script and contract test.
- Bound the gate to exact homepage markers instead of loose reachability.
- Captured current develop and deployed demo screenshots plus a machine-readable parity artifact.

### Parity Criteria Table
| Criteria | Expected | Result |
| --- | --- | --- |
| Hero heading | `Need septic service now or want to schedule ahead?` | PASS |
| Chooser heading | `Choose your service` | PASS |
| Trust band present | `Why West Michigan trusts Robinson` | PASS |
| Realtor band present | `Selling a home? Keep evaluations on schedule` | PASS |
| Final CTA wording | `Need septic help now? Call for emergencies or request routine service.` | PASS |
| Compact footer marker | `compact-contact-v1` | PASS |

### Files Changed
- `scripts/verify-homepage-live-parity.mjs`
- `tests/homepage-live-parity-contract.spec.ts`
- `src/content/homepageContract.ts`
- `docs/homepage-live-parity-contract.md`
- `docs/verification/homepage-live-parity.json`
- `docs/screenshots/home-live-parity-develop-1440.png`
- `docs/screenshots/home-live-parity-demo-1440.png`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-live-parity-contract`: PASS

### Closeout Evidence
- Parity artifact: `docs/verification/homepage-live-parity.json`
- Screenshots: `docs/screenshots/home-live-parity-develop-1440.png`, `docs/screenshots/home-live-parity-demo-1440.png`
- Legacy drift now blocked: `Choose your task lane`, `Open All Request Lanes`, `Built on proven local trust`, coupon/social trust copy, generic `Learn more` chooser CTAs

---

## Issue #261 - Canonicalize the homepage trust stack from verified source evidence only

### Summary
- Replaced homepage trust copy with a five-claim verified-source trust stack.
- Added explicit blocked legacy trust patterns for coupon/social/reputation noise.
- Added a claim-to-source map for every homepage trust statement.

### Homepage Trust Stack Table
| Claim | Status |
| --- | --- |
| Family owned and operated. | verified-source |
| Founded in 1979. | verified-source |
| Residential and commercial septic service. | verified-source |
| Well and septic evaluations for home sales. | verified-source |
| Portable toilet rentals, grease trap cleaning, and lift pump support. | verified-source |

### Claim-to-Source Map
- `Family owned and operated.` -> `company.claims.family_owned`, `docs/business-truth/owner-truth-dashboard.md`
- `Founded in 1979.` -> `company.claims.founded_1979`, `docs/final-copy-proof-map.md`
- `Residential and commercial septic service.` -> `company.claims.residential_commercial`, `docs/final-copy-proof-map.md`
- `Well and septic evaluations for home sales.` -> `company.claims.home_sale_evaluations`, `docs/final-copy-proof-map.md`
- `Portable toilet rentals, grease trap cleaning, and lift pump support.` -> `company.claims.portable_toilet_rentals`, `company.claims.grease_trap_cleaning`, `company.claims.lift_pump_service`, `docs/final-copy-proof-map.md`

### Files Changed
- `src/content/trust.ts`
- `src/content/home.ts`
- `src/content/homepageContract.ts`
- `tests/homepage-trust-stack-contract.spec.ts`
- `docs/homepage-trust-stack-contract.md`
- `docs/homepage-trust-source-map.md`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-trust-stack-contract`: PASS

### Closeout Evidence
- Source map doc: `docs/homepage-trust-source-map.md`
- Blocked legacy trust items: coupon/discount language, Facebook-first proof, BBB wording, association-first proof, review-count inflation

---

## Issue #262 - Create a homepage-only CTA ladder and revenue-priority contract

### Summary
- Added a homepage CTA ladder contract with ordered urgency and request roles.
- Standardized global, route-specific, and premium Realtor CTA labels.
- Added a dedicated CTA contract test and surface matrix.

### Homepage CTA Ladder
| Priority | Role | Surfaces |
| --- | --- | --- |
| 1 | Emergency call | Header call, hero call, mobile rail call |
| 2 | Global request | Header request, hero request, mobile rail request, final CTA button |
| 3 | Route-specific service | Five chooser card CTAs |
| 4 | Premium Realtor lane | Realtor band CTA |

### CTA Matrix by Surface
- Full matrix: `docs/homepage-cta-matrix.md`

### Files Changed
- `src/content/cta.ts`
- `src/content/home.ts`
- `src/content/homepageContract.ts`
- `src/components/site/Header.tsx`
- `src/components/site/MobileActionRail.tsx`
- `src/components/home/LaneTaskCard.tsx`
- `src/components/site/CtaBand.tsx`
- `src/app/page.tsx`
- `tests/homepage-cta-ladder-contract.spec.ts`
- `docs/homepage-cta-ladder-contract.md`
- `docs/homepage-cta-matrix.md`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-cta-ladder-contract`: PASS

### Closeout Evidence
- New premium Realtor CTA: `Plan a Home-Sale Evaluation`
- Generic CTA drift blocked: `Learn More`, `Contact Us`, `Click Here`

---

## Issue #263 - Add a homepage message-compression and anti-repetition contract

### Summary
- Added an explicit section-job map and anti-repetition contract.
- Removed the extra trust narration paragraph from the homepage.
- Simplified header hierarchy and tightened copy to reduce brochure-style repetition.

### Homepage Section Job Map
- Full map: `docs/homepage-section-job-map.md`

### Repetition Cleanup Table
| Before Drift Risk | Cleanup |
| --- | --- |
| Repeated trust narration across multiple bands | Trust proof limited to one verified-source band |
| Workflow/process wording drifting into public copy | Explicitly banned `workflow`, `router`, `triage`, `intake`, `task lane` |
| Header chrome competing with homepage body | Removed the extra marketing topbar and kept a lighter header |

### Files Changed
- `src/content/home.ts`
- `src/content/trust.ts`
- `src/content/homepageContract.ts`
- `src/app/page.tsx`
- `src/components/site/Header.tsx`
- `tests/homepage-message-compression-contract.spec.ts`
- `docs/homepage-message-compression-contract.md`
- `docs/homepage-section-job-map.md`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-message-compression-contract`: PASS

### Closeout Evidence
- Trust and Realtor proof remain separate.
- Extra trust statement removed from homepage render.
- One-job map documented and enforced.

---

## Issue #264 - Enforce a measurable homepage performance and first-viewport conversion budget

### Summary
- Added a homepage-specific local Playwright performance audit and artifact.
- Added first-viewport CTA visibility checks alongside LCP/FCP/TTFB budgets.
- Switched public fonts to `next/font` to remove render-blocking mobile font fetches.

### Homepage Performance Budget Table
| Mode | Viewport | LCP | FCP | TTFB | Result |
| --- | --- | --- | --- | --- | --- |
| Mobile | `390x844` | `480ms` | `196ms` | `37.7ms` | PASS |
| Desktop | `1440x1400` | `124ms` | `124ms` | `11.4ms` | PASS |

### Files Changed
- `scripts/audit-homepage-performance.mjs`
- `tests/homepage-performance-budget.spec.ts`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `docs/HOMEPAGE_PERFORMANCE_BUDGET.md`
- `docs/verification/homepage-performance.json`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-performance-budget`: PASS

### Closeout Evidence
- Performance artifact: `docs/verification/homepage-performance.json`
- First viewport checks: hero heading, hero call, hero request, and mobile rail all pass
- Static hero media remains governed

---

## Issue #265 - Add homepage mobile conversion proof for sticky header + action rail + final CTA flow

### Summary
- Added a homepage-only mobile conversion audit and artifact.
- Captured the required first-viewport, mid-page, and final-CTA screenshots.
- Verified no visible CTA competition between sticky header and bottom rail on mobile.

### Homepage Mobile State Coverage Table
| State | Result |
| --- | --- |
| First viewport | PASS |
| Mid-page chooser/trust state | PASS |
| Final CTA state | PASS |

### Files Changed
- `scripts/capture-homepage-mobile-conversion-proof.mjs`
- `tests/homepage-mobile-conversion-contract.spec.ts`
- `docs/homepage-mobile-conversion-contract.md`
- `docs/verification/homepage-mobile-conversion.json`
- `docs/screenshots/home-mobile-first-viewport-390.png`
- `docs/screenshots/home-mobile-midpage-390.png`
- `docs/screenshots/home-mobile-final-cta-390.png`

### Acceptance Gate Results
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run test:homepage-mobile-conversion-contract`: PASS

### Closeout Evidence
- Mobile artifact: `docs/verification/homepage-mobile-conversion.json`
- Final CTA rail clearance: `200.58px`
- No visible header CTA competition on mobile: PASS
