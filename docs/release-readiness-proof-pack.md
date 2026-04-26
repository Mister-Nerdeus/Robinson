# Release Readiness Proof Pack

## Scope
Final proof references required before production go-live recommendation for the real stack on `robinsonseptic.net`:
GoDaddy registrar + Cloudflare authoritative DNS + Railway hosting + Microsoft 365 mailbox workflow.

## Proof Index
- Domain canonicality and topology proof:
  - `tests/net-domain-canonicality.spec.ts`
  - `tests/canonical-host-topology.spec.ts`
  - `docs/railway-domain-topology-contract.md`
  - `docs/public-vs-develop-surface-contract.md`
- DNS authority and cutover proof:
  - `docs/cloudflare-go-live-contract.md`
  - `docs/dns-inventory-precutover.md`
  - `docs/nameserver-cutover-runbook.md`
  - `tests/cloudflare-cutover-contract.spec.ts`
- DNS matrix and deliverability proof:
  - `docs/dns-record-matrix-net.md`
  - `docs/dns-collision-guard.md`
  - `tests/dns-record-matrix-contract.spec.ts`
  - `tests/email-domain-readiness.spec.ts`
  - `tests/notification-delivery-state.spec.ts`
  - `tests/observability-contract.spec.ts`
- Mailbox and staff workflow proof:
  - `docs/mailbox-contract.md`
  - `docs/inbound-mail-ops-contract.md`
  - `docs/m365-mailbox-decision-record.md`
  - `docs/m365-provisioning-checklist-net.md`
  - `tests/m365-net-mailbox-contract.spec.ts`
- Persistence proof:
  - `tests/submission-persistence-contract.spec.ts`
  - `tests/sqlite-persistence-contract.spec.ts`
- Trust and claim governance proof:
  - `tests/claim-registry-guard.spec.ts`
  - `docs/claim-registry.md`
- Public facts and hours proof:
  - `tests/public-facts-consistency.spec.ts`
  - `tests/public-hours-truth.spec.ts`
  - `docs/public-hours-emergency-contract.md`
- Admin auth and review proof:
  - `tests/admin-auth-contract.spec.ts`
  - `tests/data-retention-auth.spec.ts`
- Legal surfaces proof:
  - `src/app/privacy/page.tsx`
  - `src/app/terms/page.tsx`
- Runtime security proof:
  - `docs/runtime-security-contract.md`
  - `tests/public-mode-hardening.spec.ts`
- Cutover and rollback proof:
  - `docs/production-cutover-checklist.md`
  - `docs/net-cutover-rehearsal.md`
  - `docs/rollback-runbook.md`
  - `tests/net-cutover-rehearsal-gate.spec.ts`

## Recommendation Record
- Current recommendation: **No-Go until full `npm run verify:v1` passes in target release branch, owner approval checklists are signed, and rollback rehearsal is complete.**
- Update this section to `Go` only after all checklist gates are complete.

## Final Go/No-Go Statement Template
- Decision date:
- Decision owner:
- Recommendation: `Go` or `No-Go`
- Blocking items (if any):
- Linked evidence bundle path:
