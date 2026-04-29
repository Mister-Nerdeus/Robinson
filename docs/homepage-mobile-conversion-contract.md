# Homepage Mobile Conversion Contract

## Purpose
Prove that sticky header, mobile action rail, in-page hero CTA, and final CTA work together on the homepage without obstruction or crowding.

## Audit Command
- `npm run test:homepage-mobile-conversion-contract`

## Artifact
- `docs/verification/homepage-mobile-conversion.json`

## Required Screenshot Proof
- `docs/screenshots/home-mobile-first-viewport-390.png`
- `docs/screenshots/home-mobile-midpage-390.png`
- `docs/screenshots/home-mobile-final-cta-390.png`

## Current State Coverage
| State | Required Proof | Result |
| --- | --- | --- |
| First viewport | Sticky header visible, rail visible, hero call visible, hero request visible, no visible header CTA competition | PASS |
| Mid-page chooser/trust state | Sticky header visible, rail visible, chooser visible, trust visible, no visible header CTA competition | PASS |
| Final CTA state | Sticky header visible, rail visible, final CTA visible, final button visible, final CTA clears rail by `12px+` | PASS |

## Safe-Area Contract
- Shared body padding stays on `body.site-shell`.
- Mobile rail height stays governed by `--mobile-action-rail-height`.
- Bottom safe-area padding stays governed by `env(safe-area-inset-bottom)`.
