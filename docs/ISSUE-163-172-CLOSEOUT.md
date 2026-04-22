# ISSUE-163-172 CLOSEOUT

## 163 - Template contract diff
- `ServiceRequestPageTemplate` now uses `Section layout="task"` explicitly.
- `RequestPageLayout` now requires explicit `topMode` and `formMode`.
- Service-template routes bind section modes from `REQUEST_ROUTE_SECTION_MODES` (no implicit fallback).

## 163 - Route adoption inventory
- `/services/septic-cleaning` -> `supportRail -> formDominant -> fullWidthSupport`
- `/services/well-septic-evaluations` -> `supportRail -> formDominant -> fullWidthSupport`
- `/services/portable-toilets` -> `supportRail -> formDominant`
- `/services/commercial` -> `supportRail -> formDominant`
- `/contact` -> `supportRail -> formDominant -> fullWidthSupport`
- `/realtors` -> `supportRail -> formDominant -> fullWidthSupport`

## 163 - Layout behavior note
- Request routes no longer rely on default marketing layout behavior.
- Section/layout choices are explicit at both wrapper and section-mode levels.

## 164 - Width token table
| Token | Value | Purpose |
| --- | --- | --- |
| `outerTaskPageMaxWidth` | `1720px` | outer task-page container |
| `supportBandPrimaryMaxWidth` | `1200px` | support-rail primary column cap |
| `supportRailMaxWidth` | `408px` | support rail width |
| `wizardShellMaxWidth` | `980px` | inner wizard shell cap |
| `desktopGutter` | `2.25rem` | desktop inter-column gutter |

## 164 - Before/after width summary
- Before: full-width sections inherited narrow form shell behavior.
- After: outer task container expands independently while form-dominant shell remains readable.

## 164 - Breakpoint matrix
- `>=1280`: wide task container cap active.
- `>=1024`: `supportRail` two-column + rail; `formDominant` wizard cap; `fullWidthSupport` uncapped support band.
- `<1024`: single-column stack.

## 165 - Section mode map
- Modes introduced: `supportRail`, `formDominant`, `fullWidthSupport`.
- Mode inventory published by `RequestPageLayout` marker: `data-request-layout-modes`.

## 165 - Transition rules
- `supportRail`: contextual support + optional rail.
- `formDominant`: active editable flow, no support rail.
- `fullWidthSupport`: broad support/post-form content with no wizard-shell cap.

## 166 - Header state matrix
- Marketing routes: top emergency bar + full nav set.
- Request routes: compact task header mode with one primary nav and emergency CTA.

## 166 - Duplicate-render root-cause note
- Duplicate-like chrome came from request routes inheriting brochure header surfaces.
- Fixed by explicit compact request-route header mode and shared mobile-nav component.

## 166 - Compact-header spec
- Marker: `data-site-header-mode="compact-task"`.
- Desktop nav marker: `data-primary-nav="desktop"` appears once.

## 167 - Leakage inventory
- Removed public footer runtime/provenance badges:
  - `Mode`
  - `Local-only`
  - `Admin review`
  - deployment stamp block

## 167 - Removal diff summary
- Footer no longer imports/uses `DeploymentStamp` or review-cookie runtime chrome.
- Runtime-proof remains API-gated for internal review access only.

## 167 - Public/internal boundary note
- Public UI is customer-facing only.
- Diagnostics stay behind non-production + admin review gating.

## 168 - Pre-form support inventory (septic/contact)
- Pre-form cards compressed.
- Availability/location-heavy support moved after active form on contact route.

## 168 - Compression/relocation decision table
| Surface | Action |
| --- | --- |
| Septic pre-form media/support | Reduced and compacted |
| Septic prep detail | moved into `<details>` |
| Contact availability/location | moved post-form (`fullWidthSupport`) |

## 168 - Scroll-depth comparison
- First editable control now appears earlier in both desktop/mobile behavior checks.

## 169 - Field semantics matrix
- `FormField` now wires:
  - `label htmlFor`
  - `aria-describedby` for helper + error
  - `aria-invalid`
  - `autoComplete`

## 169 - Autocomplete mapping table
| Field | Autocomplete |
| --- | --- |
| `fullName` | `name` |
| `phone` | `tel` |
| `email` | `email` |
| `streetAddress` | `address-line1` |
| `city` | `address-level2` |
| `state` | `address-level1` |
| `zip` | `postal-code` |
| `onSiteContact` | `name` |

## 169 - Accessibility regression checklist
- `test:accessibility-contract`
- `test:a11y-followthrough`

## 170 - Behavior test inventory
- `tests/routes/requestFlowBehavior.e2e.ts`
- `tests/routes/requestFlowBehaviorContract.spec.ts`
- `tests/visual/publicEvidence.spec.ts`

## 170 - Assertion matrix
- Single request-route desktop nav marker.
- No public provenance/runtime text.
- First editable control in early scroll band.
- Wizard step transition focus continuity.

## 170 - CI gate update summary
- Added workflow gates:
  - `test:request-flow-behavior-e2e`
  - `proof:issue-163-172`
  - `test:request-route-release-gate`

## 171 - Screenshot proof standard
- Standardized artifact set: `docs/screenshots/issues-163-172`
- Widths required: desktop `1280`/`1440`, mobile `390`

## 171 - Route/width matrix
- `/services/septic-cleaning`, `/services/well-septic-evaluations`, `/services/portable-toilets`, `/services/commercial`, `/contact`, `/realtors`

## 171 - Artifact storage convention
- `<route-slug>-desktop-1280.png`
- `<route-slug>-desktop-1440.png`
- `<route-slug>-mobile-390.png`
- `composition-audit.json`

## 172 - Release gate checklist
- Doc: `docs/release/request-route-release-gate.md`
- Contract test: `tests/routes/requestRouteReleaseGate.spec.ts`

## 172 - Proof artifact inventory
- `artifacts/deploy-manifest.json`
- `artifacts/request-route-parity.json`
- `docs/screenshots/issues-163-172/*`

## 172 - Route promotion requirements
- Promotion blocked unless all release-gate checklist artifacts are complete.
