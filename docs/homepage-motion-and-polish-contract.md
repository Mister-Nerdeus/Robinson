# Homepage Motion and Polish Contract

## Goal
Keep sticky navigation while removing blur bleed-through and tightening visual rhythm.

## Implementation
- Header: `src/components/site/Header.tsx`
- Global tokens/spacing: `src/app/globals.css`
- Service card typography: `src/components/site/ServiceCard.tsx`
- Trust section styling: `src/components/site/TrustBand.tsx`
- FAQ spacing/scale: `src/components/home/FaqPreview.tsx`

## Rules
- Sticky header remains enabled (`position: sticky`).
- Header background must be opaque enough to prevent content blur interference.
- Service card headings use tighter scale and spacing than previous oversized state.
- Trust and FAQ sections keep consistent card rhythm across desktop and mobile.