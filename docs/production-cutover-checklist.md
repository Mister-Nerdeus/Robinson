# Production Cutover Checklist

## Owner Verification
- [ ] Owner confirms canonical domain truth: `robinsonseptic.net` only for production public/email contracts.
- [ ] Owner confirms canonical host decision: `https://robinsonseptic.net` (apex canonical), `https://www.robinsonseptic.net` redirects to apex.
- [ ] Owner confirms outbound sending-domain policy and verified DNS proof.
- [ ] Owner approves inbound mailbox model and reply workflow.
- [ ] Owner approves anti-spam posture and trusted override policy.

## Pre-Cutover DNS Inventory
- [ ] Complete `docs/dns-inventory-precutover.md` with current authoritative records.
- [ ] Capture current GoDaddy nameserver values and Cloudflare assigned nameservers.
- [ ] Confirm DNSSEC state at GoDaddy and document disable/enable steps.
- [ ] Freeze a rollback record set from pre-cutover DNS inventory.

## Cloudflare Authoritative DNS Cutover
- [ ] Add zone for `robinsonseptic.net` in Cloudflare.
- [ ] Import and review existing DNS records before nameserver change.
- [ ] Validate required Railway + Microsoft 365 records in Cloudflare draft zone.
- [ ] Update registrar nameservers at GoDaddy to Cloudflare-assigned pair.
- [ ] Validate propagation (`dig/nslookup`) from multiple resolvers.
- [ ] If activation fails, execute `docs/nameserver-cutover-runbook.md` rollback section.

## Railway + Host Topology Gates
- [ ] Railway custom-domain mapping documented in `docs/railway-domain-topology-contract.md`.
- [ ] Canonical host topology verified (`tests/canonical-host-topology.spec.ts`).
- [ ] Cloudflare SSL/TLS mode documented as `Full` for proxied Railway domains.
- [ ] Non-canonical public host redirect policy is explicit and tested.

## Microsoft 365 Mailbox + DNS Gates
- [ ] Mailbox decision record approved (`docs/m365-mailbox-decision-record.md`).
- [ ] Provisioning checklist complete (`docs/m365-provisioning-checklist-net.md`).
- [ ] Cloudflare-hosted DNS responsibility for Microsoft 365 records is documented.

## Technical Gates
- [ ] Submission persistence path proven (`tests/submission-persistence-contract.spec.ts`).
- [ ] Notification delivery path proven (`tests/notification-delivery-state.spec.ts`, `tests/observability-contract.spec.ts`).
- [ ] Sending-domain readiness proven (`tests/email-domain-readiness.spec.ts`).
- [ ] DNS matrix + collision guard proven (`tests/dns-record-matrix-contract.spec.ts`).
- [ ] Net domain canonicality proven (`tests/net-domain-canonicality.spec.ts`).
- [ ] Net env topology proven (`tests/net-env-topology.spec.ts`).
- [ ] Anti-spam gate proven (`tests/anti-spam-contract.spec.ts`).
- [ ] Claim governance gate proven (`tests/claim-registry-guard.spec.ts`).
- [ ] Public facts/hours consistency proven (`tests/public-facts-consistency.spec.ts`, `tests/public-hours-truth.spec.ts`).
- [ ] Admin auth/review controls proven (`tests/admin-auth-contract.spec.ts`, `tests/data-retention-auth.spec.ts`).

## Dry-Run Rehearsal
- [ ] Dry-run rehearsal executed from `docs/net-cutover-rehearsal.md`.
- [ ] Cloudflare nameserver move validation simulated and documented.
- [ ] Railway custom-domain + HTTPS validation simulated and documented.
- [ ] Microsoft 365 DNS validation simulated and documented.
- [ ] Form submit path exercised.
- [ ] Notification delivery observed.
- [ ] Mailbox reply receipt verified.
- [ ] Admin auth and review access verified.
- [ ] Rollback rehearsal completed (`docs/rollback-runbook.md`).

## Artifact Requirements
- [ ] Dry-run evidence bundle attached.
- [ ] DNS inventory snapshot attached.
- [ ] Rollback runbook completed and dated.
- [ ] Release readiness proof pack updated with explicit recommendation.

## Go / No-Go
Go only when every box above is complete, owner signoff is recorded, and `npm run verify:v1` passes on the release branch.
No-Go if any owner verification, DNS authority gate, notification readiness, mailbox gate, or rollback gate remains open.
