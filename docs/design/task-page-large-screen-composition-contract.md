# Task Page Large-Screen Composition Contract (Issue 152)

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
- `support-rail`
- `full-width`
2. Support-rail sections must render both primary and support content.
3. Full-width sections must not render an adjacent support rail.
4. Active form sections must use `task-page-form-shell` and remain visually dominant.
5. Request-template routes must expose:
- `data-request-layout-contract`
- `data-request-layout-geometry="explicit-section-modes"`
- `data-request-layout-modes`

## Spatial Rules
1. Large-screen blank right-side bands are not allowed unless they are the intentional gutter of the active mode.
2. In `support-rail` mode, right-rail content must not be materially shorter than the paired primary column such that obvious right-column voids appear.
3. Pre-form support content must be compressed or moved out of the form-priority section.
4. Step actions must remain attached to the form shell, not the outer page band.
5. Footer entry must be visually separated from the active form runway.

## Evidence Contract
1. Desktop screenshots required at `1280`, `1440`, and `1920` for:
- septic
- contact
- well/septic evaluations
- portable rentals
2. Composition audit JSON required:
- `docs/screenshots/issues-143-152/composition-audit.json`
3. PR must include layout mode inventory and pass/fail status for composition heuristics.
