# Railway Domain Topology Contract

## Decision
- Canonical public host: `https://robinsonseptic.net` (apex).
- Non-canonical public host: `https://www.robinsonseptic.net` must redirect to apex.
- Review/develop host: `https://develop.robinsonseptic.net` (non-indexed, review-only surface).

## Topology Diagram
```text
robinsonseptic.net (canonical public host)
  -> Cloudflare DNS (proxied, SSL/TLS Full)
    -> Railway production service

www.robinsonseptic.net (non-canonical)
  -> Cloudflare DNS (proxied)
    -> redirect 301 -> https://robinsonseptic.net

develop.robinsonseptic.net (review)
  -> Cloudflare DNS (proxied or DNS-only per review policy)
    -> Railway develop service/environment
```

## Railway Mapping Contract
- Attach `robinsonseptic.net` to Railway production service/environment.
- Attach `www.robinsonseptic.net` and enforce redirect behavior at app or edge layer.
- Attach `develop.robinsonseptic.net` to Railway develop service/environment.
- Use Railway-provided DNS records exactly; do not invent alternative targets.

## Cloudflare SSL/TLS Contract
- For proxied Railway domains, Cloudflare SSL/TLS mode must be `Full`.
- Keep `Always Use HTTPS` enabled for public hosts.

## Env Alignment Contract
- Production: `SITE_URL=https://robinsonseptic.net`
- Develop: `SITE_URL=https://develop.robinsonseptic.net`
- Notification/sending-domain envs remain `.net` aligned.

## Legacy Handling
- Any `.com` hostnames are `legacy-retired` and cannot be canonical.
