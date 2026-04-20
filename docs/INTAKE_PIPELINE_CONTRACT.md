# INTAKE_PIPELINE_CONTRACT

## Shared Pipeline
1. Client forms submit to `/api/forms`.
2. API enforces abuse controls via `enforceAbuseProtection`.
3. Server-side validation uses `submissionSchema`.
4. Valid records persist via `saveSubmission` in `src/lib/storage/submissions.ts`.
5. Internal notification and customer acknowledgement flow through `src/lib/email/provider.ts`.

## Abuse Controls
- Honeypot
- Rate-limit
- Block-pattern and malformed payload checks
- Abuse event logging

## Logging Policy
- Do not log raw sensitive payloads beyond required dispatch fields.
- Store auditable records in submission storage only.
