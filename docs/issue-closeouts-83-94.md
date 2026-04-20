# Issue Closeouts 83-94

## 83 Identity Canonicalization
- Files touched:
  - `src/config/company.ts`
  - `src/components/site/Header.tsx`
  - `src/components/site/Footer.tsx`
  - `src/app/layout.tsx`
  - `scripts/check-identity-hardcoding.mjs`
- Invariants:
  - no hardcoded brand/phone/address literals in `src/app` or `src/components`
  - identity facts flow from canonical config/content modules
- Regression class prevented:
  - public identity drift (name/phone/address inconsistencies)

## 84 Structured Service/FAQ/Trust Content
- Files touched:
  - `src/content/services.ts`
  - `src/content/faq.ts`
  - `src/content/trust.ts`
  - `scripts/check-content-driven-claims.mjs`
- Invariants:
  - content status fields added (`verified|marketing|pending_verification`)
  - FAQ/trust claims remain content-driven, not page-local strings
- Regression class prevented:
  - claim drift from ad-hoc page copy edits

## 85 Navigation Contract
- Files touched:
  - `src/content/navigation.ts`
  - `src/components/site/Header.tsx`
  - `src/components/site/Footer.tsx`
  - `tests/navigation-contract.spec.ts`
- Invariants:
  - one shared nav source for desktop and mobile
  - footer fast paths centralized with privacy route
- Regression class prevented:
  - route hierarchy mismatch across nav surfaces

## 86 Homepage Conversion Structure
- Files touched:
  - `src/content/home.ts`
  - `src/app/page.tsx`
  - `tests/homepage-structure-contract.spec.ts`
- Invariants:
  - required order: hero > primary task CTAs > service lanes > trust > realtor lane > FAQ > final CTA
  - generic CTA labels blocked by contract test
- Regression class prevented:
  - conversion CTA ambiguity and section-order drift

## 87 Reusable Service Page Template
- Files touched:
  - `src/content/serviceTemplates.ts`
  - `src/components/site/ServiceRequestPageTemplate.tsx`
  - `src/app/services/*/page.tsx` (core service pages)
  - `tests/service-template-contract.spec.ts`
- Invariants:
  - required template slots enforced:
    - headline
    - summary
    - included items
    - proof points
    - FAQ subset
    - primary CTA
    - optional secondary CTA
- Regression class prevented:
  - undocumented structural divergence across service routes

## 88 Form Contract + Privacy Linkage
- Files touched:
  - `src/app/privacy/page.tsx`
  - `src/content/privacy.ts`
  - `src/content/navigation.ts`
  - `src/lib/forms/fieldPurposeMap.ts`
  - `tests/field-purpose-contract.spec.ts`
- Invariants:
  - privacy route exists and is reachable from footer fast paths
  - every schema field has a documented operational purpose
- Regression class prevented:
  - intake over-collection without documented operational value

## 91 Multi-Step Intake Flow
- Files touched:
  - `src/components/forms/RequestForm.tsx`
  - `tests/multistep-form-contract.spec.ts`
- Invariants:
  - back-button safe
  - review/edit safe
  - values persisted between steps via state and review hidden inputs
- Regression class prevented:
  - silent data loss during multi-step navigation

## 89 Mobile Ergonomics Audit
- Files touched:
  - `scripts/audit-control-sizes.mjs`
  - `docs/mobile-control-audit.md` (generated)
  - `docs/verification/mobile-control-audit.json` (generated)
- Invariants:
  - measured control audit table includes selector/route/min-height/min-width/pass-fail
  - hard fail if measured primary controls violate 44x44 target
- Regression class prevented:
  - undersized touch targets on core mobile flows

## 90 Accessibility Baseline
- Files touched:
  - `src/components/forms/RequestForm.tsx`
  - `tests/accessibility-contract.spec.ts`
- Invariants:
  - route coverage includes home/services/core-services/faq/contact/privacy
  - form status updates announced via `aria-live`
- Regression class prevented:
  - inaccessible status state changes and missing route coverage

## 92 Visual Token Contract
- Files touched:
  - `src/app/globals.css`
  - `src/components/forms/RequestForm.tsx`
  - `tests/visual-token-contract.spec.ts`
- Invariants:
  - typography/spacing/radius/shadow/section/card padding tokenized
  - core form surfaces consume token primitives
- Regression class prevented:
  - spacing/radius/shadow inconsistency drift

## 93 Metadata/Schema Contract
- Files touched:
  - `tests/schema-source-contract.spec.ts`
  - `docs/schema-source-map-83-94.md`
- Invariants:
  - schema fields trace to canonical content/business modules
  - unverifiable review/rating fields blocked
- Regression class prevented:
  - unsafe SEO claim inflation

## 94 Gate + Evidence Loop
- Files touched:
  - `.github/pull_request_template.md`
  - `scripts/capture-regression-screens.mjs`
  - `scripts/check-issue-83-94-evidence.mjs`
  - `package.json` gate scripts
- Gate classes:
  - route smoke
  - content truth
  - visual regression
  - closeout evidence completeness
- Regression class prevented:
  - release without objective proof artifacts

## Commands / Tests
- `npm run lint`
- `npm run typecheck`
- `npm run verify:v1`
- `npm run proof:issue-83-94:screens`
- `npm run proof:issue-83-94:controls`
- `npm run check:issue-83-94:evidence`

## Evidence Artifact Locations
- `docs/screenshots/issue-83-94-*-desktop-1440.png`
- `docs/screenshots/issue-83-94-*-mobile-390.png`
- `docs/mobile-control-audit.md`
- `docs/verification/mobile-control-audit.json`

## Deferred
- None.
