# MAP_AND_DIRECTIONS_POLICY

## Source of Truth
- `src/content/locations.ts`

## Rules
- Directions links render only when `mapEligible=true` and `publicFacing=true`.
- Legacy or non-public locations may be retained in content but must not show map links.
