# Cloudflare Routing Map

## DNS + origin mapping
- `robinson.hearthcore.app`
- Cloudflare record: proxied `A`/`CNAME`
- Origin: host running Docker port `3010`
- Target stack: `robinson-main`

- `robinson-demo.hearthcore.app`
- Cloudflare record: proxied `A`/`CNAME`
- Origin: host running Docker port `3011`
- Target stack: `robinson-develop`

## Tunnel ingress example
If Cloudflare Tunnel is used instead of direct origin DNS, keep this explicit mapping in `config.yml`:

```yaml
ingress:
  - hostname: robinson.hearthcore.app
    service: http://localhost:3010
  - hostname: robinson-demo.hearthcore.app
    service: http://localhost:3011
  - service: http_status:404
```

## Reproducible verification
- Resolve and HTTP check both hosts:
- `powershell -ExecutionPolicy Bypass -File scripts/verify-host-routing.ps1 -MainHost https://robinson.hearthcore.app -DevelopHost https://robinson-demo.hearthcore.app`

- Manual spot checks:
- `curl -I https://robinson.hearthcore.app`
- `curl -I https://robinson-demo.hearthcore.app`

## Change control
- Do not point both hostnames to one port.
- Do not reuse one stack volume for both branches.
- Any Cloudflare route change must preserve the one-hostname-per-branch contract in `docs/branch-deploy-contract.md`.