# Homepage Performance Budget

## Purpose
Measure the homepage as the primary conversion surface with a dedicated local audit.

## Audit Command
- `npm run test:homepage-performance-budget`

## Artifact
- `docs/verification/homepage-performance.json`

## Budget Table
| Mode | Viewport | LCP Budget | FCP Budget | TTFB Budget | Latest Measured | Result |
| --- | --- | --- | --- | --- | --- | --- |
| Mobile | `390x844` | `2500ms` | `1800ms` | `1000ms` | `LCP 480ms / FCP 196ms / TTFB 37.7ms` | PASS |
| Desktop | `1440x1400` | `2500ms` | `1800ms` | `1000ms` | `LCP 124ms / FCP 124ms / TTFB 11.4ms` | PASS |

## First-Viewport Conversion Checks
- Hero heading visible in the first viewport
- Hero call CTA visible in the first viewport
- Hero request CTA visible in the first viewport
- Mobile rail visible on mobile and absent on desktop
- Hero CTA stack clears the mobile rail by at least `12px`

## Implementation Notes
- Static hero media remains the governed default.
- Google fonts are loaded through `next/font` to avoid render-blocking `@import` fetches on mobile.
- The audit runs against the local docker-backed homepage, not a public internet dependency.
