# Incident Playbook Forms

## Scope
Submission intake and notification delivery failures.

## First Response
1. Confirm current runtime mode and environment health.
2. Check `/api/submissions` and delivery state snapshots.
3. Reproduce with controlled test submission.
4. Identify failure class: intake parsing, persistence, or provider delivery.

## Containment
- If intake is broken, switch office to phone-first fallback intake.
- If notifications fail, triage submissions directly in admin workspace.

## Resolution
- Patch/config fix and verify with submission contract tests.
- Confirm new submissions move through persistence + delivery states.

## Escalation
- Escalate to owner if outages exceed 30 minutes.
- Trigger rollback runbook if regression cannot be corrected safely.
