# Inbound Mail Operations Contract

## Purpose
Define how inbound customer replies and shared staff workflow operate independently from outbound provider choice.

## Selected Operating Model
- Model: `shared-mailbox-primary`.
- Pattern: one licensed owner mailbox for identity/admin plus one shared mailbox for multi-staff handling.
- Aliases are allowed for vanity or legacy addresses, but shared workflow must terminate in shared mailbox membership.

## Reply Target Contract
- Public reply target (`NOTIFICATION_REPLY_TO_EMAIL`): `service@robinsonseptic.com`.
- If aliasing is used, alias must forward/route to shared mailbox with explicit membership.
- App code must not infer alias behavior; operations contract controls reply behavior.

## Staff Visibility Contract
- Shared mailbox must provide:
- Read access for owner and dispatch staff.
- Sent-items visibility for delegated sends/replies.
- Clear ownership for follow-up tasks.

## Workflow
1. Customer reply lands in shared mailbox target.
2. Dispatch triages and assigns owner/staff follow-up.
3. Outbound reply and internal notes remain visible to mailbox members.
4. Escalations move to owner when unresolved within same business day.

## Controls
- Membership list maintained by owner/admin.
- Forwarding (if enabled) must be documented and tested.
- Sent-items copy policy must be explicit and validated.

## Readiness Checklist
- [ ] Owner approves selected mailbox model.
- [ ] Reply target mailbox documented.
- [ ] Membership list documented.
- [ ] Sent-items visibility policy confirmed.
- [ ] Alias usage vs shared mailbox usage clearly distinguished.
