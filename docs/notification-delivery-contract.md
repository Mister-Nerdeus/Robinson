# Notification Delivery Contract

## Purpose
Guarantee bounded, idempotent notification delivery behavior while preserving submission persistence as canonical.

## Delivery State Model
State machine for internal notification delivery:
- `pending`
- `retrying`
- `sent`
- `failed`
- `abandoned`

Persisted in sqlite table `notification_delivery` keyed by `(submission_id, dedupe_key)`.

## Retry Policy
- Config key: `NOTIFICATION_MAX_ATTEMPTS` (default `3`).
- Delivery attempts stop at the configured bound.
- Terminal failure state at bound: `abandoned`.

## Dedupe/Idempotency
- Dedupe key for internal sends: `submission:<submissionId>:internal-v1`.
- If dedupe record is already `sent`, later sends return prior success with `deduped=true` and do not call provider.
- If dedupe record is already `abandoned`, later sends return prior terminal failure.

## Persistence Separation
- Submission record remains canonical in `submissions` table.
- Notification delivery state is persisted separately in `notification_delivery`.
- Admin review reads delivery snapshot (state/attempts/dedupe) without mutating submission lifecycle.

## Observability Hooks
- `notification.success` emitted on successful send.
- `notification.failure` emitted on terminal send failure.

## Admin Visibility
Each submission row shows:
- Delivery state
- Attempt count
- Dedupe key
