# Task Page Large-Screen Composition Contract (Issues 152 + 162)

## Purpose
- Prevent "technically responsive but spatially ambiguous" request/task pages on desktop.
- Require explicit layout intent for support rails, form shells, and footer separation.

## Scope
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/contact`
- `/realtors`

## Required Patterns
1. Each major section must declare desktop mode explicitly:
- `supportRail`
- `formDominant`
- `fullWidthSupport`
2. Support-rail sections must render both primary and support content.
3. `formDominant` sections must not render an adjacent support rail.
4. Active form sections must use `task-page-form-shell` and remain visually dominant.
5. Request-template routes must expose:
- `data-request-layout-contract`
- `data-request-layout-geometry="explicit-section-modes"`
- `data-request-layout-modes`

## Spatial Rules
1. Large-screen blank right-side bands are not allowed unless they are the intentional gutter of the active mode.
2. In `supportRail` mode, right-rail content must not be materially shorter than the paired primary column such that obvious right-column voids appear.
3. Pre-form support content must be compressed or moved out of the form-priority section.
4. Step actions must remain attached to the form shell, not the outer page band.
5. Footer entry must be visually separated from the active form runway.

## Evidence Contract
1. Desktop screenshots required at `1280` and `1440` for:
- septic
- contact
- well/septic evaluations
- portable rentals
- commercial
- realtors
2. Mobile screenshots required at `390` for the same route set.
3. Composition audit JSON required:
- `docs/screenshots/issues-163-172/composition-audit.json`
4. PR must include:
- layout mode inventory
- pass/fail status for composition heuristics
- explicit answers for Apple-style spatial-intent checks:
  - blank-space intent
  - rail stability
  - form dominance
  - footer separation
  - action locality
