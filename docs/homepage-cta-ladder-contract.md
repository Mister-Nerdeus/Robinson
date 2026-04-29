# Homepage CTA Ladder Contract

## Purpose
Give every homepage CTA a fixed revenue and urgency role so later edits do not flatten everything into generic request buttons.

## CTA Ladder
| Priority | CTA Family | Homepage Surfaces |
| --- | --- | --- |
| 1 | Emergency call | Header call, hero call, mobile rail call |
| 2 | Global request | Header request, hero request, mobile rail request, final CTA button |
| 3 | Route-specific action | Emergency septic, routine pumping, evaluation, rental, commercial chooser cards |
| 4 | Premium Realtor lane | Realtor band CTA |

## Allowed Label Families
- Global emergency call: `Call Emergency Dispatch`
- Global request: `Request Service`
- Route-specific labels: `Call Emergency Service`, `Schedule Pumping`, `Request Evaluation`, `Request Rentals`, `Get Commercial Help`
- Premium Realtor label: `Plan a Home-Sale Evaluation`

## Blocked Generic Labels
- `Learn More`
- `Contact Us`
- `Click Here`

## Executable Gate
- `npm run test:homepage-cta-ladder-contract`
