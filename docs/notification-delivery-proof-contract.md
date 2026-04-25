# Notification Delivery Proof Contract

## Goal
Develop must prove real notification delivery safely, without spamming customer inboxes.

## Rules
- `main` and `develop` must keep separate notification env values.
- `develop` uses controlled routing for either `resend` or `smtp`.
- Demo outbound delivery is blocked unless recipients match `NOTIFICATION_DEVELOP_SAFE_INBOX_PATTERN`.
- Subject prefixes should identify environment (`[DEVELOP PROOF]`, `[MAIN]`).
- Mailbox semantics must stay provider-neutral (sender identity, reply-to, lane routing).

## Env keys
- `NOTIFICATION_MODE`
- `NOTIFICATION_INTERNAL_TO_EMAIL` (`NOTIFICATION_TO_EMAIL` supported as fallback)
- `NOTIFICATION_LANE_TO_EMAIL_MAP`
- `NOTIFICATION_TO_EMAIL`
- `NOTIFICATION_FROM_EMAIL`
- `NOTIFICATION_FROM_NAME`
- `NOTIFICATION_REPLY_TO_EMAIL`
- `NOTIFICATION_SUBJECT_PREFIX`
- `NOTIFICATION_DEVELOP_SAFE_INBOX_PATTERN`
- `SMTP_*`
- `RESEND_*`

## Verification
1. Submit a develop intake form.
2. Confirm delivery in controlled inbox.
3. Confirm message subject includes develop proof prefix.
4. Archive proof screenshot/log in proof pack.
