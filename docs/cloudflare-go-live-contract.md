# Cloudflare Go-Live Contract

## Objective
Define the authoritative DNS cutover contract where `robinsonseptic.net` remains registered at GoDaddy and Cloudflare becomes the authoritative DNS provider.

## Invariants
- GoDaddy remains registrar of record.
- Cloudflare becomes authoritative DNS.
- DNS records are inventoried before nameserver cutover.
- DNSSEC handling is explicit before and after cutover.
- No live cutover without rollback path.

## Required Preconditions
- `docs/dns-inventory-precutover.md` completed.
- Cloudflare zone for `robinsonseptic.net` created.
- Imported records reviewed and normalized in Cloudflare.
- `docs/nameserver-cutover-runbook.md` rollback section reviewed.

## DNSSEC Contract
1. Check current DNSSEC state at GoDaddy.
2. If DNSSEC is enabled, disable DNSSEC before nameserver replacement.
3. Wait for registrar confirmation before replacing nameservers.
4. Re-enable DNSSEC only after Cloudflare authoritative state is stable.

## Nameserver Authority Contract
- Replace GoDaddy nameservers with the Cloudflare-assigned pair from the zone onboarding page.
- Validate NS propagation from multiple public resolvers.
- Record activation timestamps in cutover evidence.

## Verification Contract
- NS answers for `robinsonseptic.net` resolve to Cloudflare nameservers.
- Required web, mail, and validation records resolve with expected values.
- HTTPS remains valid for canonical host after app/DNS alignment.

## Rollback Contract
- If Cloudflare activation fails or DNS responses are inconsistent, restore prior GoDaddy nameserver values from inventory.
- Re-validate pre-cutover record resolution and capture incident notes.

## Evidence Checklist
- [ ] Screenshot/export of Cloudflare-assigned nameservers.
- [ ] Completed DNS inventory snapshot.
- [ ] DNSSEC state before/after notes.
- [ ] NS propagation checks from at least two resolvers.
- [ ] Explicit go/no-go entry in release proof pack.
