# M365 Mailbox Decision Record

## Decision
- Date: 2026-04-26
- Status: approved-for-launch-prep
- Decision owner: business owner
- Technical owner: operations

## Options Considered
1. One licensed mailbox with many aliases.
2. Dedicated shared mailbox for team workflow.
3. Hybrid: licensed admin mailbox + shared mailbox + selected aliases.

## Final Choice
- Chosen: hybrid with shared-mailbox-primary workflow.
- Why:
- Multiple staff need visibility into replies and sent follow-up.
- Shared mailbox gives explicit membership and sent-item controls.
- Aliases remain available without encoding client-specific behavior in app logic.

## Canonical Address Model (.net)
- Shared mailbox (public intake + reply target): `service@robinsonseptic.net`
- Aliases to shared mailbox: `dispatch@robinsonseptic.net`, `info@robinsonseptic.net`, `rentals@robinsonseptic.net`
- Outbound sender identity: `no-reply@notify.robinsonseptic.net`

## DNS Ownership Rule
After nameserver cutover, Microsoft 365-required DNS records are created and maintained in Cloudflare DNS for `robinsonseptic.net`.

## Operational Rules
- Reply target for app notifications points to shared mailbox address.
- Alias-only flows are not considered sufficient for team operations.
- Shared mailbox membership and forwarding are part of launch checklist.

## Approval Checklist
- [x] Owner agrees on mailbox model.
- [x] Reply target documented.
- [x] Sent-item visibility policy documented.
- [x] Alias vs shared mailbox distinction documented.
- [ ] Owner confirms mailbox licensing purchase completion.
- [ ] Owner confirms delegate membership list.
