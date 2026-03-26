# Submission Delivery Flow

## Flow
1. Form submission reaches `/api/submissions`.
2. Anti-spam + rate-limit checks run first.
3. Payload is validated by shared Zod schema.
4. Submission is persisted to local storage (`data/submissions.json`).
5. Notification delivery is attempted (`smtp`, `ethereal`, or `log` mode).
6. Notification result is written to `data/notification-log.ndjson`.

## Failure Safety
- Persistence occurs before notification delivery.
- If delivery fails, submission record remains in local storage.
- API response includes delivery status for operational visibility.

## Type-Specific Payload Handling
- `general-contact`
- `septic-service`
- `well-septic-evaluation`
- `portable-toilet-rental`

Each retains `type` through persistence and notification subject/body formatting.
