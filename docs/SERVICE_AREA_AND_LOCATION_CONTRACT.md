# SERVICE_AREA_AND_LOCATION_CONTRACT

## Canonical Modules
- `src/content/serviceAreas.ts`
- `src/content/locations.ts`

## Rules
- All county/city coverage text must resolve from `serviceAreaContract`.
- All location cards must resolve from `publicLocations`.
- Every location entry requires: `status`, `publicFacing`, `mapEligible`, `notes`.
- Non-public or legacy-only locations must not render as active office locations.

## Current Published Location
- Pierson Office (`published`, `publicFacing=true`, `mapEligible=true`)

## Legacy Reference
- Sparta listing retained as `legacy-reference`, not publicly routed as active office.
