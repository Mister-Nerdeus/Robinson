# Form Field Purpose Map

Every collected field must map to an operational purpose.

- Source of truth: `src/lib/forms/fieldPurposeMap.ts`
- Enforcement: `tests/field-purpose-contract.spec.ts`

## Lane Coverage
- `general`: fallback contact routing, urgency defaults, optional location gating.
- `septic-service`: dispatch triage, tank/access context, warning-sign checklist.
- `evaluation`: transaction role/timeline/access coordination.
- `rental`: unit/duration/service cadence and placement logistics.
- `commercial-service`: facility/service-type routing and operational urgency.
