# Form Abuse Protection

## Baseline Controls
- Honeypot field: `companyWebsite` must be empty.
- Rate limiting: keyed by source IP (`RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`).
- Pattern filter: blocks obvious spam terms/URLs.
- Abuse log: blocked attempts saved to `data/abuse-log.ndjson`.

## Config
- `RATE_LIMIT_MAX` default: 8
- `RATE_LIMIT_WINDOW_MS` default: 900000 (15 minutes)

## Validation Matrix
| Case | Expected |
|---|---|
| Valid homeowner submission | pass |
| Honeypot populated | blocked |
| Repeated rapid submissions beyond limit | blocked (429) |
| URL-heavy promotional spam | blocked |

## Operational Note
Controls are intentionally lightweight to minimize friction for homeowners and realtors while reducing low-effort bot traffic.
