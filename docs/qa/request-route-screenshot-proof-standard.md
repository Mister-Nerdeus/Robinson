# Request Route Screenshot Proof Standard

## Applies To
- `/`
- `/contact`
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`

## Required Artifacts
- Desktop full-page screenshots at `1280` and `1440` for each route.
- Mobile full-page screenshots at `390` for each route.
- Composition audit JSON:
  - `docs/screenshots/issues-163-172/composition-audit.json`
- Before/after matrix JSON:
  - `docs/screenshots/issues-163-172/before-after-matrix.json`
- Before and after screenshot pairs for any touched route.
- Behavior proof snapshot requirements:
  - no duplicated request-route nav
  - no public provenance/runtime text
  - route-specific CTA remains visible and task-oriented in first bands

## Baseline Inventory Paths
- Task-route baseline: `docs/screenshots/issues-159-162`
- Current captures: `docs/screenshots/issues-163-172`
- Batch closeout captures: `docs/screenshots/issues-185-196`

## Route And Width Matrix
- Homepage: `1280`, `1440`, `390`
- Contact: `1280`, `1440`, `390`
- Septic cleaning: `1280`, `1440`, `390`
- Well/septic evaluations: `1280`, `1440`, `390`
- Portable toilets: `1280`, `1440`, `390`
- Commercial: `1280`, `1440`, `390`

## Artifact Naming Convention
- `<route-slug>-desktop-1280.png`
- `<route-slug>-desktop-1440.png`
- `<route-slug>-mobile-390.png`
- `composition-audit.json`
- `before-after-matrix.json`

## PR Notes Required
- Intended blank-space strategy at desktop widths.
- Support rail stability notes across top/form/post-form sections.
- Form-shell dominance confirmation.
- Footer separation confirmation.
- Step-action locality confirmation.
