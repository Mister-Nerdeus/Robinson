# Robinson Rebuild (Main/Develop Topology)

This repository is governed by [`docs/project-contract.md`](docs/project-contract.md).

## Branch and Deployment Contracts
- Branch deploy mapping: [`docs/branch-deploy-contract.md`](docs/branch-deploy-contract.md)
- Cloudflare routing map: [`docs/cloudflare-routing-map.md`](docs/cloudflare-routing-map.md)
- Runtime identity: [`docs/runtime-identity-contract.md`](docs/runtime-identity-contract.md)
- Runtime host proof: [`docs/runtime-host-proof-contract.md`](docs/runtime-host-proof-contract.md)
- Review/admin access protection: [`docs/review-surface-access-contract.md`](docs/review-surface-access-contract.md)
- Admin auth contract: [`docs/admin-access-contract.md`](docs/admin-access-contract.md)
- Mailbox contract: [`docs/mailbox-contract.md`](docs/mailbox-contract.md)
- Resend runbook: [`docs/resend-setup-runbook.md`](docs/resend-setup-runbook.md)
- Microsoft 365 SMTP runbook: [`docs/m365-smtp-runbook.md`](docs/m365-smtp-runbook.md)
- Provider decision matrix: [`docs/provider-decision-matrix.md`](docs/provider-decision-matrix.md)
- Public vs develop presentation: [`docs/public-vs-develop-surface-contract.md`](docs/public-vs-develop-surface-contract.md)
- Promotion runbook: [`docs/branch-promotion-runbook.md`](docs/branch-promotion-runbook.md)
- Proof packs: [`docs/main-develop-deploy-proof-pack.md`](docs/main-develop-deploy-proof-pack.md), [`docs/v4-proof-pack.md`](docs/v4-proof-pack.md)

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
- Production cutover checklist: [`docs/production-cutover-checklist.md`](docs/production-cutover-checklist.md)
- Release readiness proof pack: [`docs/release-readiness-proof-pack.md`](docs/release-readiness-proof-pack.md)
- Public facts alignment: [`docs/public-facts-contract.md`](docs/public-facts-contract.md)
- Lane conversion UX: [`docs/lane-conversion-contract.md`](docs/lane-conversion-contract.md)

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
- Runtime contract: `npm run test:runtime-contract`
- SEO contract: `npm run test:seo-contract`
- Admin auth contract: `npm run test:admin-auth-contract`
- Submission persistence contract: `npm run test:submission-persistence-contract`
- SQLite persistence contract: `npm run test:sqlite-persistence-contract`
- Resend provider contract: `npm run test:resend-provider`
- Mailbox contract: `npm run test:mailbox-contract`
- SMTP config contract: `npm run test:smtp-config-contract`
- Observability contract: `npm run test:observability-contract`
- Territory routing contract: `npm run test:territory-routing`
- Notification delivery state contract: `npm run test:notification-delivery-state`
- Data retention/auth contract: `npm run test:data-retention-auth`
- Form UX accessibility gate: `npm run test:form-ux-accessibility`
- Release readiness gate: `npm run test:release-readiness-gate`
- Lead lifecycle contract: `npm run test:lead-lifecycle`
- Public facts consistency: `npm run test:public-facts-consistency`
- Lane conversion contract: `npm run test:lane-conversion-contract`

## Notification Modes
- `NOTIFICATION_MODE=resend` (recommended primary for production web forms)
- `NOTIFICATION_MODE=smtp` (optional fallback, including `SMTP_PROFILE=m365-exchange-online`)
- `NOTIFICATION_MODE=ethereal` (test-only transport)
- `NOTIFICATION_MODE=log` (local contract/smoke mode)
