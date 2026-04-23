# Lead Lifecycle Contract

## Lifecycle States
Canonical lifecycle values:
- `new`
- `contacted`
- `in-progress`
- `scheduled`
- `completed`
- `lost`
- `closed` (legacy-compatible terminal)

## Attribution Fields
Persisted on every submission:
- `serviceLane`
- `attributionSource`
- `attributionPath`
- `attributionReferrer`
- `correlationId`

## Admin Operations
Owner/ops can update lifecycle state and internal note from the admin table without editing raw JSON.

## Reporting
Admin workspace exports remain available and now include grouping by lane + lifecycle + attribution source.
