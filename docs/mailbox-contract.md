# Mailbox Contract

## Purpose
Freeze provider-neutral mailbox semantics and inbound operating assumptions for `robinsonseptic.net`.

## Canonical Public Address Map (.net)
| Address | Role | Type | Canonicality |
| --- | --- | --- | --- |
| `service@robinsonseptic.net` | Public intake + reply target | Shared mailbox | Canonical |
| `dispatch@robinsonseptic.net` | Dispatch-facing alias | Alias to shared intake mailbox | Canonical alias |
| `info@robinsonseptic.net` | General inquiry alias | Alias to shared intake mailbox | Canonical alias |
| `rentals@robinsonseptic.net` | Rental inquiry alias | Alias to shared intake mailbox | Canonical alias |
| `no-reply@notify.robinsonseptic.net` | Outbound sender identity | Sending-domain mailbox identity | Canonical outbound identity |

## Canonical Outbound Contract
| Field | Env var(s) | Required | Notes |
| --- | --- | --- | --- |
| Internal default recipient | `NOTIFICATION_INTERNAL_TO_EMAIL` (fallback `NOTIFICATION_TO_EMAIL`) | Yes | Catch-all recipient for lanes without explicit routing entry. |
| Lane recipient mapping | `NOTIFICATION_LANE_TO_EMAIL_MAP` | Optional | Format: `lane:email;lane:email`. Supported lanes remain `general`, `septic-service`, `evaluation`, `rental`, `commercial-service`. |
| Sender address | `NOTIFICATION_FROM_EMAIL` | Yes | Provider-neutral sender identity. |
| Sender display name | `NOTIFICATION_FROM_NAME` | Optional | Rendered as `Display Name <from@email>`. |
| Reply target | `NOTIFICATION_REPLY_TO_EMAIL` | Yes for production | Must resolve to `service@robinsonseptic.net`. |

## Routing Model
- Resolve recipient by lane map first.
- If lane entry is missing, use `NOTIFICATION_INTERNAL_TO_EMAIL` fallback.
- Every lane must resolve to a non-empty recipient rule.

## Provider-Neutral Semantics
- `sendSubmissionNotification` receives canonical submission record, not provider-specific payloads.
- Provider branch only maps delivery transport (`resend`, `smtp`, `ethereal`, `log`).
- Delivery result contract remains: `ok`, `channel`, optional `messageId`, optional `error`.

## Canonicality Guardrails
- `robinsonseptic.net` is the only canonical public domain for production mailbox contracts.
- Any retained `.com` reference must be explicitly labeled `legacy` or `retired`; it cannot be an active contract value.
- Internal placeholders (for example `example.com`, `.local`) are non-production only.

## Owner-Verification Checklist
- [ ] Confirm `service@robinsonseptic.net` shared mailbox exists.
- [ ] Confirm `dispatch@`, `info@`, and `rentals@` alias behavior matches staff workflow.
- [ ] Confirm `NOTIFICATION_REPLY_TO_EMAIL=service@robinsonseptic.net` in production env.
- [ ] Confirm mailbox ownership model in `docs/inbound-mail-ops-contract.md`.
