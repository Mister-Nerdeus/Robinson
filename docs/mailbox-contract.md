# Mailbox Contract

## Purpose
Freeze provider-neutral mail semantics and inbound operating assumptions so outbound and reply behavior stay consistent regardless of provider.

## Canonical Outbound Contract
| Field | Env var(s) | Required | Notes |
| --- | --- | --- | --- |
| Internal default recipient | `NOTIFICATION_INTERNAL_TO_EMAIL` (fallback `NOTIFICATION_TO_EMAIL`) | Yes | Catch-all recipient for lanes without explicit routing entry. |
| Lane recipient mapping | `NOTIFICATION_LANE_TO_EMAIL_MAP` | Optional | Format: `lane:email;lane:email`. Supported lanes: `general`, `septic-service`, `evaluation`, `rental`, `commercial-service`. |
| Sender address | `NOTIFICATION_FROM_EMAIL` | Yes | Provider-neutral sender identity. |
| Sender display name | `NOTIFICATION_FROM_NAME` | Optional | Rendered as `Display Name <from@email>`. |
| Reply target | `NOTIFICATION_REPLY_TO_EMAIL` | Yes for production | Reply mailbox target must follow inbound mailbox model contract. |

## Routing Model
- Resolve recipient by lane map first.
- If lane entry is missing, use `NOTIFICATION_INTERNAL_TO_EMAIL` fallback.
- Every lane must resolve to a non-empty recipient rule.

## Provider-Neutral Semantics
- `sendSubmissionNotification` receives canonical submission record, not provider-specific payloads.
- Provider branch only maps delivery transport (`resend`, `smtp`, `ethereal`, `log`).
- Delivery result contract remains: `ok`, `channel`, optional `messageId`, optional `error`.

## Inbound Hand-off Constraints
- Alias or shared mailbox choices must live in docs/contracts, not hardcoded app logic.
- Reply behavior cannot assume Outlook client-specific alias behavior.
- Shared mailbox visibility and sent-items behavior must be owner-approved before go-live.

## Owner-Verification Checklist
- [ ] Confirm canonical service-request inbox used for `NOTIFICATION_INTERNAL_TO_EMAIL`.
- [ ] Confirm `NOTIFICATION_REPLY_TO_EMAIL` target mailbox.
- [ ] Confirm mailbox ownership model in `docs/inbound-mail-ops-contract.md`.
