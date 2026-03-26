# Cloudflare Tunnel Demo Proof

Date: 2026-03-26
Operator: Codex + local operator token
Public Hostname: robinson-demo.hearthcore.app
Tunnel Name: robinson-demo
Tunnel ID: 7ceb48b6-2820-4be7-8b2f-1cff79ca93b6

## 1) Local Origin Check
Command:
- `Invoke-WebRequest http://localhost:3001`

Result:
- Status: 200
- PASS

## 2) Public Hostname Check
Command:
- `Invoke-WebRequest https://robinson-demo.hearthcore.app`

Result:
- Status: 200
- PASS

## 3) Tunnel Runtime Check
Evidence:
- Tunnel created via Cloudflare API.
- DNS CNAME created: `robinson-demo.hearthcore.app` -> `7ceb48b6-2820-4be7-8b2f-1cff79ca93b6.cfargotunnel.com`.
- Tunnel config applied (ingress only for app hostname -> `http://localhost:3001`).
- `cloudflared` runtime log shows registered connections and active config.

## 4) Windows Service Persistence Check
Command:
- `cloudflared service install <tunnel-token>`
- `sc query cloudflared`

Result:
- FAILED due local privilege boundary: `Access is denied` (SCM)
- Service not installed in this run context.
- Gate marked PARTIAL/FAIL until operator runs elevated install.

## 5) External Network Validation
Evidence:
- External network probe (non-local context) successfully loaded:
  - `https://robinson-demo.hearthcore.app` -> HTTP 200
- Note: phone/tablet screenshot still recommended for strict human-device evidence.

## 6) Security Boundary Confirmation
- App hostname only exposed publicly in tunnel ingress.
- Mailpit (localhost:4001) not configured as tunnel ingress.
- No tunnel secrets committed to repo files.
- No router/NAT inbound exposure introduced.

## 7) Gate Status
- Gate 1 (Local Origin): PASS
- Gate 2 (Live Public Route): PASS
- Gate 3 (Multi-Service Template): PASS
- Gate 4 (Windows Persistence): FAIL (requires elevated service install)
- Gate 5 (Security Boundary): PASS
- Gate 6 (Operator Usability): PASS (flow executed with documented steps)
- Gate 7 (External Device/Network): PARTIAL (external network proof yes, dedicated device capture pending)

Final recommendation:
- Close as PARTIAL until Gate 4 and strict Gate 7 phone/device evidence are completed by an elevated operator run.
