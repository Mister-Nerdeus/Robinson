# Inbound Mail Operations Contract

## Purpose
Define how inbound customer replies and shared staff workflow operate for `robinsonseptic.net` regardless of outbound provider.

## Selected Operating Model
- Model: `shared-mailbox-primary`.
- Pattern: one licensed admin mailbox for tenant ownership plus one shared mailbox for multi-staff handling.
- Aliases are allowed for public address ergonomics, but operations terminate in shared mailbox membership.

## Reply Target Contract
- Public reply target (`NOTIFICATION_REPLY_TO_EMAIL`): `service@robinsonseptic.net`.
- `dispatch@robinsonseptic.net`, `info@robinsonseptic.net`, and `rentals@robinsonseptic.net` are aliases to the shared mailbox.
- App code must not infer alias behavior; this contract controls reply behavior.

## Staff Visibility Contract
Shared mailbox must provide:
- Read access for owner and dispatch staff.
- Sent-items visibility for delegated sends/replies.
- Clear ownership for follow-up tasks.

## Workflow
1. Customer reply lands in `service@robinsonseptic.net` shared mailbox.
2. Dispatch triages and assigns owner/staff follow-up.
3. Outbound reply and internal notes remain visible to mailbox members.
4. Escalations move to owner when unresolved within the same business day.

## Controls
- Membership list maintained by owner/admin.
- Forwarding (if enabled) must be documented and tested.
- Sent-items copy policy must be explicit and validated.

## Legacy and Placeholder Handling
- `service@robinsonseptic.com` is `legacy-retired` and must not be used in production contracts.
- Internal-only placeholders are allowed only when explicitly marked (for example `example.com`, `.local`, sandbox inboxes).

## Readiness Checklist
- [ ] Owner approves selected mailbox model.
- [ ] Reply target mailbox documented as `.net`.
- [ ] Membership list documented.
- [ ] Sent-items visibility policy confirmed.
- [ ] Alias usage vs shared mailbox usage clearly distinguished.
