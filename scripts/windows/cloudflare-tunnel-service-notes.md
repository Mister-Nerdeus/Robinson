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

## Repo Helper
- Permanent install helper: `scripts/windows/install-cloudflare-tunnel-service.ps1`
- Run from elevated Administrator PowerShell:
  - `powershell -ExecutionPolicy Bypass -File scripts/windows/install-cloudflare-tunnel-service.ps1`

## If Service Install Is Blocked
- Non-elevated shells often fail with `Access is denied` from SCM.
- Use `scripts/windows/recover-cloudflare-tunnel.ps1` as an immediate user-mode fallback to recover `Error 1033`.

## Safety
- Keep real config/credentials local-only.
- Never store tokens or credentials in tracked repo files.
