# Submission Contract

## Canonical Lanes
- `general`
- `septic-service`
- `evaluation`
- `rental`
- `commercial-service`

## Shared Required Fields
- `fullName`
- `phone`
- `email`
- `address`
- `urgency`
- `message`

Optional shared field: `preferredDate`.

## Lane Fields

| type | lane-specific required fields |
| --- | --- |
| `general` | `topic` |
| `septic-service` | `tankSizeGallons`, `tankCount`, `lidsExposed`, `backupSigns` |
| `evaluation` | `roleInSale`, `occupancyStatus` (+ optional `brokerageOrCompany`, `closingDate`) |
| `rental` | `eventType`, `unitCount`, `rentalDuration`, `serviceFrequency`, `siteType` |
| `commercial-service` | `facilityName`, `facilityType`, `serviceNeeded`, `greaseTrapCount`, `onSiteContact` |

## Lockstep Rule
Every rendered field must be present in all three places:
1. schema validation (`src/lib/forms/schema.ts`)
2. persisted record (`src/lib/forms/types.ts` / storage)
3. notification output (`src/lib/notifications/send.ts`)

## Drift Guard Tests
- `tests/submission-contract.spec.ts`: verifies all lanes preserve fields end-to-end.
- `tests/commercial-submission.spec.ts`: commercial regression for facility field persistence + notification rendering.
- `tests/submission-persistence-contract.spec.ts`: canonical SQLite persistence and attribution/correlation durability.
