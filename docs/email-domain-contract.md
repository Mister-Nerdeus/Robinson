# Email Sending-Domain Contract

## Purpose
Define the production-ready, provider-neutral contract for outbound sending-domain readiness on `robinsonseptic.net`.

## Canonical Policy
- Production policy: `dedicated-subdomain`.
- Canonical root domain: `robinsonseptic.net`.
- Canonical sending subdomain: `notify.robinsonseptic.net`.
- Provider override domain is allowed only when explicitly recorded and owner-approved.

## Environment Contract
| Field | Env var | Required | Notes |
| --- | --- | --- | --- |
| Policy | `NOTIFICATION_SENDING_DOMAIN_POLICY` | Yes | `root-domain`, `dedicated-subdomain`, or `provider-subdomain`. |
| Root domain | `NOTIFICATION_SENDING_ROOT_DOMAIN` | Yes for provider sends | Public business domain root. |
| Sending subdomain | `NOTIFICATION_SENDING_SUBDOMAIN` | Yes for `dedicated-subdomain` | Produces `<subdomain>.<root>`. |
| Provider sending domain | `NOTIFICATION_PROVIDER_SENDING_DOMAIN` | Optional | Explicit override for provider-managed subdomain. |
| Domain verified | `NOTIFICATION_DNS_VERIFIED` | Yes for production provider sends | Must be `true` before go-live. |
| SPF verified | `NOTIFICATION_DNS_SPF_VERIFIED` | Yes for production provider sends | Must be `true` before go-live. |
| DKIM verified | `NOTIFICATION_DNS_DKIM_VERIFIED` | Yes for production provider sends | Must be `true` before go-live. |
| DMARC posture | `NOTIFICATION_DNS_DMARC_POSTURE` | Recommended | `not-set`, `monitor`, `quarantine`, `reject`. |

## DNS and Auth Minimum
- SPF: required and verified; only one SPF TXT policy is allowed for the root domain.
- DKIM: required and verified.
- DMARC: optional for transport acceptance, recommended for trust and spoofing resistance.
- MX ownership for mailbox delivery remains Microsoft 365 and must not collide with Railway web records.

## Readiness Gate
In `production` runtime with `NOTIFICATION_MODE=smtp` or `NOTIFICATION_MODE=resend`:
- No send is production-ready unless effective sending domain is present and DNS verification flags are true for domain/SPF/DKIM.
- Failing readiness must return a clear guardrail error and block provider send attempts.

## Legacy and Internal References
- `robinsonseptic.com` / `notify.robinsonseptic.com` are `legacy-retired` values.
- Internal-only test placeholders are allowed when explicitly marked as non-production.

## Related Contracts
- `docs/dns-record-matrix-net.md`
- `docs/dns-collision-guard.md`
- `docs/deliverability-runbook.md`

## Proof Checklist
- [ ] Provider dashboard screenshot proving `.net` domain verification.
- [ ] DNS record evidence for SPF and DKIM selectors.
- [ ] DMARC record posture captured (`monitor`, `quarantine`, or `reject`).
- [ ] `.env.main` aligns with this contract.
- [ ] `tests/email-domain-readiness.spec.ts` and `tests/dns-record-matrix-contract.spec.ts` pass output attached.
