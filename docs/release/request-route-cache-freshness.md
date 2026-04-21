# Request Route Cache Freshness And Parity Gate

## Scope
- `/contact`
- `/realtors`
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`

## Freshness Policy
- Request routes must return `Cache-Control: no-store, max-age=0, must-revalidate`.
- Release parity must be tied to a deploy manifest generated during the same CI run.
- Manifest age older than 180 minutes fails parity verification.

## CI Evidence
- `artifacts/deploy-manifest.json`
  - Runtime mode, branch, ref, commit, build timestamp
  - Request layout contract version
  - Request routes under parity gate
- `artifacts/request-route-parity.json`
  - Per-route status and cache headers
  - Marker checks for task/request layout contracts
  - Manifest reference proving build-to-route traceability
