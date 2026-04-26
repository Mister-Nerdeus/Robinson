# Production Cutover Checklist

## Owner Verification
- [ ] Owner confirms canonical phone/email/contact facts.
- [ ] Owner confirms canonical public address truth.
- [ ] Owner approves privacy and terms surfaces.

## Technical Gates
- [ ] Submission persistence path proven (`tests/submission-persistence-contract.spec.ts`).
- [ ] Notification delivery path proven (`tests/notification-delivery-state.spec.ts`, `tests/observability-contract.spec.ts`).
- [ ] Admin auth and review controls proven (`tests/admin-auth-contract.spec.ts`, `tests/data-retention-auth.spec.ts`).
- [ ] Public facts consistency gate passes.

## Operational Gates
- [ ] Observability contract and runbook present.
- [ ] Territory routing contract present and test pass.
- [ ] Retention/export/suppression contract and runbook present.
- [ ] Form UX/accessibility checklist and screenshot set present.

## Go / No-Go
Go only when every box above is complete and owner signoff is recorded.
No-Go if any owner verification or technical gate remains open.
