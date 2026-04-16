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
- Current expected value: `form-first-full-width-v2`

## Production proof (`robinson.hearthcore.app`)
- Must return:
- `mode=production`
- `branchIntent=main`
- `seoAllowIndexing=true`
- `requestLayoutContractVersion=form-first-full-width-v2`
- Must not expose debug provenance fields beyond safe runtime identity payload.

## Develop proof (`robinson-demo.hearthcore.app`)
- Must return:
- `mode=demo`
- `branchIntent=develop`
- `seoAllowIndexing=false`
- `requestLayoutContractVersion=form-first-full-width-v2`
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
- `data-request-layout-contract=form-first-full-width-v2`
- `data-request-layout-route=<route>`
- `data-request-layout-geometry=top-support-then-full-width-form`
- `data-request-layout-zone=full-width-form`
- Legacy right-rail signatures must not be present in route HTML.

## Verification
- `scripts/verify-host-routing.ps1`
- `scripts/verify-main-develop.ps1`
- `scripts/verify-request-layout-parity.ps1`
