# Cloudflare Tunnel Demo Proof Template

Date:
Operator:
Public Hostname:
Tunnel Name:

## 1) Local Origin Check
Command:
- `powershell -ExecutionPolicy Bypass -File scripts/windows/cloudflare-tunnel-verify.ps1 -PublicHostname <hostname>`

Evidence:
- Local app URL checked: `http://localhost:3001`
- Result (pass/fail):
- Status code:
- Output snippet:

## 2) Public Hostname Check
Evidence:
- Public URL checked: `https://<hostname>`
- Result (pass/fail):
- Status code:
- Output snippet:
- Screenshot/text capture path:

## 3) External Device / Network Validation (Required)
Device/network used (example: phone on LTE, tablet on guest Wi-Fi):
Timestamp:
Result (pass/fail):
Evidence (screenshot or text capture):

## 4) Route Configuration Evidence
Manual dashboard proof captured:
- Screenshot path / note showing hostname -> `http://localhost:3001`

## 5) Security Boundary Confirmation
- [ ] Only app origin (`localhost:3001`) is publicly routed
- [ ] Mailpit (`localhost:4001`) not published
- [ ] No secrets committed to repo
- [ ] No inbound router/NAT exposure introduced

## 6) Secrets Kept Out of Repo
List of operator-managed values supplied locally only:
- tunnel UUID
- credentials file path
- API token (if used)
- account/zone identifiers
- demo hostname

## 7) Gate Results
- Gate 1 (Local Origin): PASS/FAIL
- Gate 2 (Published Route Docs): PASS/FAIL
- Gate 3 (Multi-service Template): PASS/FAIL
- Gate 4 (Windows Persistence): PASS/FAIL
- Gate 5 (Security Boundary): PASS/FAIL
- Gate 6 (Operator Usability): PASS/FAIL
- Gate 7 (External Device): PASS/FAIL

Final status: PASS/FAIL
