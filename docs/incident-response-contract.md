# Incident Response Contract

## Summary
Minimal post-launch incident response contract for form, delivery, public-facts, auth/admin, and rollback incidents.

## Incident Taxonomy
- Submission intake failure
- Notification delivery failure
- Bad public fact / listing drift
- Auth/admin access failure
- Rollback-needed event

## Response Standards
- Owner-visible response path for every incident class.
- First response in <= 30 minutes during staffed hours.
- Incident notes recorded with correlation ID when available.

## Runbooks
- Forms and delivery: `docs/incident-playbook-forms.md`
- Public facts/listings: `docs/incident-playbook-public-facts.md`
- Maintenance schedule: `docs/maintenance-checklist.md`

## Gate
- `tests/maintenance-gate.spec.ts`
