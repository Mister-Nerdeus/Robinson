# Observability Contract

## Purpose
Define the production-style observability contract for submissions, abuse controls, notification delivery, and admin review access while preserving local/dev operability.

## Event Taxonomy
- `submission.accepted`
- `submission.rejected`
- `abuse.blocked`
- `notification.success`
- `notification.failure`
- `admin.review_access.allowed`
- `admin.review_access.denied`
- `submission.triage_updated`

## Required Envelope
Every event written to `data/observability.ndjson` includes:
- `eventType`
- `level`
- `timestamp`
- `correlationId`
- `requestPath`
- Optional: `submissionId`, `lane`, `status`, `details`

## Correlation ID Contract
- API accepts `x-correlation-id` when provided.
- If missing, server generates a UUID.
- Correlation ID is persisted on submission records and echoed in API responses.

Example lifecycle correlation:
1. `submission.accepted` (`correlationId=abc-123`)
2. `notification.failure` (`correlationId=abc-123`)
3. `submission.triage_updated` (`correlationId=abc-123`)

## Redaction/Minimization Rules
`details` payload is automatically redacted/hash-minimized for keys containing:
- `email`
- `phone`
- `message`
- `note`
- `address`

## Sample Structured Events
```json
{"eventType":"submission.accepted","level":"info","correlationId":"abc-123","requestPath":"/api/forms","submissionId":"sub-1","lane":"septic-service","status":201}
```

```json
{"eventType":"notification.failure","level":"error","correlationId":"abc-123","requestPath":"/api/forms","submissionId":"sub-1","lane":"septic-service","status":502,"details":{"channel":"smtp","attempts":2,"dedupeKey":"submission:sub-1:internal-v1"}}
```

## Sink Contract
- Local/dev default sink: NDJSON file (`data/observability.ndjson`) + console mirror.
- Future hosted sink: same JSON envelope may be forwarded to managed log/metrics backends without schema changes.
- Contract must remain provider-agnostic.
