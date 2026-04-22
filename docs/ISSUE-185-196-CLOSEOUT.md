# ISSUE 185-196 Closeout

## #185 Homepage lane cards to direct task-entry cards

### Before/After Lane-Card Inventory
| Lane | Before pattern | After pattern |
| --- | --- | --- |
| Emergency septic | Brochure card with descriptive body | Task-entry card with `user problem + lane value + explicit action` and high emphasis |
| Routine pumping | Brochure card | Task-entry card with pumping-specific CTA |
| Evaluations | Brochure card | Task-entry card with evaluation-specific CTA |
| Rentals | Brochure card | Task-entry card with rental-specific CTA |
| Commercial | Brochure card | Task-entry card with commercial-specific CTA |

### Card Contract Definition
- Contract: `problem-value-action`
- Fields per card:
  - `userProblem`
  - `laneValue`
  - `ctaLabel`
  - `href`
- Emergency card prominence: `data-lane-card-emphasis="high"`

### Route Mapping Table
| Lane card id | CTA | Target |
| --- | --- | --- |
| `emergency-septic` | Call + Open Emergency Lane | `/contact?lane=septic-service` |
| `routine-pumping` | Start Routine Pumping | `/contact?lane=septic-service` |
| `evaluation` | Start Evaluation Request | `/contact?lane=evaluation` |
| `rental` | Start Rental Request | `/contact?lane=rental` |
| `commercial` | Start Commercial Request | `/contact?lane=commercial-service` |

## #186 Homepage section contract and repetition reduction

### Section Contract
1. Hero
2. Lane router/cards
3. Trust band
4. Realtor/evaluation proof
5. FAQ preview
6. Final CTA

### Repetition Audit
- Removed repeated lane storytelling from trust-adjacent sections.
- Kept lane explanation concentrated in one lane-router band.
- Separated Realtor/evaluation proof from generic lane descriptions.

### Consolidation Plan Applied
- Retained strongest lane narrative in router cards.
- Kept trust claims in trust band only.
- Kept Realtor confidence messaging in dedicated proof section.

## #187 Public phone semantics split

### Phone Semantics Map
| Role | Label | Number | Dominance |
| --- | --- | --- | --- |
| `emergency_line` | Emergency dispatch line (call first) | (616) 636-5565 | dominant |
| `primary_service_line` | Primary service scheduling line | (616) 636-5565 | dominant |
| `secondary_office_line` | Secondary office line | (616) 887-2060 | subordinate |

### Before/After Placement Audit
- Header: now uses emergency semantic line.
- Footer: explicitly labels emergency, primary, and secondary roles.
- Homepage hero: emergency call button uses emergency semantic line.
- Service pages: call CTA uses primary service semantic line.

### Canonical Fact Note
- Canonical source is `src/content/businessFacts.ts` (`publicBusinessFacts.phoneSemantics`).

## #188 Septic route intro compression

### Intro Content Audit
- Previous top band had multiple support cards competing before task start.
- Support density delayed the first request interaction.

### Compression Plan
- Keep one urgent guidance block + one image.
- Move broad support detail into concise prep module and post-form support.

### New Section Order
1. Hero summary
2. Short urgent guidance
3. Call-first quick action
4. Coherent pre-form prep module
5. Form
6. Post-form next steps

## #189 Unified pre-form prep module

### Prep-Module Design Note
- New module: `data-septic-prep-module="coherent-pre-form-v1"`
- Combines:
  - Common reasons
  - What to have ready
  - What happens next

### Before/After Content Inventory
- Before: 3 fragmented support bands.
- After: 1 cohesive dispatch-prep block above form.

### Placement Rationale
- Keeps helpful guidance near form without delaying first input.

## #190 Dispatch-detail field layer

### Field Purpose Matrix (Septic)
| Field | Purpose |
| --- | --- |
| `problemSigns` | Dispatch symptom triage |
| `tankSizeGallons`, `tankCount` | Scope/equipment prep |
| `tankLocationKnown`, `lidsExposed` | Access and locate assumptions |
| `accessIssues` | Arrival blocker capture |
| `dispatchContactName`, `dispatchContactPhone` | On-site coordination path |
| `truckAccessLevel` | Route and vehicle maneuver planning |
| `occupancyAtService` | Arrival communication plan |

### Keep/Merge/Remove
- Keep: core dispatch and access fields.
- Merge: prep guidance into coherent module (no stacked micro-sections).
- Remove: `existingCustomer`, `propertyUsage`, `systemPumpedBefore`.

### Dispatch Rationale Note
- Every visible septic field now maps to dispatch, access, or scheduling outcomes.

## #191 Lane after-submit contract

### Lane-by-Lane After-Submit Matrix
| Lane | Reviewer | Priority rule | Follow-up expectation |
| --- | --- | --- | --- |
| Septic | Dispatch/intake | Emergency call-first | Routine follows route capacity |
| Evaluation | Evaluation coordination | Deadline pressure priority | 1-3 business days non-emergency |
| Rental | Rental coordination | Near-term date priority | Availability + quote follow-up |
| Commercial | Commercial dispatch intake | Operational risk priority | Service window planning follow-up |
| General | Office intake | Urgent concerns escalated | Next-business-day target |

### Success-State Copy Plan
- Added lane-specific success messages via `src/content/afterSubmit.ts`.
- Added review-step “After you submit” block before final submit action.

### Operational Alignment Note
- Emergency lane wording stays call-first.
- Non-emergency follow-up windows are explicit and lane-specific.

## #192 Footer hierarchy rework

### Footer Audit
- Reduced visual weight of route links.
- Renamed block to `Route links (secondary)`.
- Clarified service-area copy and reduced expansion verbosity.

### Before/After Link Hierarchy
- Before: strong route-link block with near-primary emphasis.
- After: global, secondary navigation styling and language.

### Copy Reduction Note
- Service-area expansion note shortened to concise availability statement.

## #193 Trust governance registry

### Trust Registry
- Added: `docs/trust/trust-governance-registry.md`
- Added owner + status taxonomy in `src/content/trust.ts`.

### Status Taxonomy
- `verified`
- `marketing`
- `pending-verification`

### Keep/Update/Remove Inventory
- Keep: family ownership, emergency responsiveness, lane coverage, Realtor support.
- Update: association-language governance.
- Remove: legacy social prompt, coupon trust block.

## #194 Owner-facing business-truth dashboard

### Truth Dashboard Table
- Added: `docs/business-truth/owner-truth-dashboard.md`
- Includes name, legal name, phone hierarchy, address, service area, emergency wording, active services, unresolved legacy variants.

### Status Legend
- `verified`, `pending-verification`, `blocked`

### Owner Action Checklist
- Added explicit unresolved-fact actions and release-process hook.

## #195 Screenshot and route-proof requirements

### Screenshot Proof Standard
- Updated: `docs/qa/request-route-screenshot-proof-standard.md`
- Added homepage + route/width matrix for required captures.

### Route/Width Matrix
- Routes: `/`, `/contact`, `/services/septic-cleaning`, `/services/well-septic-evaluations`, `/services/portable-toilets`, `/services/commercial`
- Widths: desktop `1280`, desktop `1440`, mobile `390`

### PR Process Update
- Updated `.github/PULL_REQUEST_TEMPLATE.md` with route-by-route screenshot checklist.

## #196 Final service-route release gate

### Release Gate Checklist
- Updated: `docs/release/request-route-release-gate.md`
- Added: `docs/release/final-service-route-release-gate.md`

### Proof Artifact Inventory
- deploy manifest
- request-route parity
- screenshot matrix
- composition audit + before/after matrix
- lane CTA inventory
- truth dashboard + trust registry references

### Route Release Workflow Note
- PR template now requires truth/trust/screenshot/CTA/schema checks before close.

## Closeout Evidence

### Before/After Screenshots
- Before baseline: `docs/screenshots/issues-173-184/*` and `docs/screenshots/issues-159-162/*`
- After captures: `docs/screenshots/issues-185-196/*`

### Section Map
- Homepage map encoded in `data-homepage-structure="hero-lane-router-trust-band-realtor-proof-faq-final-cta"`.

### Phone/Fact Table
- Canonical source: `src/content/businessFacts.ts`
- Owner dashboard: `docs/business-truth/owner-truth-dashboard.md`
