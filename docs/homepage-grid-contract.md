# Homepage Grid Contract

## Goal
Keep the homepage service chooser calm, readable, and conversion-focused.

## Breakpoint Strategy
- Base: single-column stack.
- `md`: 2-column grid.
- `xl`: 3-column grid.
- Emergency card spans 2 columns at `md` and `xl`.

## Card Rules
- Emergency card remains the most prominent card.
- Cards keep disciplined height (`min-h`) to reduce ragged visual rhythm.
- CTA buttons remain visible and readable without truncation.
- Card copy remains concise and customer-facing.

## Source Files
- `src/components/home/LaneGrid.tsx`
- `src/components/home/LaneTaskCard.tsx`
- `src/content/home.ts`
