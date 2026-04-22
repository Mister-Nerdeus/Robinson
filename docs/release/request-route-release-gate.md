# Request-Route Release Gate

## Scope
- `/`
- `/contact`
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/realtors`

## Final Gate Checklist
- [ ] No duplicate nav rendering on request routes.
- [ ] No public runtime/provenance leakage (`mode`, `commit`, `ref`, `build`).
- [ ] Route-specific CTA inventory reviewed for changed lanes.
- [ ] Screenshot proof captured at desktop `1280` and `1440` and mobile `390`.
- [ ] Composition audit JSON passes: `docs/screenshots/issues-163-172/composition-audit.json`.
- [ ] First editable step appears in early scroll band on desktop and mobile.
- [ ] Accessibility semantics pass (`autocomplete`, helper/error `aria-describedby`, live region).
- [ ] Business-truth dashboard reviewed: `docs/business-truth/owner-truth-dashboard.md`.
- [ ] Trust-governance registry reviewed for trust-signal changes: `docs/trust/trust-governance-registry.md`.
- [ ] FAQ/schema alignment verified for touched FAQ-bearing routes.
- [ ] Request-route parity and deploy manifest artifacts generated in CI.

## Proof Artifact Inventory
- `artifacts/deploy-manifest.json`
- `artifacts/request-route-parity.json`
- `docs/screenshots/issues-163-172/*.png`
- `docs/screenshots/issues-163-172/composition-audit.json`
- `docs/screenshots/issues-163-172/before-after-matrix.json`
- `docs/screenshots/issues-185-196/*.png`

## Promotion Rule
Release is blocked if any checklist item or artifact is missing.
