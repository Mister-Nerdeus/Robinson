# Territory Routing Contract

## Purpose
Define explainable internal routing assignments for every submission lane without changing public-facing location truth.

## Public vs Internal Truth
- Public contact/address truth remains canonical in `src/config/company.ts` and content contracts.
- Internal routing metadata (`territoryId`, `officeId`) is operational-only and not public marketing content.
- Retired or legacy addresses are not emitted by routing rules.

## Routing Model
Hybrid rules:
1. Geography resolution by city/ZIP prefix:
   - `montcalm-core`: Pierson, Howard City, Coral, Trufant
   - `kent-core`: Sparta, Cedar Springs, Sand Lake, Grand Rapids
   - fallback: `west-michigan-fallback`
2. Lane-to-office assignment:
   - `general` -> `intake-desk`
   - `septic-service` -> `septic-dispatch`
   - `evaluation` -> `evaluation-desk`
   - `rental` -> `rental-desk`
   - `commercial-service` -> `commercial-desk`

Routing rule version: `territory-v1-city-zip-plus-lane`.

## Submission Metadata
Every created submission now includes:
- `routing.territoryId`
- `routing.territoryLabel`
- `routing.officeId`
- `routing.officeLabel`
- `routing.routingRule`

## Admin Review
Routing assignment is visible in admin submission rows under `Routing:` metadata.

## Example Routing Table
| Lane | City | ZIP | Territory | Office |
|---|---|---|---|---|
| septic-service | Pierson | 49339 | montcalm-core | septic-dispatch |
| rental | Grand Rapids | 49503 | kent-core | rental-desk |
| general | unknown | 00000 | west-michigan-fallback | intake-desk |
