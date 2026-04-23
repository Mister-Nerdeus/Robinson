# Final Service-Route Release Gate

## Purpose
Single promotion gate for service-route releases combining UX, truth, trust, and public-hygiene proof.

## Blocking Criteria
- No duplicate nav on task routes.
- No public provenance leakage.
- Lane-specific CTA correctness.
- Business-truth dashboard reviewed with unresolved-fact status.
- Trust-signal governance reviewed for keep/update/remove decisions.
- Screenshot proof bundle complete (desktop + mobile per required route).
- FAQ/schema alignment validated where route copy or FAQ content changed.

## Required Proof Bundle
- Deploy traceability artifacts (`deploy-manifest`, `request-route-parity`).
- Screenshot matrix (`1280`, `1440`, `390`) for changed routes.
- Composition audit JSON and before/after matrix.
- Lane CTA inventory diff.
- Business-truth status table reference.
- Trust-governance registry reference.
- Completed bundle example: `docs/release/example-proof-bundle-197-208.md`.

## Workflow Note
This checklist is referenced by PR template and CI public-gates workflow. Promotion cannot proceed until all blocking criteria are complete.
