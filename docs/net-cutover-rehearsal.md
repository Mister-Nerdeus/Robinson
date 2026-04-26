# Net Cutover Rehearsal

## Scope
End-to-end rehearsal checklist for `.net` production cutover with rollback readiness.

## Rehearsal Steps (Real Stack)
1. Cloudflare nameserver move validation
- Validate planned GoDaddy -> Cloudflare nameserver change procedure.
- Validate DNSSEC handling decision and required toggles.

2. Railway custom-domain validation
- Confirm required Railway DNS records are present in Cloudflare draft set.
- Confirm canonical host + redirect behavior contract.

3. Certificate / HTTPS validation
- Confirm HTTPS readiness assumptions for apex, www redirect, and develop host.
- Confirm Cloudflare SSL/TLS mode `Full` for proxied Railway hosts.

4. Microsoft 365 DNS validation
- Validate MX/SPF/DKIM/DMARC/autodiscover record plan against DNS matrix.
- Confirm Cloudflare DNS ownership responsibility.

5. Application and mailbox flow validation
- Submit website form in rehearsal environment.
- Validate notification send path.
- Validate reply receipt in shared mailbox workflow.
- Validate admin auth/review access controls.

6. Rollback rehearsal
- Walk through nameserver rollback path.
- Walk through env/config rollback path.
- Confirm post-rollback validation checklist.

## Evidence Required
- [ ] Nameserver validation notes
- [ ] DNS matrix check output
- [ ] Host topology verification output
- [ ] Notification + reply flow proof
- [ ] Rollback rehearsal notes

## Recommendation
- Default recommendation remains `No-Go` until all rehearsal evidence is attached and `npm run verify:v1` passes on release branch.
