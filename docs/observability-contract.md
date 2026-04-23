# Observability Contract

## Event Taxonomy
- `submission.validation_failed`
- `submission.abuse_blocked`
- `submission.persistence_failed`
- `submission.notification_failed`
- `submission.created`
- `submission.triage_updated`

## Required Fields
Each event includes:
- `eventType`
- `level`
- `timestamp`
- `correlationId`
- `requestPath`
- optional `submissionId`, `lane`, `status`, `details`

## Correlation
`x-correlation-id` is honored when present; otherwise a UUID is generated.

## Redaction
The logger redacts/hash-minimizes fields containing:
- `email`
- `phone`
- `message`
- `note`
- `address`

## Local Sink
Events are written to `data/observability.ndjson` and mirrored to console.
