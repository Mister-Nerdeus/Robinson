# Request Route Screenshot Proof Standard

## Applies To
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/contact`
- `/realtors`

## Required Artifacts
- Desktop full-page screenshots at `1280` and `1440` for each route.
- Mobile full-page screenshots at `390` for each route.
- Composition audit JSON:
  - `docs/screenshots/issues-163-172/composition-audit.json`
- Before and after pairs for any touched request route.
- Behavior proof snapshot requirements:
  - no duplicated request-route nav
  - no public provenance/runtime text
  - first editable form control appears in early scroll band

## Baseline Inventory Path
- `docs/screenshots/issues-163-172`

## Route And Width Matrix
- Desktop: `1280`, `1440`
- Mobile: `390`
- Routes: `/services/septic-cleaning`, `/services/well-septic-evaluations`, `/services/portable-toilets`, `/services/commercial`, `/contact`, `/realtors`

## Artifact Naming Convention
- `<route-slug>-desktop-1280.png`
- `<route-slug>-desktop-1440.png`
- `<route-slug>-mobile-390.png`
- `composition-audit.json`

## Review Notes Required In PR
- Intended blank-space strategy at desktop widths.
- Support rail stability notes across top/form/post-form sections.
- Form-shell dominance confirmation.
- Footer separation confirmation.
- Step-action locality confirmation.
