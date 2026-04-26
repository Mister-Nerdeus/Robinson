# Submission Export Runbook

## Preconditions
- `ENABLE_ADMIN_SUBMISSIONS_REVIEW=true`
- Admin owner/ops token configured
- Operator authenticated (Bearer token or admin session cookie)

## Export JSON
```powershell
curl -H "Authorization: Bearer <owner_or_ops_token>" "http://localhost:4850/api/submissions?export=json"
```

## Export CSV
```powershell
curl -H "Authorization: Bearer <owner_or_ops_token>" "http://localhost:4850/api/submissions?export=csv" -o submissions.csv
```

## Filtered Export
Use supported filters with export:
- `type`
- `status`
- `dateFrom`
- `dateTo`
- `source`

Example:
```powershell
curl -H "Authorization: Bearer <owner_or_ops_token>" "http://localhost:4850/api/submissions?type=rental&dateFrom=2026-04-01&export=csv"
```

## Suppression Workflow
1. Identify submission ID from admin workspace.
2. Execute authenticated suppression request:
```powershell
curl -X DELETE -H "Authorization: Bearer <owner_or_ops_token>" -H "Content-Type: application/json" -d "{\"id\":\"<submission-id>\"}" "http://localhost:4850/api/submissions"
```
3. Confirm `retention.dataState` is `suppressed` in admin review.
