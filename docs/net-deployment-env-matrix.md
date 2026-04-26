# Net Deployment Env Matrix

## Purpose
Align environment templates and deployment topology to the real production stack:
GoDaddy registrar + Cloudflare DNS + Railway hosting + Microsoft 365 mail on `.net`.

## Matrix
| Scope | Variable | Canonical Value Pattern | Notes |
| --- | --- | --- | --- |
| Production | `SITE_URL` | `https://robinsonseptic.net` | Exactly one canonical public host. |
| Develop | `SITE_URL` | `https://develop.robinsonseptic.net` | Review-only host, noindex. |
| Production | `NOTIFICATION_REPLY_TO_EMAIL` | `service@robinsonseptic.net` | Public reply target. |
| Production | `NOTIFICATION_FROM_EMAIL` | `no-reply@notify.robinsonseptic.net` | Sending-domain aligned identity. |
| Production | `NOTIFICATION_SENDING_ROOT_DOMAIN` | `robinsonseptic.net` | Canonical root domain. |
| Production | `NOTIFICATION_SENDING_SUBDOMAIN` | `notify` | Produces `notify.robinsonseptic.net`. |
| Develop | `NOTIFICATION_SENDING_SUBDOMAIN` | `notify-develop` | Isolated review sender domain label. |
| Production | `REVIEW_SURFACES_VISIBLE` | `false` | Public runtime hardening. |
| Develop | `REVIEW_SURFACES_VISIBLE` | `true` | Review runtime affordances. |

## Secret Handling
- `.env.*.example` files are non-secret templates only.
- Live secrets are injected per environment and never committed.
- Proof artifacts must redact secrets.

## Topology Alignment Checks
- `tests/net-env-topology.spec.ts`
- `tests/canonical-host-topology.spec.ts`
- `tests/net-domain-canonicality.spec.ts`
