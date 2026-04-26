# Backup Restore Contract

## Summary
Defines backup and restore policy for submissions and critical canonical config/state.

## Backup Scope
- Submissions records (`data/submissions.sqlite`)
- Notification/delivery state in SQLite
- Canonical public-facts config (`src/config/company.ts`, `src/content/businessFacts.ts`)
- Runtime/environment templates (`.env*.example`, deployment env manifests)

## Backup Policy
- Frequency: daily automatic backup + pre-release/manual snapshot
- Retention: 30 daily snapshots + 12 monthly snapshots
- Storage: encrypted operator-controlled storage location
- Access: owner/ops only
- PII handling: backup artifacts are restricted and never attached to public proof packs

## Restore Policy
- Restore target must recover submissions and delivery state to a valid readable DB.
- Canonical config files must match committed contract versions.
- Restore completion requires validation checks and signoff.

## Rehearsal Requirement
- Run quarterly restore rehearsal using `docs/recovery-rehearsal-runbook.md`.
- Gate evidence recorded by `tests/backup-restore-gate.spec.ts`.
