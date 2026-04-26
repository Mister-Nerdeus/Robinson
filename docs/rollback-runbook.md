# Rollback Runbook

## Purpose
Define reversible steps if cutover validation fails after production rehearsal for `robinsonseptic.net`.

## Trigger Conditions
- Cloudflare authoritative DNS activation fails or nameserver propagation is incomplete.
- Railway custom-domain validation/HTTPS fails.
- Microsoft 365 DNS/mailbox workflow fails owner or staff requirements.
- Notification domain or DNS verification fails.
- Form intake or persistence regression blocks normal operations.

## Rollback Scope
1. DNS authority rollback
- Revert GoDaddy nameservers to pre-cutover values captured in `docs/dns-inventory-precutover.md`.
- If DNSSEC was changed, restore previous DNSSEC state and document exact timestamp.
- Verify authoritative nameserver reversion from multiple public resolvers.

2. Domain/mail rollback
- Revert sending-domain env values to previous known-good configuration.
- Disable provider mode (`NOTIFICATION_MODE=log` or approved fallback) until DNS state is corrected.
- Revert reply target to previous owner-approved mailbox if needed.

3. Config rollback
- Revert `.env.main` to previous release snapshot.
- Redeploy prior release image/commit.

4. Public surface rollback
- Restore prior approved public facts copy if regression introduced.
- Re-run public facts and hours consistency tests.

## Execution Checklist
- [ ] Capture incident timestamp and trigger reason.
- [ ] Apply DNS authority rollback if nameserver cutover is implicated.
- [ ] Apply env/config rollback.
- [ ] Redeploy previous stable build.
- [ ] Verify form submit + persistence + admin access.
- [ ] Verify notification behavior in safe mode.
- [ ] Verify mailbox reply handling path.
- [ ] Confirm owner signoff on restored state.

## Evidence to Record
- Rollback reason and incident ID.
- Previous and current commit references.
- Previous and current nameserver values.
- DNSSEC state before/after.
- Env diff (redacted secrets).
- Post-rollback gate output (`npm run verify:v1` or scoped emergency gate set).
