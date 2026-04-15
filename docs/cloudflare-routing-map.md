# Cloudflare Routing Map

## DNS + origin mapping
- `www.robinsonseptic.com`
- Cloudflare record: proxied `A`/`CNAME`
- Origin: host running Docker port `3010`
- Target stack: `robinson-main`

- `develop.robinsonseptic.com`
- Cloudflare record: proxied `A`/`CNAME`
- Origin: host running Docker port `3011`
- Target stack: `robinson-develop`

## Tunnel ingress example
If Cloudflare Tunnel is used instead of direct origin DNS, keep this explicit mapping in `config.yml`:

```yaml
ingress:
  - hostname: www.robinsonseptic.com
    service: http://localhost:3010
  - hostname: develop.robinsonseptic.com
    service: http://localhost:3011
  - service: http_status:404
```

## Reproducible verification
- Resolve and HTTP check both hosts:
- `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1`

- Manual spot checks:
- `curl -I https://www.robinsonseptic.com`
- `curl -I https://develop.robinsonseptic.com`

## Change control
- Do not point both hostnames to one port.
- Do not reuse one stack volume for both branches.
- Any Cloudflare route change must preserve the one-hostname-per-branch contract in `docs/branch-deploy-contract.md`.