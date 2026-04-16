# Notification Delivery Proof Contract

## Goal
Develop must prove real notification delivery safely, without spamming customer inboxes.

## Rules
- `main` and `develop` must keep separate notification env values.
- `develop` uses SMTP to a controlled proof inbox.
- Demo SMTP delivery is blocked unless `NOTIFICATION_TO_EMAIL` matches `NOTIFICATION_DEVELOP_SAFE_INBOX_PATTERN`.
- Subject prefixes should identify environment (`[DEVELOP PROOF]`, `[MAIN]`).

## Env keys
- `NOTIFICATION_MODE`
- `NOTIFICATION_TO_EMAIL`
- `NOTIFICATION_FROM_EMAIL`
- `NOTIFICATION_SUBJECT_PREFIX`
- `NOTIFICATION_DEVELOP_SAFE_INBOX_PATTERN`
- `SMTP_*`

## Verification
1. Submit a develop intake form.
2. Confirm delivery in controlled inbox.
3. Confirm message subject includes develop proof prefix.
4. Archive proof screenshot/log in proof pack.