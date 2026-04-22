# Request-Route Release Gate

## Scope
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/contact`
- `/realtors`

## Proof Checklist
- [ ] No duplicate nav rendering on request routes.
- [ ] No public runtime/provenance leakage (`mode`, `commit`, `ref`, `build`).
- [ ] Screenshot proof captured at desktop `1280` and `1440` and mobile `390`.
- [ ] Composition audit JSON passes: `docs/screenshots/issues-163-172/composition-audit.json`.
- [ ] First editable step appears in early scroll band on desktop and mobile.
- [ ] Accessibility semantics pass (`autocomplete`, helper/error `aria-describedby`, live region).
- [ ] Business-truth lane content still present (`reasonsToCall`, `whatToHaveReady`, `nextSteps`).
- [ ] Request-route parity and deploy manifest artifacts generated in CI.

## Artifact Inventory
- `artifacts/deploy-manifest.json`
- `artifacts/request-route-parity.json`
- `docs/screenshots/issues-163-172/*.png`
- `docs/screenshots/issues-163-172/composition-audit.json`

## Promotion Rule
Release is blocked if any checklist item or artifact is missing.
