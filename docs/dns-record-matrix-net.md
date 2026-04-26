# DNS Record Matrix (`robinsonseptic.net`)

## Purpose
Single DNS source of truth for Cloudflare + Railway + Microsoft 365 records.

## Matrix
| Name | Type | Value/Target | Owner System | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| `@` | CNAME/A/AAAA | Railway-provided target | Railway + Cloudflare | required | Canonical public host mapping. |
| `www` | CNAME | Railway/public redirect target | Railway + Cloudflare | required | Non-canonical host; redirects to apex. |
| `develop` | CNAME | Railway develop target | Railway + Cloudflare | optional | Review/develop host strategy. |
| `@` | MX (priority 0 or provider-defined) | Microsoft 365 MX target | Microsoft 365 + Cloudflare | required | Mail ownership is Microsoft 365. |
| `@` | TXT (SPF) | Single SPF policy including needed senders | Microsoft 365 + Cloudflare | required | Only one SPF TXT policy allowed. |
| `selector1._domainkey` | CNAME/TXT | M365 DKIM target | Microsoft 365 + Cloudflare | required | DKIM selector 1. |
| `selector2._domainkey` | CNAME/TXT | M365 DKIM target | Microsoft 365 + Cloudflare | required | DKIM selector 2. |
| `_dmarc` | TXT | DMARC policy | Mail policy owner + Cloudflare | required | `monitor` at minimum. |
| `autodiscover` | CNAME | M365 autodiscover target | Microsoft 365 + Cloudflare | required | Client configuration discovery. |
| `notify` / mail send subdomain | CNAME/TXT | Provider sending-domain verification records | Notification provider + Cloudflare | required | Supports `notify.robinsonseptic.net`. |
| Railway validation host(s) | TXT/CNAME | Railway-provided validation values | Railway + Cloudflare | required | Required for custom-domain verification. |
| Legacy `.com` records | any | previous values | legacy | legacy-remove or legacy-verify | Must not be production-canonical. |

## Status Labels
- `required`: mandatory before production cutover.
- `optional`: useful but not launch-blocking unless explicitly adopted.
- `legacy-remove`: remove during/after cutover.
- `legacy-verify`: keep temporarily with explicit justification and sunset date.

## Ownership Rules
- Registrar ownership: GoDaddy.
- Authoritative DNS ownership: Cloudflare.
- App-domain ownership: Railway mappings.
- Mail routing ownership: Microsoft 365 MX/SPF/DKIM/DMARC.

## Guardrails
- Publish exactly one SPF policy for root domain.
- Keep MX priorities explicit and provider-authoritative.
- Do not co-locate conflicting web and mail record types at same label.
- Legacy records must carry status markers before go-live.
