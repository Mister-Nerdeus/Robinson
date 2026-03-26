# Cloudflare Tunnel Service Notes (Windows)

## Default Config Path
`cloudflared` service mode expects config in:
- `%USERPROFILE%\\.cloudflared\\config.yml`

## Minimum Config Fields
- `tunnel`
- `credentials-file`
- `ingress` rules with at least one hostname route and final `http_status:404`

## Service Commands
- Install: `cloudflared service install`
- Check: `sc query cloudflared`
- Restart (after binary/config update):
  - `sc stop cloudflared`
  - `sc start cloudflared`

## Safety
- Keep real config/credentials local-only.
- Never store tokens or credentials in tracked repo files.
