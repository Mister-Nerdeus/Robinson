# Microsoft 365 / Exchange Online SMTP Runbook

## Goal
Support mailbox-based SMTP delivery through Exchange Online as a fallback-compatible path.

## Required Env
- `NOTIFICATION_MODE=smtp`
- `SMTP_PROFILE=m365-exchange-online`
- `SMTP_USER=<mailbox-username>`
- `SMTP_PASS=<mailbox-password-or-app-password>`

Defaults:
- `SMTP_HOST` falls back to `smtp.office365.com` when profile is `m365-exchange-online`.
- `SMTP_PORT=587`
- `SMTP_SECURE=false` (STARTTLS on submission port 587).

## Setup Notes
- SMTP AUTH must be enabled for the specific mailbox.
- Shared mailbox send behavior depends on tenant policy and mailbox permissions.
- Prefer shared mailbox for team-managed replies; do not assume alias-only behavior.

## Operational Caveats
- Microsoft recommends disabling SMTP AUTH unless required.
- Mailbox-level SMTP AUTH settings and tenant policy can block auth unexpectedly.
- Exchange Online applies service throttling limits; monitor send failures and retry strategy.
- Sent-items behavior can vary for shared mailbox workflows and delegated sends.

## Verification
- Run `npm run test:smtp-config-contract`.
- Run full gate: `npm run verify:v1`.
