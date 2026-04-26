# DNS Inventory Pre-Cutover (`robinsonseptic.net`)

## Purpose
Capture the complete pre-cutover DNS state before moving authoritative nameservers from GoDaddy-managed DNS to Cloudflare.

## Inventory Metadata
- Inventory date:
- Operator:
- Registrar account used:
- Current authoritative provider:
- Current nameservers:
- DNSSEC enabled (`yes/no`):

## Record Inventory Template
| Host/Name | Type | Value/Target | TTL | Current Provider | Intended Post-Cutover Status |
| --- | --- | --- | --- | --- | --- |
| `@` | A/AAAA/CNAME |  |  | GoDaddy DNS | required |
| `www` | CNAME/A |  |  | GoDaddy DNS | required |
| `@` | MX |  |  | GoDaddy DNS | required |
| `@` | TXT (SPF) |  |  | GoDaddy DNS | required |
| `_dmarc` | TXT |  |  | GoDaddy DNS | required |
| `<selector>._domainkey` | CNAME/TXT |  |  | GoDaddy DNS | required |
| `autodiscover` | CNAME |  |  | GoDaddy DNS | required |
| Railway validation host | TXT/CNAME |  |  | N/A | required |
| Legacy records | any |  |  | GoDaddy DNS | legacy-verify / legacy-remove |

## Validation Snapshot Commands
- `nslookup -type=ns robinsonseptic.net`
- `nslookup -type=mx robinsonseptic.net`
- `nslookup -type=txt robinsonseptic.net`
- `nslookup -type=cname www.robinsonseptic.net`

## Pre-Cutover Checklist
- [ ] Current nameserver values copied verbatim.
- [ ] All active MX/SPF/DKIM/DMARC records captured.
- [ ] Website records for apex + www captured.
- [ ] Legacy/unknown records labeled `legacy-verify` or `legacy-remove`.
- [ ] Rollback snapshot stored with timestamp.
