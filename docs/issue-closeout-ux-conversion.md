# UX Conversion + Governance Closeout (Issues 1-8)

## Execution Order
1. Issue 6 - Claim governance drift reconciliation
2. Issue 1 - Remove internal/project language from customer copy
3. Issue 2 - Homepage conversion lane rebuild
4. Issue 3 - Mobile conversion-first header and sticky action rail
5. Issue 4 - Service landing-page conversion refactor
6. Issue 5 - Realtor lane elevation
7. Issue 7 - Proof-driven trust modules
8. Issue 8 - Screenshot-backed audit pack

## Issue 6 - Truth Drift Summary
### Files changed
- `src/config/company.ts` (no structural change; remained canonical source)
- `docs/claim-registry.md`
- `docs/publishability-gates.md`
- `docs/verification-checklist.md`
- `docs/location-display-strategy.md`

### Final canonical claim table (summary)
- Brand: Robinson Septic Cleaning
- Primary phone: (616) 636-5565
- Secondary phone: (616) 887-2060
- Fax: (231) 937-8383
- Primary address: 1565 N Dagget Rd, Pierson, MI 49339
- Secondary address reference: 113 South Union, Sparta, MI 49345
- Emergency wording: 24/7 Emergency Service (publishable)
- Blocked: BBB accreditation claim, inflated review-count claims

### Route compliance proof
- `npm run check:hardcoded-contact` -> pass
- `npm run check:provisional-claims` -> pass

## Issue 1 - Internal Language Removal
### Files touched
- `src/content/home.ts`
- `src/content/services.ts`
- `src/content/trust.ts`
- `src/content/contact.ts`
- `src/content/faq.ts`
- `src/app/page.tsx`
- `src/app/services/page.tsx`
- `src/app/services/septic-cleaning/page.tsx`
- `src/app/services/well-septic-evaluations/page.tsx`
- `src/app/services/portable-toilets/page.tsx`
- `src/app/services/commercial/page.tsx`
- `src/app/realtors/page.tsx`
- `src/app/faq/page.tsx`

### Before/after copy summary
- Replaced internal/process wording with direct homeowner/business/Realtor language.
- Removed references that read like build commentary.
- Reframed all major sections around service outcomes, urgency, and request readiness.

### Removed internal/meta phrases
- "this page now sells"
- "keeps this visible"
- "cleaner intake path"
- "generic residential-only messaging"
- "request lane" phrasing on customer routes

### Phrase-removal proof
- Search run: `rg -n "this page now sells|keeps this visible|intake path|request lane|generic residential" src/app src/content`
- Result: no matches

## Issue 2 - Homepage Conversion Rebuild
### Updated section order
1. Hero with immediate `Call Now` + `Request Service` + `Realtor Evaluation Request`
2. Service choice grid (emergency, routine, Realtor/home-sale, portable/commercial)
3. Three primary conversion blocks (emergency, routine, Realtor)
4. Supporting slideshow and trust
5. Portable/commercial support section
6. FAQ preview
7. Final CTA band

### CTA map (current)
- Hero: `Call Now`, `Request Service`, `Realtor Evaluation Request`
- Emergency block: `/services/septic-cleaning`
- Routine block: `/services/septic-cleaning`
- Realtor block: `/realtors`
- Portable block: `/services/portable-toilets`
- Commercial block: `/services/commercial`
- Final CTA: `/contact`

### Conversion rationale summary
- First viewport now prioritizes urgent call behavior and form request options.
- Realtor/home-sale CTA is promoted to top-band status.
- Portable/commercial remains prominent without crowding primary emergency/routine actions.

## Issue 3 - Mobile Header + Sticky Action Rail
### Files touched
- `src/components/site/Header.tsx`
- `src/components/site/MobileActionRail.tsx` (new)
- `src/app/layout.tsx`

### Action hierarchy
- Top priority: `Call Now`
- Secondary: `Request Service`
- Navigation remains available through compact menu

### Before/after dimension notes
- Mobile menu toggle reduced from `h-12 w-12` to `h-10 w-10`.
- Mobile logo width reduced from `112px` to `96px`.
- Header vertical padding tightened to `py-2.5`.
- Sticky action rail added at bottom on mobile with two equal-width actions.

### Accessibility notes
- Menu button keeps `aria-expanded` and `aria-controls`.
- Sticky actions are text-first high-contrast controls.
- No clipped brand or controls across 360/390/430 widths.

## Issue 4 - Service Page Conversion Landing Refactor
### Per-page structure summary
- Septic cleaning: urgent hero, reasons to call, what to have ready, in-page request form.
- Evaluations: deadline-focused hero, reasons to request, what to have ready, Realtor-linked request form.
- Portable toilets: planning-focused hero, reasons to request, what to have ready, rental request form.
- Commercial: operations-focused hero, reasons to request, what to have ready, commercial request form.

### CTA placement summary
- Each service route now has above-the-fold value + clear request form/CTA in first screen bands.
- Form sections are route-native, not generic footer-only actions.

## Issue 5 - Realtor Premium Trust Lane
### Files touched
- `src/app/realtors/page.tsx`
- `src/app/services/well-septic-evaluations/page.tsx`
- `src/app/services/well-septic-evaluations/realtors/page.tsx`
- `src/components/forms/RequestForm.tsx`
- `src/app/page.tsx`

### Form/microcopy updates
- Realtor form title: `Request Realtor / Home-Sale Evaluation`
- Role label: `Your Role (Realtor, Buyer, Seller)`
- Type-specific helper text for evaluation deadlines and contact coordination.

### Route-link proof
- Homepage links directly to `/realtors` and evaluation pages.
- Evaluations page includes direct Realtor resource link.
- Nested Realtor support route points to `/realtors`.

## Issue 7 - Proof-Driven Trust Modules
### Trust module inventory
- Family owned and operated since 1979
- 24/7 Emergency Service
- Residential + commercial coverage
- Home-sale evaluations
- Portable rentals
- Michigan Septic Tank Association membership

### Old vs new summary
- Old trust copy contained generic benefits and internal framing.
- New trust copy maps directly to evidence-backed, bookable value statements.

## Issue 8 - Screenshot Pack + UI Audit
- See `docs/ui-ux-audit-pack.md` for route-by-route findings and pass/fail matrix.
- Fresh screenshots stored under `docs/screenshots/*-desktop-1440.png` and `*-mobile-390.png`, plus header-width checks at 360/390/430.

## Validation Commands
- `npm run lint` -> pass
- `npm run typecheck` -> pass
- `npm run check:hardcoded-contact` -> pass
- `npm run check:provisional-claims` -> pass
- `node scripts/capture-screenshots.mjs` -> pass
