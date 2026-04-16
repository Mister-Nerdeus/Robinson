# Request-Heavy Route Compliance Audit (58-64)

## Contract
All request-heavy routes must use one composition model:
- top support zone
- full-width form zone
- optional post-form zone below form

Contract marker source:
- `data-request-layout-geometry="top-support-then-full-width-form"`
- `data-request-layout-form-width="full-width"`

## Route compliance
| Route | Layout primitive | Top support | Full-width form | Post-form |
| --- | --- | --- | --- | --- |
| `/services/septic-cleaning` | `RequestPageLayout` | yes | yes | none |
| `/services/well-septic-evaluations` | `RequestPageLayout` | yes | yes | none |
| `/services/portable-toilets` | `RequestPageLayout` | yes | yes | none |
| `/services/commercial` | `RequestPageLayout` | yes | yes | none |
| `/contact` | `RequestPageLayout` | yes | yes | `ServiceAreaBlock` |
| `/realtors` | `RequestPageLayout` | yes | yes | none |

## Route-level verification mechanism
- Script: `scripts/verify-request-layout-parity.ps1`
- Verifies per route:
- contract markers are present
- stale right-rail signatures are absent
- `Cache-Control` includes `no-store`
- accepts `-OutputPath` to write JSON proof artifacts
- Local proof artifact:
- `docs/verification/local-request-geometry-full-2026-04-16T20-09-02Z.json`

## Cache/parity root cause and fix
- Root cause observed on previously deployed routes: stale HTML served with legacy cache policy (`s-maxage=31536000`) caused mismatch against current source geometry.
- Fix:
- request-heavy routes now serve `Cache-Control: no-store, max-age=0, must-revalidate` via `next.config.mjs`
- deploy verification now fails when route markers or cache headers are wrong
- parity checks now run at route-level, not just environment-level
