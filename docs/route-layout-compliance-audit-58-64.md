# Request/Task Route Layout Compliance Audit

## Contract
All request-heavy routes must use explicit section mode composition:
- support-rail sections for contextual/support content
- full-width sections for active form shell progression
- optional post-form support-rail sections

Contract marker source:
- `data-request-layout-geometry="explicit-section-modes"`
- `data-request-layout-modes="<ordered modes>"`

## Route compliance
| Route | Intro mode | Form mode | Post-form mode |
| --- | --- | --- | --- |
| `/services/septic-cleaning` | support-rail | full-width | support-rail |
| `/services/well-septic-evaluations` | support-rail | full-width | support-rail |
| `/services/portable-toilets` | support-rail | full-width | none |
| `/services/commercial` | support-rail | full-width | none |
| `/contact` | support-rail | full-width | none |
| `/realtors` | support-rail | full-width | support-rail |

## Route-level verification mechanism
- Script: `scripts/verify-request-layout-parity.ps1`
- Verifies per route:
- expected route marker is present
- request-layout routes include explicit mode geometry marker
- stale right-rail signatures are absent
- `Cache-Control` includes `no-store`
- accepts `-OutputPath` to write JSON proof artifacts

## Large-screen evidence gate
- Desktop composition baseline/evidence:
- `docs/screenshots/issues-143-152/`
- JSON audit output:
- `docs/screenshots/issues-143-152/composition-audit.json`
