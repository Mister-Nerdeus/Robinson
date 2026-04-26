# M365 Provisioning Checklist (`robinsonseptic.net`)

## Scope
Provision Microsoft 365 mailbox workflow where GoDaddy is registrar and Cloudflare hosts DNS after nameserver cutover.

## Mailbox Model (Approved)
- Shared mailbox: `service@robinsonseptic.net` (public intake and reply target).
- Aliases to shared mailbox: `dispatch@robinsonseptic.net`, `info@robinsonseptic.net`, `rentals@robinsonseptic.net`.
- Outbound sender identity: `no-reply@notify.robinsonseptic.net`.

## DNS Ownership Notes
- Registrar remains GoDaddy.
- DNS records required by Microsoft 365 are created in Cloudflare once Cloudflare is authoritative.

## Provisioning Checklist
- [ ] Purchase/licensing step completed.
- [ ] Shared mailbox created: `service@robinsonseptic.net`.
- [ ] Alias map configured for dispatch/info/rentals.
- [ ] Delegate membership assigned (owner + dispatch staff).
- [ ] Sent-items copy policy enabled and tested for shared mailbox sends.
- [ ] MX/SPF/DKIM/DMARC records configured in Cloudflare.
- [ ] Autodiscover/tenant verification records configured in Cloudflare.
- [ ] Reply-to contract verified in `.env.main` and docs.

## Owner Approval Checklist
- [ ] Approve mailbox membership roster.
- [ ] Approve alias usage.
- [ ] Approve sent-items visibility expectation.
- [ ] Approve fallback/contingency workflow if mailbox delivery degrades.
