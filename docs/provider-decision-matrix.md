# Provider Decision Matrix

## Recommendation
Primary: **Resend** for production web-form delivery.  
Fallback: **SMTP** (including Microsoft 365 Exchange Online mode) when mailbox-owned routing is required.

## Matrix
| Dimension | Resend | SMTP Generic | SMTP M365 / Exchange Online |
| --- | --- | --- | --- |
| Setup complexity | Low | Medium | Medium/High |
| API ergonomics | First-class SDK | Transport-level | Transport-level + tenant policy |
| Deliverability controls | Strong (domain + API key) | Varies by host | Varies by mailbox + tenant |
| Operational coupling to mailbox | Low | High | High |
| Recommended use in this repo | Primary production path | Optional fallback | Optional fallback for Microsoft-hosted mailbox ops |

## Failover Guidance
- Keep persistence-before-delivery invariant independent of provider.
- If primary provider fails, submissions remain persisted and can be replayed.
- Use one active provider mode at a time (`NOTIFICATION_MODE`), switch intentionally with documented env change.
