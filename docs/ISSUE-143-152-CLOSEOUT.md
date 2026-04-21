# Issue Batch 143-152 Closeout

## Scope
- `#143` Stable desktop request-page grid, no orphaned right-rail whitespace
- `#144` Explicit desktop layout-mode switching (`support-rail` vs `full-width`)
- `#145` Form-shell promoted to dominant desktop object after intro band
- `#146` Pre-form support cards compressed/relocated
- `#147` Step actions anchored to form shell
- `#148` Separate max-width tokens for marketing/request/form shells
- `#149` Card-density audit + height-mismatch re-stacking
- `#150` Large-screen composition regression gate
- `#151` Footer reduced near active form runway
- `#152` Large-screen spatial intent contract + PR gate

## Contract Diff
- Request layout contract version:
  - before: `form-first-full-width-v2`
  - after: `request-desktop-modes-v3`
- New request geometry marker:
  - `data-request-layout-geometry="explicit-section-modes"`
- New mode inventory marker:
  - `data-request-layout-modes="<ordered modes>"`
- New route-level mode marker:
  - `data-task-page-layout-mode="support-rail|full-width"`

## Layout Mode Inventory
- `/services/septic-cleaning`: `support-rail -> full-width -> full-width`
- `/services/well-septic-evaluations`: `support-rail -> full-width -> full-width`
- `/services/portable-toilets`: `support-rail -> full-width`
- `/services/commercial`: `support-rail -> full-width`
- `/contact`: `support-rail -> full-width`
- `/realtors`: `support-rail -> full-width -> support-rail`

## Width Token Table
| Token | Value | Purpose |
| --- | --- | --- |
| `--layout-marketing-max` | `1200px` | brochure/reading pages |
| `--layout-request-max` | `1480px` | request/task desktop surface |
| `--layout-task-max` | `var(--layout-request-max)` | task container alias |
| `--layout-form-shell-max` | `1120px` | active form shell dominance width |

## Content Reduction Inventory
- Moved service support blocks from pre-form zone into post-form support sections.
- Added `RequestSupportBlocks` compact variant:
  - shortened visible "reasons", "ready", and "next" lists
  - moved overflow details into `<details>` disclosure
- Realtor route split into:
  - intro support-rail section
  - full-width form section
  - compact post-form support-rail section

## Action Placement Spec
- Desktop step actions now render inside `.wizard-actions-row` with:
  - top divider
  - local top padding
  - right-aligned action controls
- Actions remain inside wizard shell, not page-band aligned.

## Footer Separation Spec
- Footer top runway increased (`mt-20`) with softer fast-path panel treatment.
- Fast-path links remain available but visually demoted relative to active form shell.

## Card Group Audit Notes
- Removed mixed-height pre-form card pairings from template primary column.
- Re-stacked support content into explicit post-form mode sections to avoid right-column voids.

## Visual Regression Output
- Composition audit artifact:
  - `docs/screenshots/issues-143-152/composition-audit.json`
- Required desktop screenshots:
  - `docs/screenshots/issues-143-152/septic-cleaning-desktop-1280.png`
  - `docs/screenshots/issues-143-152/septic-cleaning-desktop-1440.png`
  - `docs/screenshots/issues-143-152/septic-cleaning-desktop-1920.png`
  - `docs/screenshots/issues-143-152/contact-desktop-1280.png`
  - `docs/screenshots/issues-143-152/contact-desktop-1440.png`
  - `docs/screenshots/issues-143-152/contact-desktop-1920.png`
  - `docs/screenshots/issues-143-152/well-septic-evaluations-desktop-1280.png`
  - `docs/screenshots/issues-143-152/well-septic-evaluations-desktop-1440.png`
  - `docs/screenshots/issues-143-152/well-septic-evaluations-desktop-1920.png`
  - `docs/screenshots/issues-143-152/portable-toilets-desktop-1280.png`
  - `docs/screenshots/issues-143-152/portable-toilets-desktop-1440.png`
  - `docs/screenshots/issues-143-152/portable-toilets-desktop-1920.png`

## QA Notes
- Composition gate is now enforced in:
  - `tests/visual/publicEvidence.spec.ts`
  - `tests/task-page-composition-contract.spec.ts`
- PR checklist now requires explicit large-screen contract and screenshot evidence.
