# DNS Collision Guard

## Objective
Prevent web + mail DNS collisions during Cloudflare-managed deployment on `robinsonseptic.net`.

## Collision Rules
1. SPF rule
- Exactly one SPF TXT policy may exist at root (`@`).
- If multiple SPF TXT records exist, cutover is blocked.

2. MX rule
- MX records must point only to Microsoft 365 targets.
- MX priorities must be explicit and documented.

3. Host mapping rule
- Canonical host is `robinsonseptic.net`.
- `www` is non-canonical and must redirect to canonical.
- Review host(s) must not become canonical by accident.

4. Railway validation rule
- Railway verification records must match values provided by Railway.
- Remove stale validation records after successful attach unless Railway requires retention.

5. Legacy record rule
- Every legacy record must be tagged `legacy-remove` or `legacy-verify`.
- Untagged legacy records block cutover readiness.

## Dry-Run Validation Checklist
- [ ] SPF count check returns one active SPF policy.
- [ ] MX records resolve and priorities match documented matrix.
- [ ] Apex, www, and develop host records match topology contract.
- [ ] DKIM selectors and DMARC resolve.
- [ ] Legacy records are status-marked.

## Test Gate
- `tests/dns-record-matrix-contract.spec.ts`
