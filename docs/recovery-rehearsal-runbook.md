# Recovery Rehearsal Runbook

## Summary
Operator rehearsal for restoring submissions and canonical config from backup.

## Preconditions
- Access to latest backup artifact set
- Access to repository and operator environment
- Maintenance window approved

## Steps
1. Capture current baseline state:
- export filtered submissions
- record current commit SHA
2. Create backup snapshot:
- copy `data/submissions.sqlite`
- copy canonical config files (`src/config/company.ts`, `src/content/businessFacts.ts`)
3. Introduce controlled drift (rehearsal only):
- update lifecycle state of a test submission
4. Restore from backup snapshot:
- restore SQLite backup artifact
- restore canonical config snapshot
5. Validate recovery:
- test submission returns to expected lifecycle/content
- canonical config values match snapshot
- app starts and passes `npm run test:backup-restore-gate`

## Validation Proof
- Record timestamp of backup and restore
- Record submission ID used for rehearsal
- Record before/after lifecycle values
- Attach gate output in closeout artifact

## Sample Restore Validation Proof
- Recovery gate test (`tests/backup-restore-gate.spec.ts`) restores a triage mutation to pre-drift state and validates canonical config snapshot keys.
