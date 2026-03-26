# Cloudflare Tunnel Demo Access Runbook (Windows)

## Scope
This runbook exposes only the Docker app at `http://localhost:3001` through Cloudflare Tunnel for demo/public-preview use.

Out of scope:
- Mailpit (`http://localhost:4001`)
- Admin/dev tools
- Production hardening

## Architecture Boundary
Public hostname -> Cloudflare Tunnel -> `cloudflared` on Windows host -> `http://localhost:3001`

No inbound router/NAT port forwarding is required. The connector uses outbound-only connections.

## Prerequisites
- Local app running and reachable: `http://localhost:3001`
- Cloudflare zone you control
- `cloudflared` installed on Windows
- Operator Cloudflare credentials (not in repo)

## Install cloudflared (Windows)
1. Download the Windows binary from Cloudflare's official downloads page.
2. Place it in a stable path (example: `C:\Program Files\cloudflared\cloudflared.exe`).
3. Confirm install:
   - `cloudflared --version`

## Authenticate (Operator-Managed)
Preferred:
- `cloudflared tunnel login`

Alternative (used in this execution):
- Scoped API token for tunnel + DNS operations

## Create or Attach a Named Tunnel
Option A (create new):
- `cloudflared tunnel create robinson-demo`

Option B (API path):
- Create tunnel via API and capture tunnel ID/token.

## Publish Hostname -> Local Origin
- Hostname/subdomain: `<demo-hostname>`
- Service type: `HTTP`
- URL/origin: `http://localhost:3001`

Do not create any route for `localhost:4001`.

## Config File Pattern (Recommended)
Use repo template:
- `ops/cloudflare/config.template.yml`

Copy template to local, untracked config path:
- `%USERPROFILE%\\.cloudflared\\config.yml`

## Run Tunnel
- `cloudflared tunnel run <tunnel-name-or-id>`
or
- `cloudflared tunnel run --token <tunnel-token>`

## Windows Service Persistence
Cloudflare recommends service mode for stability.

1. Ensure valid config at `%USERPROFILE%\\.cloudflared\\config.yml`.
2. Install service:
   - `cloudflared service install`
3. Verify:
   - `sc query cloudflared`

If SCM access is denied, rerun from elevated Administrator session.

## Verification Workflow
1. Local app check: `http://localhost:3001` returns 200.
2. Public hostname check: `https://<demo-hostname>` returns 200.
3. External device/network validation (phone on cellular or off-LAN network).

Helper:
- `scripts/windows/cloudflare-tunnel-verify.ps1`

## Security Boundary
- Public exposure allowed only for app origin (`3001`).
- Mailpit (`4001`) remains local-only.
- No secrets in git.
- No direct host public-IP exposure.

## Runtime Notes from Execution
- Live hostname configured: `robinson-demo.hearthcore.app`
- Tunnel runtime succeeded with active connections.
- Service install failed in non-elevated context (`Access is denied`), requiring elevated operator step.
