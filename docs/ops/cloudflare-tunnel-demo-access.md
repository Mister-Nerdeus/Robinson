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
1. Run:
   - `cloudflared tunnel login`
2. Complete browser auth.
3. Verify local credential material exists under:
   - `%USERPROFILE%\\.cloudflared\\`

Do not commit credentials/certs from this folder.

## Create or Attach a Named Tunnel
Option A (create new):
- `cloudflared tunnel create robinson-demo`

Option B (use existing):
- `cloudflared tunnel list`
- Select the named tunnel for this demo host.

Record (operator-private):
- tunnel UUID
- credentials file path

## Publish Hostname -> Local Origin
Use Cloudflare dashboard Zero Trust tunnel route (Published application):
- Hostname/subdomain: `<demo-hostname>`
- Service type: `HTTP`
- URL/origin: `http://localhost:3001`

Do not create any route for `localhost:4001`.

## Config File Pattern (Recommended)
Use repo template:
- `ops/cloudflare/config.template.yml`

Copy template to local, untracked config path (operator machine):
- `%USERPROFILE%\\.cloudflared\\config.yml`

Replace placeholders with real values (UUID, hostname, credentials path).

## Run Tunnel
- `cloudflared tunnel run <tunnel-name-or-id>`

## Windows Service Persistence
Cloudflare recommends service mode for stability.

1. Ensure `%USERPROFILE%\\.cloudflared\\config.yml` exists with valid tunnel settings.
2. Install service:
   - `cloudflared service install`
3. Start/verify service:
   - `sc query cloudflared`

Update note:
- When updating cloudflared binary, restart service after replacement.

## Verification Workflow
1. Local app check: `http://localhost:3001` returns 200.
2. Public hostname check: `https://<demo-hostname>` returns 200.
3. External device/network validation (phone on cellular or off-LAN network).

Use helper script:
- `scripts/windows/cloudflare-tunnel-verify.ps1 -PublicHostname <demo-hostname>`

## Security Boundary
- Public exposure allowed only for app origin (`3001`).
- Mailpit (`4001`) remains local-only.
- No secrets in git.
- No direct host public-IP exposure.

## Operator-Owned Manual Steps
Manual in dashboard/account context:
- Tunnel creation/selection
- Published application route creation
- DNS/hostname selection

Repo-owned artifacts:
- docs/templates/scripts only
