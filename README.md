# Robinson Rebuild (Main/Develop Topology)

This repository is governed by [`docs/project-contract.md`](docs/project-contract.md).
Canonical production domain and host: `robinsonseptic.net`.

## Branch and Deployment Contracts
- Branch deploy mapping: [`docs/branch-deploy-contract.md`](docs/branch-deploy-contract.md)
- Cloudflare routing map: [`docs/cloudflare-routing-map.md`](docs/cloudflare-routing-map.md)
- Runtime identity: [`docs/runtime-identity-contract.md`](docs/runtime-identity-contract.md)
- Runtime host proof: [`docs/runtime-host-proof-contract.md`](docs/runtime-host-proof-contract.md)
- Review/admin access protection: [`docs/review-surface-access-contract.md`](docs/review-surface-access-contract.md)
- Admin auth contract: [`docs/admin-access-contract.md`](docs/admin-access-contract.md)
- Public vs develop presentation: [`docs/public-vs-develop-surface-contract.md`](docs/public-vs-develop-surface-contract.md)
- Railway domain topology: [`docs/railway-domain-topology-contract.md`](docs/railway-domain-topology-contract.md)
- Mailbox contract: [`docs/mailbox-contract.md`](docs/mailbox-contract.md)
- Inbound mail ops contract: [`docs/inbound-mail-ops-contract.md`](docs/inbound-mail-ops-contract.md)
- M365 mailbox decision record: [`docs/m365-mailbox-decision-record.md`](docs/m365-mailbox-decision-record.md)
- M365 provisioning checklist: [`docs/m365-provisioning-checklist-net.md`](docs/m365-provisioning-checklist-net.md)
- Sending-domain contract: [`docs/email-domain-contract.md`](docs/email-domain-contract.md)
- Deliverability runbook: [`docs/deliverability-runbook.md`](docs/deliverability-runbook.md)
- Cloudflare authoritative go-live contract: [`docs/cloudflare-go-live-contract.md`](docs/cloudflare-go-live-contract.md)
- DNS inventory pre-cutover: [`docs/dns-inventory-precutover.md`](docs/dns-inventory-precutover.md)
- Nameserver cutover runbook: [`docs/nameserver-cutover-runbook.md`](docs/nameserver-cutover-runbook.md)
- DNS record matrix: [`docs/dns-record-matrix-net.md`](docs/dns-record-matrix-net.md)
- DNS collision guard: [`docs/dns-collision-guard.md`](docs/dns-collision-guard.md)
- Net deployment env matrix: [`docs/net-deployment-env-matrix.md`](docs/net-deployment-env-matrix.md)
- Production cutover checklist: [`docs/production-cutover-checklist.md`](docs/production-cutover-checklist.md)
- Net cutover rehearsal: [`docs/net-cutover-rehearsal.md`](docs/net-cutover-rehearsal.md)
- Release readiness proof pack: [`docs/release-readiness-proof-pack.md`](docs/release-readiness-proof-pack.md)
- Rollback runbook: [`docs/rollback-runbook.md`](docs/rollback-runbook.md)

## Feature Contracts
- Contact form truth: [`docs/contact-form-truth-contract.md`](docs/contact-form-truth-contract.md)
- Follow-up UX: [`docs/request-followup-ux-contract.md`](docs/request-followup-ux-contract.md)
- Public trust voice: [`docs/public-trust-voice-contract.md`](docs/public-trust-voice-contract.md)
- Notification delivery proof: [`docs/notification-delivery-proof-contract.md`](docs/notification-delivery-proof-contract.md)
- Submissions lifecycle workspace: [`docs/submissions-workspace-lifecycle-contract.md`](docs/submissions-workspace-lifecycle-contract.md)
- Lead lifecycle + attribution: [`docs/lead-lifecycle-contract.md`](docs/lead-lifecycle-contract.md)
- Observability: [`docs/observability-contract.md`](docs/observability-contract.md)
- Submissions ops runbook: [`docs/ops-runbook-submissions.md`](docs/ops-runbook-submissions.md)
- Territory routing: [`docs/territory-routing-contract.md`](docs/territory-routing-contract.md)
- Notification delivery state: [`docs/notification-delivery-contract.md`](docs/notification-delivery-contract.md)
- Data retention/export: [`docs/data-retention-contract.md`](docs/data-retention-contract.md)
- Submission export runbook: [`docs/submission-export-runbook.md`](docs/submission-export-runbook.md)
- Form UX accessibility checklist: [`docs/form-ux-accessibility-checklist.md`](docs/form-ux-accessibility-checklist.md)
- Public facts alignment: [`docs/public-facts-contract.md`](docs/public-facts-contract.md)
- Public hours/emergency contract: [`docs/public-hours-emergency-contract.md`](docs/public-hours-emergency-contract.md)
- External listing alignment: [`docs/business-listing-alignment.md`](docs/business-listing-alignment.md)
- External footprint matrix: [`docs/external-footprint-matrix.md`](docs/external-footprint-matrix.md)
- Runtime security contract: [`docs/runtime-security-contract.md`](docs/runtime-security-contract.md)
- Secrets/environment policy: [`docs/secrets-and-env-policy.md`](docs/secrets-and-env-policy.md)
- Backup/restore contract: [`docs/backup-restore-contract.md`](docs/backup-restore-contract.md)
- Recovery rehearsal runbook: [`docs/recovery-rehearsal-runbook.md`](docs/recovery-rehearsal-runbook.md)
- Owner report pack: [`docs/owner-report-pack.md`](docs/owner-report-pack.md)
- Reporting regeneration runbook: [`docs/reporting-regeneration-runbook.md`](docs/reporting-regeneration-runbook.md)
- Owner handoff pack: [`docs/owner-handoff-pack.md`](docs/owner-handoff-pack.md)
- Incident response contract: [`docs/incident-response-contract.md`](docs/incident-response-contract.md)
- Maintenance checklist: [`docs/maintenance-checklist.md`](docs/maintenance-checklist.md)
- Lane conversion UX: [`docs/lane-conversion-contract.md`](docs/lane-conversion-contract.md)
- Anti-spam contract: [`docs/anti-spam-contract.md`](docs/anti-spam-contract.md)

## Environment Templates
- Local default: `.env.example`
- Main deployment: `.env.main.example`
- Develop deployment: `.env.develop.example`
- Test stack: `.env.test`

## Deployment Commands
- Deploy main: `powershell -ExecutionPolicy Bypass -File scripts/deploy-main.ps1`
- Deploy develop: `powershell -ExecutionPolicy Bypass -File scripts/deploy-develop.ps1`
- Verify host routing: `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1 -MainHost https://robinson.hearthcore.app -DevelopHost https://robinson-demo.hearthcore.app`
- Verify both envs: `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1 -MainHost https://robinson.hearthcore.app -DevelopHost https://robinson-demo.hearthcore.app -DevelopReviewAccessKey <review_access_secret>`

## App Verification
- Full gate: `npm run verify:v1`
- Net domain canonicality: `npm run test:net-domain-canonicality`
- Cloudflare cutover contract: `npm run test:cloudflare-cutover-contract`
- Canonical host topology: `npm run test:canonical-host-topology`
- M365 .net mailbox contract: `npm run test:m365-net-mailbox-contract`
- DNS matrix contract: `npm run test:dns-record-matrix-contract`
- Net env topology: `npm run test:net-env-topology`
- Net cutover rehearsal gate: `npm run test:net-cutover-rehearsal-gate`

## Notification Modes
- `NOTIFICATION_MODE=resend` (recommended primary for production web forms)
- `NOTIFICATION_MODE=smtp` (optional fallback, including `SMTP_PROFILE=m365-exchange-online`)
- `NOTIFICATION_MODE=ethereal` (test-only transport)
- `NOTIFICATION_MODE=log` (local contract/smoke mode)
