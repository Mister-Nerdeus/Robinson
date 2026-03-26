# Test Runbook

## Start stack
- Web only:
  - `powershell -ExecutionPolicy Bypass -File scripts/test-stack-up.ps1`
- Web + API profile:
  - `powershell -ExecutionPolicy Bypass -File scripts/test-stack-up.ps1 -Api`
- Web + API + DB profiles:
  - `powershell -ExecutionPolicy Bypass -File scripts/test-stack-up.ps1 -Api -Db`

## Verify
1. Render final config:
   - `docker compose -f compose.yaml --env-file .env.test -p robinson-test config`
2. Check status and health:
   - `docker compose -f compose.yaml --env-file .env.test -p robinson-test ps`
3. Run smoke checks:
   - `node scripts/test-smoke.mjs`

## Teardown
- If stack was started with profiles, pass the same profile flags on teardown.
- Example (web + api): `powershell -ExecutionPolicy Bypass -File scripts/test-stack-down.ps1 -Api`
- Optional volume cleanup:
  - `powershell -ExecutionPolicy Bypass -File scripts/test-stack-down.ps1 -Api -RemoveVolumes`
