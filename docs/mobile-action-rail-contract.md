# Mobile Action-Rail Contract

## Contract Scope
- Fixed mobile bottom action rail remains visible on public routes.
- Rail must not obscure primary bottom-of-page controls.
- Safe-area spacing must be tokenized and shared, not route-specific hacks.

## Core Route Coverage
- Homepage: `/`
- Contact: `/contact`
- Core service route: `/services/septic-cleaning`
- Non-form public route: `/faq`

## Safe-Area Implementation
- Shared layout token: `--mobile-action-rail-height` in `src/app/globals.css`
- Shared body contract: `body.site-shell` padding includes `env(safe-area-inset-bottom)`
- Rail container includes safe-area padding and marker:
- `data-mobile-action-rail="global-v1"`

## Proof and Artifact
- Capture script: `scripts/capture-mobile-action-rail-proof.mjs`
- Artifact: `docs/verification/mobile-action-rail-contract.json`
- Required screenshots:
- `docs/screenshots/mobile-action-rail-home-390.png`
- `docs/screenshots/mobile-action-rail-contact-390.png`
- `docs/screenshots/mobile-action-rail-service-390.png`

## Executable Gate
- `npm run test:mobile-action-rail-contract`
