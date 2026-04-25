# Submission Delivery Flow

## Flow
1. Form submission reaches `/api/submissions`.
2. Anti-spam + rate-limit checks run first.
3. Payload is validated by shared Zod schema.
4. Submission is persisted to canonical SQLite storage (`SUBMISSIONS_DB_PATH`, default `data/submissions.sqlite`).
5. Notification delivery is attempted (`resend`, `smtp`, `ethereal`, or `log` mode).
6. Mailbox contract resolves sender identity, reply-to target, and lane recipient routing.
7. Notification result is written to `data/notification-log.ndjson`.

## Failure Safety
- Persistence occurs before notification delivery.
- If delivery fails, submission record remains in canonical SQLite storage.
- API response includes delivery status for operational visibility.

## Type-Specific Payload Handling
- `general`
- `septic-service`
- `evaluation`
- `rental`
- `commercial-service`

Each retains `type` through persistence and notification subject/body formatting.

## Canonical Mailbox Semantics
- Sender identity is explicit: `NOTIFICATION_FROM_NAME` + `NOTIFICATION_FROM_EMAIL`.
- Reply target is explicit and optional: `NOTIFICATION_REPLY_TO_EMAIL`.
- Internal recipient routing is lane-aware: `NOTIFICATION_LANE_TO_EMAIL_MAP` with `NOTIFICATION_INTERNAL_TO_EMAIL` fallback.
