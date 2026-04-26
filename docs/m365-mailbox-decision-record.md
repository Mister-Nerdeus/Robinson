# M365 Mailbox Decision Record

## Decision
- Date: 2026-04-25
- Status: approved-for-launch-prep
- Decision owner: business owner
- Technical owner: operations

## Options Considered
1. One licensed mailbox with many aliases.
2. Dedicated shared mailbox for team workflow.
3. Hybrid: licensed owner mailbox + shared mailbox + selected aliases.

## Final Choice
- Chosen: hybrid with shared-mailbox-primary workflow.
- Why:
- Multiple staff need visibility into replies and sent follow-up.
- Shared mailbox gives explicit membership and sent-item controls.
- Aliases remain available without encoding client-specific behavior in app logic.

## Operational Rules
- Reply target for app notifications points to shared mailbox address.
- Alias-only flows are not considered sufficient for team operations.
- Shared mailbox membership and forwarding are part of launch checklist.

## Approval Checklist
- [x] Owner agrees on mailbox model.
- [x] Reply target documented.
- [x] Sent-item visibility policy documented.
- [x] Alias vs shared mailbox distinction documented.
