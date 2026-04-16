# UX Proof Pack (58-64)

## Scope
- request-route geometry parity
- shared request-page composition compliance
- grouped-form density/breakpoint tuning
- septic recognition-first sequencing and modeling contract
- adaptive contact lane behavior
- demo footer polish with operator-only proof chrome

## Verification commands
- `npm run verify:v1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-request-layout-parity.ps1 -TargetHost <host> -OutputPath <json>`
- `npm run proof:ux-pack`

## Route geometry verification mechanism
- `scripts/verify-request-layout-parity.ps1`
- validates:
- `data-request-layout-geometry=top-support-then-full-width-form`
- `data-request-layout-form-width=full-width`
- route marker and contract version marker
- no stale right-rail signatures in rendered output
- no-store cache header presence

## Screenshot inventory
Directory: `docs/screenshots/ux-proof-58-64/`

Required coverage:
- canonical + constrained + tablet for:
- septic, evaluations, rental, commercial, contact routes
- contact lane states:
- neutral lane state
- general lane selected (lighter lane)
- septic lane selected (structured dispatch lane)
- septic problem sequencing capture showing checklist before freeform details
- footer states:
- shared demo footer with operator proof hidden by default
- operator cookie footer showing proof chrome explicitly

Key artifacts captured:
- `canonical-septic-route.png`
- `canonical-contact-route.png`
- `constrained-septic-route.png`
- `constrained-contact-route.png`
- `canonical-contact-neutral.png`
- `canonical-contact-general-lane.png`
- `canonical-contact-septic-lane.png`
- `canonical-contact-footer-no-operator-proof.png`
- `canonical-contact-footer-operator-proof.png`
- `canonical-septic-problem-sequencing.png`

Route parity artifact:
- `docs/verification/local-request-geometry-full-2026-04-16T20-09-02Z.json`

## Contact adaptivity notes
- General lane remains the lightest lane:
- lighter lane framing in router
- scheduling section removed from general form lane
- `urgency=normal` supplied as hidden default for schema alignment
- Optional location fields only render for `serviceLocationInvolved=yes|unsure`

## Septic sequencing and contract notes
- Problem Details section uses `fieldOrder: checks-first`.
- `tankCount` is guided (`1`, `2`, `3-plus`, `unknown`) in UI/schema/types/storage/notification summary.
- Unknown/unsure options remain explicit for knowledge-bound septic fields.

## Shared-demo polish and operator proof
- Footer proof chrome no longer appears by default in demo.
- Proof chrome only appears when explicit operator cookie is present (`review_access` bootstrap flow).
- Operator access path remains the same:
- `/admin/submissions?review_access=<REVIEW_ACCESS_KEY>` sets secure review cookie.
