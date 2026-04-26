# Deliverability Runbook

## Scope
Operational runbook for proving outbound deliverability readiness before public cutover on `robinsonseptic.net`.

## Inputs
- `docs/email-domain-contract.md`
- `docs/dns-record-matrix-net.md`
- `docs/dns-collision-guard.md`
- Provider account with verified sender domain
- Production env contract (`.env.main`)

## Steps
1. Confirm sending-domain policy (`dedicated-subdomain` expected for production).
2. Confirm effective sending domain resolves to `notify.robinsonseptic.net` from env contract.
3. Validate DNS state:
- SPF record present and verified (single SPF policy only).
- DKIM selectors present and verified.
- DMARC posture documented.
4. Confirm provider credentials:
- `RESEND_API_KEY` for Resend mode or SMTP credential set for SMTP mode.
5. Validate mailbox reply routing:
- `NOTIFICATION_REPLY_TO_EMAIL=service@robinsonseptic.net`.
6. Run readiness tests:
- `npm run test:email-domain-readiness`
- `npm run test:dns-record-matrix-contract`
7. Run integrated verification:
- `npm run verify:v1`

## Failure Handling
- If readiness fails, do not run production send.
- Set recommendation to `No-Go` in release proof pack.
- Attach failure reasons from test output and env diff.

## Proof Artifacts
- `.net` domain verification screenshot
- DNS record capture (SPF, DKIM, DMARC, MX)
- Env snapshot (redacted secrets)
- Test output for readiness + full verify

## Owner Signoff
- [ ] Owner confirms outbound sending domain and reply target are final.
- [ ] Owner approves DMARC posture for launch window.
- [ ] Owner acknowledges `.com` values are legacy-retired only.
