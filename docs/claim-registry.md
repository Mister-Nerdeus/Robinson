# Claim Registry

| id | class | label | status | evidence_ref | owner_approval_ref | publish_policy |
| --- | --- | --- | --- | --- | --- | --- |
| family-owned-1979 | heritage | Family owned and operated since 1979 | approved | legacy-brand-pack | owner-truth-dashboard:heritage | public |
| emergency-call-first-24-7 | emergency | 24/7 emergency septic response is call-first | approved | dispatch-policy-call-first | owner-truth-dashboard:emergency | public |
| service-lane-coverage | service-area | Residential, evaluation, rental, and commercial lanes route to one dispatch operation | approved | service-lane-contract | owner-truth-dashboard:lane-coverage | public |
| realtor-evaluation-support | service-area | Realtor and home-sale evaluation workflow support | approved | legacy-realtor-materials | owner-truth-dashboard:realtor | public |
| msta-membership-wording | association | Member of the Michigan Septic Tank Association | owner-review-required | legacy-association-assets | pending-owner-approval | internal-until-approved |
| bbb-accreditation-language | bbb | BBB accreditation claim | retired-internal-only | claim-registry:bbb-blocked | blocked | blocked |
| inflated-review-footprint | reviews | Large review-count claims | retired-internal-only | claim-registry:review-footprint-blocked | blocked | blocked |

## Status meanings
- `approved`: evidence-linked and owner-approved for customer-facing copy.
- `owner-review-required`: evidence exists but owner approval is not complete.
- `retired-internal-only`: ambiguous or unsupported claim; blocked from public surfaces.

## Governance Rules
- Every public trust claim must include `evidence_ref` and `owner_approval_ref`.
- `bbb`, `reviews`, and ambiguous emergency variants remain blocked unless explicitly approved.
- Legacy claims may remain as internal notes but must not render on public pages.
