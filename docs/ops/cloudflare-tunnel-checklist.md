# Cloudflare Tunnel Demo Checklist

## Local Origin
- [x] Docker app responds at `http://localhost:3001`
- [x] Mailpit responds locally at `http://localhost:4001` (awareness only)

## Tunnel Setup
- [x] `cloudflared` installed and version confirmed
- [ ] `cloudflared tunnel login` completed (token/API path used in this run)
- [x] Named tunnel created (`robinson-demo`)
- [x] Tunnel ingress configured for app hostname only

## Published Route
- [x] Public hostname mapped to `http://localhost:3001`
- [x] No route created for `localhost:4001`

## Service Persistence (Windows)
- [ ] `cloudflared service install` completed (blocked by non-elevated SCM access)
- [ ] Windows service running

## Verification
- [x] Local origin check passed
- [x] Public hostname check passed
- [~] External device/network check passed (external network probe yes; phone/tablet capture pending)
- [x] Proof template updated (`docs/verification/cloudflare-tunnel-demo-proof.md`)

## Security
- [x] No secrets committed
- [x] No inbound router/NAT changes made
