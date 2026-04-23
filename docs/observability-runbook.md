# Observability Runbook

## Files
- Event log: `data/observability.ndjson`
- Submission db: `data/submissions.sqlite`

## Quick Queries (PowerShell)
- Recent failures:
`Get-Content data/observability.ndjson | Select-String -Pattern '"level":"error"'`
- Abuse blocks:
`Get-Content data/observability.ndjson | Select-String -Pattern 'submission.abuse_blocked'`
- Correlation lookup:
`Get-Content data/observability.ndjson | Select-String -Pattern '<correlation-id>'`

## Failure Triage
1. Find correlation id from API response header/body.
2. Trace all events by that correlation id.
3. Confirm whether failure happened at validation, abuse, persistence, or notification stage.
4. If notification failed but submission persisted, use admin workspace to continue lifecycle handling.
