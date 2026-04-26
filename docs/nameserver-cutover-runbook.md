# Nameserver Cutover Runbook

## Scope
Runbook for moving authoritative DNS for `robinsonseptic.net` from GoDaddy DNS to Cloudflare DNS while keeping GoDaddy as registrar.

## Preconditions
- Cloudflare zone created and record set reviewed.
- `docs/dns-inventory-precutover.md` completed.
- DNSSEC state checked at GoDaddy.
- Rollback contacts and prior nameserver values captured.

## Cutover Steps
1. Confirm Cloudflare zone status and assigned nameservers.
2. If DNSSEC is enabled at GoDaddy, disable DNSSEC and wait for disable confirmation.
3. Update GoDaddy nameservers to Cloudflare-assigned nameservers.
4. Save confirmation ID and timestamp from registrar change.
5. Monitor Cloudflare zone activation status until active.

## Propagation Verification
- Verify NS at multiple resolvers (example: Cloudflare 1.1.1.1, Google 8.8.8.8).
- Verify required records resolve:
- Apex host record for `robinsonseptic.net`
- `www` redirect/target record
- MX for Microsoft 365
- SPF/DKIM/DMARC TXT/CNAME records
- Railway validation records

## Validation Checklist
- [ ] Authoritative NS answers return Cloudflare nameservers.
- [ ] Apex + www behavior matches host topology contract.
- [ ] Mail flow records resolve correctly.
- [ ] No duplicate SPF records are published.

## Rollback Steps
1. Restore prior GoDaddy nameserver values from inventory snapshot.
2. Re-verify NS answers show old provider nameservers.
3. Confirm website and mailbox records resolve to pre-cutover values.
4. Record incident details and mark release recommendation `No-Go`.

## Evidence
- Registrar change screenshot/log
- Cloudflare active status screenshot/log
- Resolver verification output
- Rollback evidence (if executed)
