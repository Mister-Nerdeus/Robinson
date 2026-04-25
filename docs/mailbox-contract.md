# Mailbox Contract

## Purpose
Freeze provider-neutral mail semantics so delivery can use either Resend or SMTP without changing app-level behavior.

## Canonical Contract
| Field | Env var(s) | Required | Notes |
| --- | --- | --- | --- |
| Internal default recipient | `NOTIFICATION_INTERNAL_TO_EMAIL` (fallback `NOTIFICATION_TO_EMAIL`) | Yes | Catch-all recipient for lanes without explicit routing entry. |
| Lane recipient mapping | `NOTIFICATION_LANE_TO_EMAIL_MAP` | Optional | Format: `lane:email;lane:email`. Supported lanes: `general`, `septic-service`, `evaluation`, `rental`, `commercial-service`. |
| Sender address | `NOTIFICATION_FROM_EMAIL` | Yes | Provider-neutral sender identity. |
| Sender display name | `NOTIFICATION_FROM_NAME` | Optional | Rendered as `Display Name <from@email>`. |
| Reply target | `NOTIFICATION_REPLY_TO_EMAIL` | Optional | Can differ from sender identity. |

## Routing Model
- Resolve recipient by lane map first.
- If lane entry is missing, use `NOTIFICATION_INTERNAL_TO_EMAIL` fallback.
- Every lane must resolve to a non-empty recipient rule.

## Provider-Neutral Semantics
- `sendSubmissionNotification` receives canonical submission record, not provider-specific payloads.
- Provider branch only maps delivery transport (`resend`, `smtp`, `ethereal`, `log`).
- Delivery result contract remains: `ok`, `channel`, optional `messageId`, optional `error`.

## Owner-Verification Checklist
- Confirm canonical service-request inbox used for `NOTIFICATION_INTERNAL_TO_EMAIL`.
- Confirm whether `NOTIFICATION_REPLY_TO_EMAIL` should point to shared mailbox vs alias.
- Confirm final mailbox ownership model (shared mailbox vs user mailbox alias).
