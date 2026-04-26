# Ops Runbook: Submissions

## Scope
Operational response for submission acceptance/rejection, abuse blocking, notification delivery failure, and admin review access checks.

## Fast Checks
1. Find correlation ID from API response (`x-correlation-id`).
2. Inspect observability stream:
   - `Get-Content data/observability.ndjson | Select-String -Pattern '<correlation-id>'`
3. Confirm submission persistence:
   - Admin workspace `/admin/submissions`
4. Confirm delivery state:
   - Look for `Delivery:` metadata in admin row and `notification.*` events.

## Common Incidents

### Submission rejected
- Check `submission.rejected` details for `reason` (`validation-failed`, `persistence-failed`, suppression action).
- If validation: verify field contract and client payload.
- If persistence: verify sqlite data volume and filesystem permissions.

### Abuse blocked
- Check `abuse.blocked` event and `data/abuse-log.ndjson` for hashed source markers.
- Confirm whether block was honeypot or rate-limit path.

### Notification failure
- Check `notification.failure` for `attempts`, `channel`, and `dedupeKey`.
- Submission is still canonical even if notification failed.
- Continue owner triage from admin workspace and call customer if urgent.

### Admin review access denied
- Check `admin.review_access.denied` and verify token/cookie policy.
- Confirm `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true` and owner/ops token presence.

## Local/Dev vs Hosted
- Local/dev: file sinks (`data/*.ndjson`) + sqlite.
- Hosted future: forward same event contract to managed logging backend.
- Keep contract fields stable to avoid parser drift.
