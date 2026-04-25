# Resend Setup Runbook

## Goal
Run internal submission notifications through Resend without changing submission persistence or contract behavior.

## Required Env
- `NOTIFICATION_MODE=resend`
- `RESEND_API_KEY=<resend_api_key>`
- `NOTIFICATION_FROM_EMAIL=<verified-sender@your-domain>`
- `NOTIFICATION_INTERNAL_TO_EMAIL=<internal-recipient>`

Optional:
- `RESEND_FROM_EMAIL=<override-from@verified-domain>`
- `NOTIFICATION_FROM_NAME=Robinson Septic Intake`
- `NOTIFICATION_REPLY_TO_EMAIL=<service-mailbox>`
- `NOTIFICATION_LANE_TO_EMAIL_MAP=general:...;septic-service:...`

## Setup Steps
1. Verify sending domain and sender identity in Resend.
2. Set `RESEND_API_KEY`.
3. Set `NOTIFICATION_MODE=resend`.
4. Keep persistence contract unchanged: submissions persist first, delivery second.
5. Run `npm run test:resend-provider`.

## Sample Success Result
```json
{
  "ok": true,
  "channel": "resend",
  "messageId": "re_12345"
}
```

## Sample Failure Result (Persistence Intact)
```json
{
  "ok": false,
  "channel": "resend",
  "error": "simulated resend failure"
}
```

Submission record remains in SQLite even when delivery fails.
