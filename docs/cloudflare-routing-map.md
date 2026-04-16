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
- Route-level request-layout parity:
- `powershell -ExecutionPolicy Bypass -File scripts/verify-request-layout-parity.ps1 -TargetHost https://robinson.hearthcore.app`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-request-layout-parity.ps1 -TargetHost https://robinson-demo.hearthcore.app`

- Manual spot checks:
- `curl -I https://robinson.hearthcore.app`
- `curl -I https://robinson-demo.hearthcore.app`

## Change control
- Do not point both hostnames to one port.
- Do not reuse one stack volume for both branches.
- Any Cloudflare route change must preserve the one-hostname-per-branch contract in `docs/branch-deploy-contract.md`.
- Preserve origin `Cache-Control: no-store, max-age=0, must-revalidate` on request-heavy routes:
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/contact`
- `/realtors`
- Do not add Cloudflare cache rules that force cached HTML on the request-heavy routes above.
