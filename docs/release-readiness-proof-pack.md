# Release Readiness Proof Pack

## Scope
Final proof references required before production go-live recommendation.

## Proof Index
- Persistence proof:
  - `tests/submission-persistence-contract.spec.ts`
  - `tests/sqlite-persistence-contract.spec.ts`
- Notification and sending-domain proof:
  - `tests/notification-delivery-state.spec.ts`
  - `tests/email-domain-readiness.spec.ts`
  - `tests/observability-contract.spec.ts`
- Inbound mailbox operations proof:
  - `docs/inbound-mail-ops-contract.md`
  - `docs/m365-mailbox-decision-record.md`
- Abuse-hardening proof:
  - `tests/anti-spam-contract.spec.ts`
  - `docs/anti-spam-contract.md`
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
- Cutover and rollback proof:
  - `docs/production-cutover-checklist.md`
  - `docs/rollback-runbook.md`

## Recommendation Record
- Current recommendation: **No-Go until full `npm run verify:v1` passes in target release branch, owner approval checklists are signed, and rollback rehearsal is complete.**
- Update this section to `Go` only after all checklist gates are complete.
