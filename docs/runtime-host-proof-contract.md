# Runtime Host Proof Contract

## Goal
Each hostname must deterministically prove branch/runtime identity.

## Proof endpoint
- `GET /api/runtime-proof`

## Production proof (`robinson.hearthcore.app`)
- Must return:
- `mode=production`
- `branchIntent=main`
- `seoAllowIndexing=true`
- Must not expose debug provenance fields beyond safe runtime identity payload.

## Develop proof (`robinson-demo.hearthcore.app`)
- Must return:
- `mode=demo`
- `branchIntent=develop`
- `seoAllowIndexing=false`
- Nonblank deployment provenance:
- `deploymentProvenance.commitSha`
- `deploymentProvenance.ref`
- `deploymentProvenance.buildTimestampUtc`

## Verification
- `scripts/verify-host-routing.ps1`
- `scripts/verify-main-develop.ps1`