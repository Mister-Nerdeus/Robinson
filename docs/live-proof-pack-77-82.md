# Live Proof Pack 77-82

## Scope
- Route parity: homepage, contact, septic
- Request-heavy layout contract compliance
- Grouped-form density and lane adaptivity
- Septic sequencing and guided tank-count modeling
- Shared-demo footer polish vs operator-only proof chrome

## Render-parity audit note
- Source contract for request-heavy routes is defined by `RequestPageLayout` markers:
- `data-request-layout-geometry="top-support-then-full-width-form"`
- `data-request-layout-form-width="full-width"`
- Current observed drift source was stale host deployment state vs latest develop source.
- Runtime proof on `robinson-demo` still reports older commit `b85ed3a47b6f`, while develop HEAD includes the newer request-layout and footer/adaptivity changes.

## Root-cause summary
- Mismatch class: deployment parity drift (host serving older build artifact), not source regression.
- Main host is intentionally pinned to `main`, and develop updates must be deployed explicitly.
- Fix path in this batch:
- added strict live-render parity checks for homepage/contact/septic
- upgraded test Docker lane to deterministic test-only compose stack
- regenerated rendered artifacts from updated test deployment (`http://localhost:3001`)

## Verification commands
- `powershell -ExecutionPolicy Bypass -File scripts/test-stack-up.ps1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-live-render-parity.ps1 -TargetHost http://localhost:3001 -OutputPath docs/verification/live-parity-after-test-2026-04-16.json`
- `node scripts/capture-live-proof-77-82.mjs`
- optional drift capture (non-strict):
- `powershell -ExecutionPolicy Bypass -File scripts/verify-live-render-parity.ps1 -TargetHost https://robinson-demo.hearthcore.app -Strict:$false -OutputPath docs/verification/live-parity-before-demo-2026-04-16.json`

## Screenshot inventory
Directories:
- `docs/screenshots/live-proof-77-82/before-demo/`
- `docs/screenshots/live-proof-77-82/after-test/`

Required artifacts (after-test):
- `canonical-home.png`
- `canonical-contact.png`
- `canonical-septic.png`
- `constrained-contact-general-lane.png`
- `constrained-contact-septic-lane.png`
- `canonical-footer-shared-demo.png`
- `canonical-footer-operator-context.png`

Before/after parity comparison artifacts:
- `before-demo/canonical-home.png` vs `after-test/canonical-home.png`
- `before-demo/canonical-contact.png` vs `after-test/canonical-contact.png`
- `before-demo/canonical-septic.png` vs `after-test/canonical-septic.png`

## Route verification outputs
- `docs/verification/live-parity-before-demo-2026-04-16.json` (drift capture, non-strict)
- `docs/verification/live-parity-after-test-2026-04-16.json` (strict pass)

## Compliance summary
- Request-heavy routes are contract-checked in source and render output.
- Forms remain grouped with delayed density (`2xl`) and lane-specific adaptivity.
- Septic sequencing remains recognition-first with guided tank-count values.
- Footer proof chrome remains operator-gated via explicit review cookie context.

Related audit matrix:
- `docs/request-route-compliance-77-82.md`
