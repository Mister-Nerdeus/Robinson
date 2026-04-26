# Maintenance Checklist

## Summary
Recurring post-launch maintenance tasks with bounded cadence.

## Weekly
- [ ] Truth review against canonical public facts
- [ ] Listing drift review against external footprint matrix
- [ ] Lead/report health review (lane + lifecycle + delivery)

## Monthly
- [ ] Backup artifact verification
- [ ] Restore rehearsal spot-check (or full quarterly rehearsal)
- [ ] Runtime/security header validation

## Quarterly
- [ ] Full backup/restore rehearsal runbook execution
- [ ] Incident playbook tabletop exercise
- [ ] Owner handoff/training refresh

## Schedulable Gate
- Run `npm run test:maintenance-gate`
- Run `npm run verify:v1`
