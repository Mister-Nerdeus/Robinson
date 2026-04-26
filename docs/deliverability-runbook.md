# Deliverability Runbook

## Scope
Operational runbook for proving outbound deliverability readiness before public cutover.

## Inputs
- `docs/email-domain-contract.md`
- Provider account with verified sender domain
- Production env contract (`.env.main`)

## Steps
1. Confirm sending-domain policy (`dedicated-subdomain` expected for production).
2. Confirm effective sending domain resolves from env contract.
3. Validate DNS state:
- SPF record present and verified.
- DKIM selectors present and verified.
- DMARC posture documented.
4. Confirm provider credentials:
- `RESEND_API_KEY` for Resend mode or SMTP credential set for SMTP mode.
5. Run readiness test:
- `npm run test:email-domain-readiness`
6. Run integrated verification:
- `npm run verify:v1`

## Failure Handling
- If readiness fails, do not run production send.
- Set recommendation to `No-Go` in release proof pack.
- Attach failure reasons from test output and env diff.

## Proof Artifacts
- Domain verification screenshot
- DNS record capture (SPF, DKIM, DMARC)
- Env snapshot (redacted secrets)
- Test output for readiness + full verify

## Owner Signoff
- [ ] Owner confirms outbound sending domain and reply target are final.
- [ ] Owner approves DMARC posture for launch window.
