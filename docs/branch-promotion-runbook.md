# Branch Promotion Runbook

## Branch policy
- Day-to-day work happens on `develop`.
- `main` only receives promoted commits from `develop`.

## Promotion flow
1. On `develop`, run validation:
- `npm run verify:v1`
- `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`

2. Deploy develop stack:
- `powershell -ExecutionPolicy Bypass -File scripts/deploy-develop.ps1`

3. Open PR from `develop` to `main` and review proof pack docs.

4. After approval and merge, deploy main stack:
- `powershell -ExecutionPolicy Bypass -File scripts/deploy-main.ps1`

5. Re-run dual-host verification:
- `powershell -ExecutionPolicy Bypass -File scripts/verify-main-develop.ps1`

## Rollback
- Re-deploy previous commit by checking out the target commit on the branch and rerunning the matching deploy script.
- Keep `main` and `develop` stack ports and volumes unchanged during rollback.