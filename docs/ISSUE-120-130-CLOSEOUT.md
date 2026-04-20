# Issue Batch 120-130 Closeout

## Scope
- `#120` Task page layout primitive and contact/realtor/rental adoption
- `#121` Wizard container primitive for contained single-step rendering
- `#122` Scroll anchoring + focus management after lane selection
- `#123` Sticky mobile wizard actions
- `#124` Desktop grid utilization for contact
- `#125` Marketing/task max-width token split
- `#126` Reduced vertical preamble above lane selection
- `#127` Shared `useWizard()` progression logic
- `#128` Step transition animation + persistent step state clarity
- `#129` Desktop form pairing for key field groups
- `#130` Removed duplicated service-area block from contact body

## Before/After Screens
- Before (existing baseline): `docs/screenshots/ux-proof-58-64/canonical-contact-route.png`
- After (new desktop 1440): `docs/screenshots/issues-120-130/desktop-1440-contact.png`
- After (desktop 1024): `docs/screenshots/issues-120-130/desktop-1024-contact.png`
- After (mobile lane selection): `docs/screenshots/issues-120-130/mobile-contact-lane-selected.png`
- After (mobile step transition): `docs/screenshots/issues-120-130/mobile-contact-step-2.png`
- After (`/realtors` 1440): `docs/screenshots/issues-120-130/desktop-1440-realtors.png`
- After (`/services/portable-toilets` 1440): `docs/screenshots/issues-120-130/desktop-1440-portable-toilets.png`

## DOM/Layout Diff Evidence
- Wrapper and geometry diff: `docs/screenshots/issues-120-130/dom-diff-layout.patch`

## QA Matrix (1024 + 1440)
Source: `docs/screenshots/issues-120-130/qa-matrix.json`

| Viewport | Task Root Width | Main Column Width | Support Rail Width | Single Step Cards |
|---|---:|---:|---:|---:|
| 1024 | 963px | 620px | 318px | 1 |
| 1440 | 1280px | 830px | 426px | 1 |

## Mobile Interaction Evidence
- Focus transfer after lane selection: `headingFocused: true` in `qa-matrix.json`
- Sticky mobile action rail visible: `stickyActionsVisible: true` in `qa-matrix.json`
- Single active step rendered: `renderedStepCards: 1` in `qa-matrix.json`

## Notes
- Evidence capture command: `npm run proof:issue-120-130`
