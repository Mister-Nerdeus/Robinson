# Homepage Live Parity Contract

## Purpose
Keep the deployed demo homepage aligned with the current develop homepage contract, not just reachable.

## Contract Markers
| Marker | Expected Value |
| --- | --- |
| Hero heading | `Need septic service now or want to schedule ahead?` |
| Chooser heading | `Choose your service` |
| Trust band title | `Why West Michigan trusts Robinson` |
| Realtor band title | `Selling a home? Keep evaluations on schedule` |
| Final CTA heading | `Need septic help now? Call for emergencies or request routine service.` |
| Footer compactness marker | `data-footer-surface="compact-contact-v1"` |

## Drift Signals
The parity gate fails when the live homepage exposes older homepage copy such as:

- `Choose your task lane`
- `Open All Request Lanes`
- `Built on proven local trust`
- `Route links (secondary)`
- `Website coupon`
- `Facebook and local visibility`
- Generic `Learn more` chooser CTAs

## Proof Command
- `npm run test:homepage-live-parity-contract`

## Artifact Outputs
- `docs/verification/homepage-live-parity.json`
- `docs/screenshots/home-live-parity-develop-1440.png`
- `docs/screenshots/home-live-parity-demo-1440.png`

## Current Result
- Develop parity: PASS
- Demo parity: PASS
- Develop vs demo homepage contract parity: PASS
