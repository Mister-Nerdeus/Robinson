# Hero Media Contract

## Decision Record
- Decision: static hero image (no slideshow shipped).
- Date: 2026-04-27.
- Reason: preserves first-viewport stability, avoids unnecessary motion, and keeps conversion focus on emergency/request CTAs.

## Rules
- Headline and CTA positions remain stable.
- Mobile remains static.
- Reduced-motion users receive no autoplay motion.
- No carousel chrome (dots/arrows) is shipped by default.
- Hero media must use approved/source-backed assets only.

## Current Asset
- `/images/enhanced/truck_full_ai_enhanced.jpg`
- Used as the default SSR-safe hero image on homepage.

## Source Files
- `src/app/page.tsx`
- `src/components/home/HeroMedia.tsx`
- `src/content/home.ts`
