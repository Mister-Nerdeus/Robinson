# Production Cutover Checklist

## Owner Verification
- [ ] Owner confirms canonical phone/address/hours/emergency facts.
- [ ] Owner confirms outbound sending-domain policy and verified DNS proof.
- [ ] Owner approves inbound mailbox model and reply workflow.
- [ ] Owner approves anti-spam posture and trusted override policy.

## Technical Gates
- [ ] Submission persistence path proven (`tests/submission-persistence-contract.spec.ts`).
- [ ] Notification delivery path proven (`tests/notification-delivery-state.spec.ts`, `tests/observability-contract.spec.ts`).
- [ ] Sending-domain readiness proven (`tests/email-domain-readiness.spec.ts`).
- [ ] Anti-spam gate proven (`tests/anti-spam-contract.spec.ts`).
- [ ] Claim governance gate proven (`tests/claim-registry-guard.spec.ts`).
- [ ] Public facts/hours consistency proven (`tests/public-facts-consistency.spec.ts`, `tests/public-hours-truth.spec.ts`).
- [ ] Admin auth/review controls proven (`tests/admin-auth-contract.spec.ts`, `tests/data-retention-auth.spec.ts`).

## Dry-Run Rehearsal
- [ ] Public fact verification complete.
- [ ] Form submit path exercised.
- [ ] Notification delivery observed.
- [ ] Admin auth and review access verified.
- [ ] Lifecycle update and export completed.
- [ ] Rollback rehearsal completed (`docs/rollback-runbook.md`).

## Artifact Requirements
- [ ] Dry-run evidence bundle attached.
- [ ] Rollback runbook completed and dated.
- [ ] Release readiness proof pack updated with explicit recommendation.

## Go / No-Go
Go only when every box above is complete and owner signoff is recorded.
No-Go if any owner verification, notification readiness, or rollback gate remains open.
