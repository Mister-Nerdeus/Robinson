# Issue Closeouts 95-119

## 95 Contact Command Center
- Rebuilt `/contact` around emergency-first routing with:
  - `src/components/contact/PrimaryCallBand.tsx`
  - `src/components/contact/ContactHero.tsx`
  - `src/components/contact/ContactLaneGrid.tsx`
  - `src/content/contactRoutes.ts`

## 96 Lane-Specific Router
- Implemented `src/components/contact/RequestRouter.tsx`.
- Router options map to canonical routes with CTA labels and event names in `contactRoutes`.

## 97 Canonical Service-Area + Location Contract
- Added `src/content/serviceAreas.ts` and `src/content/locations.ts`.
- Added `docs/SERVICE_AREA_AND_LOCATION_CONTRACT.md`.

## 98 Availability and After-Hours Clarity
- Updated `src/content/contact.ts`.
- Added `src/components/contact/AvailabilityNotice.tsx`.
- Added form success/failure state components.

## 99 Unified Intake Pipeline
- Added `/api/forms` route.
- Added `src/lib/forms/abuseProtection.ts`.
- Added email provider seam + templates.
- Added `docs/INTAKE_PIPELINE_CONTRACT.md`.

## 100 Admin Inbox + Export
- Added CSV export in `SubmissionsTable`.
- Added `src/components/admin/SubmissionFilters.tsx` alias and integrated use.

## 101 Contact/Intake Analytics
- Centralized event taxonomy in `src/lib/analytics/events.ts`.
- Instrumented router selection, call CTAs, form progression, submit success/failure.

## 102 Realtor Workflow
- Added `src/components/forms/RealtorEvaluationFlow.tsx`.
- Updated `/realtors` to deadline-first workflow messaging.

## 103 Commercial Split Lanes
- Added `src/components/services/CommercialSupportGrid.tsx`.
- Updated `/services/commercial` to distinct operational paths.

## 104 Portable Quote-Ready Flow
- Added `src/components/forms/PortableToiletFlow.tsx`.
- Added `docs/PORTABLE_TOILET_FLOW_CONTRACT.md`.

## 105 Trust/Testimonial Honesty Contract
- Added source/freshness metadata in `src/content/trust.ts`.
- Added `src/content/testimonials.ts` and trust policy tests/docs.

## 106 Media Manifest and Alt Registry
- Added `src/content/media.ts` and `docs/MEDIA_ASSET_CONTRACT.md`.

## 107 Copy Style Contract
- Added `docs/COPY_STYLE_GUIDE.md`.
- Added copy-rule enforcement test (`tests/content/copyRules.spec.ts`).

## 108 Shared Public Component Contracts
- Added `docs/PUBLIC_COMPONENT_CONTRACTS.md`.

## 109 Non-Happy-Path UX
- Added `src/app/not-found.tsx`, `src/app/error.tsx`, `src/components/ui/EmptyState.tsx`, and form error state component.

## 110 Loading/Skeleton States
- Added `src/app/loading.tsx` and `src/components/ui/Skeleton.tsx`.

## 111 Contact/Service/Area Schema Expansion
- Added `src/components/seo/JsonLd.tsx` and `src/lib/seo.ts`.
- Updated schema mappings to canonical business + service-area modules.

## 112 Canonical Host + Legacy Redirect Discipline
- Added legacy redirects in `next.config.mjs`.
- Added canonical-host redirect behavior in `src/middleware.ts`.
- Added `docs/LEGACY_REDIRECT_MAP.md`.

## 113 Map/Directions Policy
- Implemented `mapEligible` gate in `LocationCard`.
- Added `docs/MAP_AND_DIRECTIONS_POLICY.md`.

## 114 Footer/Legal Surface
- Added `/terms` and `/accessibility` pages.
- Updated footer links and maintained service-first IA.

## 115 Visual QA Matrix
- Added `docs/PUBLIC_ROUTE_QA_MATRIX.md` and visual evidence contract test.

## 116 Accessibility Follow-Through
- Added `docs/ACCESSIBILITY_FOLLOWTHROUGH.md` and follow-through contract test.

## 117 Performance Budget
- Added `docs/PERFORMANCE_BUDGET_PUBLIC_ROUTES.md`.

## 118 Release Signoff Bundle
- Added release/cutover/post-launch docs and updated PR template.

## 119 Final CI Gates
- Added `.github/workflows/public-gates.yml`.
- Added route/content/visual contract tests and scripts.
