# Data Retention Contract

## Scope
Govern submission retention, authenticated export, and authenticated suppression/deletion behavior for submission PII.

## Retention Policy
- Category: `service-intake`
- Default retention window: `SUBMISSION_RETENTION_DAYS` (default `365` days)
- Each submission stores:
  - `retention.retentionDays`
  - `retention.retainUntil`
  - `retention.dataState` (`active` or `suppressed`)

## Export Policy
- Endpoint: `GET /api/submissions?export=csv|json`
- Authentication required: owner/ops token or session cookie.
- Anonymous requests return `401 admin-auth-required`.

## Suppression/Deletion Policy
- Endpoint: `DELETE /api/submissions` with JSON body `{ id }`
- Authentication required.
- Operation is implemented as authenticated suppression (PII redaction) while preserving operational audit record.
- Suppressed fields include name/phone/email/address/message.

## Privacy Alignment
- Public privacy surface: `src/app/privacy/page.tsx`
- Terms surface: `src/app/terms/page.tsx`
- This contract keeps lane model unchanged and preserves canonical submission persistence.
