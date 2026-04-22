# Runtime Host Proof Contract

## Goal
Each hostname must deterministically prove branch/runtime identity.

## Proof endpoint
- `GET /api/runtime-proof`

## Request-layout contract proof
- Runtime proof payload must include:
- `requestLayoutContractVersion`
- `requestLayoutContractVersionExpected`
- `requestLayoutRoutes`
- Current expected value: `request-desktop-modes-v4`

## Production proof (`robinson.hearthcore.app`)
- Must return:
- `mode=production`
- `branchIntent=main`
- `seoAllowIndexing=true`
- `requestLayoutContractVersion=request-desktop-modes-v4`
- Must not expose debug provenance fields beyond safe runtime identity payload.

## Develop proof (`robinson-demo.hearthcore.app`)
- Must return:
- `mode=demo`
- `branchIntent=develop`
- `seoAllowIndexing=false`
- `requestLayoutContractVersion=request-desktop-modes-v4`
- Nonblank deployment provenance:
- `deploymentProvenance.commitSha`
- `deploymentProvenance.ref`
- `deploymentProvenance.buildTimestampUtc`

## Route-level parity proof
- Route geometry must be verified after deploy for:
- `/services/septic-cleaning`
- `/services/well-septic-evaluations`
- `/services/portable-toilets`
- `/services/commercial`
- `/contact`
- `/realtors`
- Required markers per route:
- `data-request-layout-contract=request-desktop-modes-v4`
- `data-request-layout-route=<route>`
- `data-request-layout-geometry=explicit-section-modes`
- `data-request-layout-modes=<ordered modes>`
- Legacy right-rail signatures must not be present in route HTML.

## Verification
- `scripts/verify-host-routing.ps1`
- `scripts/verify-main-develop.ps1`
- `scripts/verify-request-layout-parity.ps1`
