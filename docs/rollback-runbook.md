# Rollback Runbook

## Purpose
Define reversible steps if cutover validation fails after production-like rehearsal.

## Trigger Conditions
- Notification domain or DNS verification fails.
- Inbound mailbox workflow fails owner/staff requirements.
- Form intake or persistence regression blocks normal operations.
- Public facts/hours/emergency wording conflicts are discovered.

## Rollback Scope
1. Domain/mail rollback
- Revert sending-domain env values to previous known-good configuration.
- Disable provider mode (`NOTIFICATION_MODE=log` or approved fallback) until DNS state is corrected.
- Revert reply target to previous owner-approved mailbox if needed.

2. Config rollback
- Revert `.env.main` to previous release snapshot.
- Redeploy prior release image/commit.

3. Public surface rollback
- Restore prior approved public facts copy if regression introduced.
- Re-run public facts and hours consistency tests.

## Execution Checklist
- [ ] Capture incident timestamp and trigger reason.
- [ ] Apply env/config rollback.
- [ ] Redeploy previous stable build.
- [ ] Verify form submit + persistence + admin access.
- [ ] Verify notification behavior in safe mode.
- [ ] Confirm owner signoff on restored state.

## Evidence to Record
- Rollback reason and incident ID.
- Previous and current commit references.
- Env diff (redacted secrets).
- Post-rollback gate output (`npm run verify:v1` or scoped emergency gate set).
