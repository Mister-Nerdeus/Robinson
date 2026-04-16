# Request Route Compliance Audit 77-82

## Contract
All request-heavy routes must compose as:
- top support region
- full-width form region
- optional post-form region below form

Implementation primitive:
- `src/components/site/RequestPageLayout.tsx`

## Route matrix
| Route | Uses `RequestPageLayout` | Top Support | Full-width Form | Post-form |
| --- | --- | --- | --- | --- |
| `/services/septic-cleaning` | yes | yes | yes | none |
| `/services/well-septic-evaluations` | yes | yes | yes | none |
| `/services/portable-toilets` | yes | yes | yes | none |
| `/services/commercial` | yes | yes | yes | none |
| `/contact` | yes | yes | yes | `ServiceAreaBlock` below form |

## Source compliance checks
- `tests/request-layout-contract.spec.ts` enforces route-level use of `RequestPageLayout` + explicit `routeId`.
- `scripts/verify-request-layout-parity.ps1` and `scripts/verify-live-render-parity.ps1` enforce rendered markers.

## Rendered parity notes
- Contact and septic are explicitly verified via route markers and stale-signature rejection.
- No request-heavy route may pass parity checks if legacy right-rail signatures are detected.
