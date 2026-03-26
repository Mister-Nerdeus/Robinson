# Design System (Shared Shell)

## Core Primitives
- `Header` with click-to-call CTA.
- `Footer` consuming canonical company config.
- `Section` container/spacing primitive.
- `Hero` lead-entry block.
- `ServiceCard` route lane card.
- `TrustBand` trust-proof block.
- `CtaBand` conversion follow-through block.

## Layout Standards
- Mobile-first spacing with section padding helper.
- Reusable container width rule.
- Typography split: display (`Archivo Black`), body (`Source Sans 3`).
- Brand color variables in `globals.css`.

## Reuse Rule
New routes should be assembled from shared primitives before introducing bespoke layout components.
