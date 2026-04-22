# Task Page Composition QA Checklist

## Required Evidence
- [ ] `docs/screenshots/issues-159-162/composition-audit.json` updated.
- [ ] Desktop screenshots captured for `1280` and `1440` on required routes.
- [ ] Mobile screenshots captured for `390` on required routes.
- [ ] Before/after screenshot pairs attached for touched task routes.

## Desktop Review Checks
- [ ] No major right-column blank zone larger than intended gutter.
- [ ] Mode switching is explicit and intentional (`support-rail` vs `full-width`).
- [ ] Active form shell is the dominant desktop object after intro/support band.
- [ ] Step action row is visually attached to the active form shell.
- [ ] Card pairings do not create obvious height-mismatch voids.
- [ ] Footer does not visually interrupt active step flow.
- [ ] Apple-style composition checks pass:
  - blank-space intent is explicit
  - support rail remains stable across scroll depth
  - form shell remains dominant
  - footer handoff is delayed and softened
  - primary action locality stays inside the active step shell

## Route Coverage
- [ ] `/services/septic-cleaning`
- [ ] `/contact`
- [ ] `/services/well-septic-evaluations`
- [ ] `/services/portable-toilets`
- [ ] `/services/commercial`
- [ ] `/realtors`
