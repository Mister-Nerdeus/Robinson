# Owner-Facing Business Truth Dashboard

## Status Legend
- `verified`: owner-confirmed and publishable.
- `pending-verification`: unresolved; do not expand public usage.
- `blocked`: conflicting evidence; must be resolved before publish.

## Truth Dashboard Table
| Fact Domain | Current Public Value | Status | Source | Next Owner Action |
| --- | --- | --- | --- | --- |
| Public name | Robinson Septic Cleaning | verified | Canonical business facts module | Reconfirm quarterly. |
| Legal name | Robinson Septic Tank Cleaning LLC | verified | Canonical business facts module | Reconfirm annually. |
| Primary phone | (616) 636-5565 | verified | Phone semantics map | Keep as dominant line across routes. |
| Backup phone | (616) 887-2060 | verified | Phone semantics map | Keep clearly labeled as secondary office line. |
| Active address | 1565 N Dagget Rd, Pierson, MI 49339 | verified | Canonical business facts module | Reconfirm with owner when listings change. |
| Service area | West Michigan core footprint around Pierson/Sparta/Cedar Springs/Sand Lake/Trufant/Coral/Howard City/Grand Rapids | verified | Service-area contract | Reconfirm each season if coverage shifts. |
| Emergency wording | 24/7 emergency septic service is call-first | verified | Dispatch policy + route copy | Reconfirm if after-hours policy changes. |
| Active services | Septic, evaluations, rentals, commercial support | verified | Service templates + lane router | Reconfirm when lane catalog changes. |
| Legacy Sparta address variant | 113 South Union, Sparta, MI 49345 | pending-verification | Legacy source pack | Decide publish/remove status before any reuse. |
| Legacy secondary number variant | (231) 937-8282 | pending-verification | Legacy source pack | Verify ownership or keep non-public. |

## Owner Action Checklist
- [ ] Resolve all `pending-verification` facts before public expansion.
- [ ] Approve or retire each legacy variant explicitly.
- [ ] Confirm phone-role hierarchy before each release affecting header/footer/contact copy.
- [ ] Sign off on emergency wording when dispatch policy changes.

## Process Hook
PR and release reviews must reference this dashboard before adding or changing public business facts.
