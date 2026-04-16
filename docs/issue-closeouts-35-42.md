# Issue Closeouts 35-42

## 35 Review-surface protection
- Added middleware + runtime secret access control for `/admin/submissions` and `GET /api/submissions`.
- Main hard-blocks admin review surfaces.
- Develop requires explicit review access cookie bootstrap via `review_access` secret.

## 36 Runtime host identity proof
- Added `/api/runtime-proof`.
- Updated verification scripts to assert host -> branch/mode/indexing/provenance identity.

## 37 Contact form truth alignment
- Aligned schema + UI required `address` field.
- Contact intake router now starts neutral (no default lane preselected).

## 38 Follow-up UX
- Added concise "What happens next" and response-expectation blocks across contact + key service lanes.

## 39 Public trust voice
- Rewrote trust-facing homepage text to customer language.
- Preserved governance authority in claim registry/proof mapping docs.

## 40 Notification delivery proof path
- Develop template moved to SMTP proof configuration.
- Added develop safe-inbox guard for SMTP delivery.

## 41 Workspace lifecycle
- Added lifecycle state + internal notes to submission model.
- Added triage update forms and status filtering in admin workspace.

## 42 Canonical proof pack
- Added v4 proof pack + closeout index + screenshot inventory references.

## References
- `docs/v4-proof-pack.md`
- `docs/main-develop-deploy-proof-pack.md`
- `docs/review-surface-access-contract.md`
- `docs/runtime-host-proof-contract.md`