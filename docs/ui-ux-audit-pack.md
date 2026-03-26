# UI/UX Audit Pack (Desktop + Mobile)

## Screenshot Index
### Desktop (1440w)
- `docs/screenshots/home-desktop-1440.png`
- `docs/screenshots/services-desktop-1440.png`
- `docs/screenshots/septic-cleaning-desktop-1440.png`
- `docs/screenshots/evaluations-desktop-1440.png`
- `docs/screenshots/realtors-desktop-1440.png`
- `docs/screenshots/portable-toilets-desktop-1440.png`
- `docs/screenshots/contact-desktop-1440.png`

### Mobile (390w)
- `docs/screenshots/home-mobile-390.png`
- `docs/screenshots/services-mobile-390.png`
- `docs/screenshots/septic-cleaning-mobile-390.png`
- `docs/screenshots/evaluations-mobile-390.png`
- `docs/screenshots/realtors-mobile-390.png`
- `docs/screenshots/portable-toilets-mobile-390.png`
- `docs/screenshots/contact-mobile-390.png`

### Mobile header/action-rail checks
- `docs/screenshots/home-mobile-360.png`
- `docs/screenshots/home-mobile-390.png`
- `docs/screenshots/home-mobile-430.png`

## Route-by-Route Findings
- Home: primary emergency call CTA is immediate; Realtor and request actions appear in first viewport.
- Services index: each service card has clear route-level direction; no dead-end content blocks.
- Septic cleaning: urgent reason-to-call content + request form visible without deep scroll.
- Evaluations: transaction urgency and Realtor workflow are clear above form.
- Realtors: value proposition for deadline-sensitive coordination appears before form.
- Portable toilets: rental logistics and request path are explicit.
- Contact: emergency call framing appears first, then general request and service area context.

## Pass/Fail Matrix
| Check | Result | Notes |
| --- | --- | --- |
| Every primary route has fresh desktop screenshot | PASS | Captured 7/7 primary routes |
| Every primary route has fresh mobile screenshot | PASS | Captured 7/7 primary routes |
| Mobile header visible at 360/390/430 widths | PASS | Brand + menu + sticky actions visible |
| Primary CTA visible in first viewport on home mobile | PASS | `Call Now` and request CTA present near top |
| Realtor lane visibly prioritized | PASS | Present in hero CTA set and dedicated homepage section |
| Service pages have route-specific first CTA | PASS | Each route contains explicit request action/form |
| Obvious CTA hierarchy regressions detected | PASS | No blocked conversion flows observed |

## File Manifest
- `scripts/capture-screenshots.mjs` (updated capture workflow)
- `docs/screenshots/*.png` (fresh artifacts)
- `docs/issue-closeout-ux-conversion.md` (cross-issue closeout)
