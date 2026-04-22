# Issue Batch 159-162 Closeout

## Scope
- `#159` Keep footer and fast-path links out of active task blast radius.
- `#160` Remove duplicate service-area and route-link messaging on task routes.
- `#161` Add desktop width, gutter, and rail tokens for task pages.
- `#162` Add large-screen composition gates, screenshot proof standards, and PR enforcement.

## #159 Footer-Entry Treatment Note
- Task pages now use a dedicated handoff shell before footer entry:
  - `.task-page-section-shell`
  - `--request-footer-handoff-space`
  - soft fade handoff (`::after` gradient) to delay footer competition with active form flow.
- Footer visual weight directly under task surfaces is reduced:
  - `mt-10` (footer is physically later because task pages now reserve handoff space)
  - softer border/background treatment
  - subdued fast-path link styling.

## #159 Separation-Spacing Spec
| Element | Token / Rule | Value |
| --- | --- | --- |
| Task-to-footer runway | `--request-footer-handoff-space` | `clamp(2.8rem, 6vw, 5.5rem)` |
| Task container desktop gutter | `--layout-task-gutter-lg` | `2.25rem` |
| Task container mobile gutter | `--layout-task-gutter-sm` | `1rem` |
| Form section separation | `.request-page-form` top spacing | `clamp(1.2rem, 2.4vw, 1.8rem)` |

## #160 Duplication Inventory
Body + footer duplication risks found:
1. Service-route body contained optional lane-switch route links while footer also carried global fast-path links.
2. Portable coverage language appeared in task body copy while service-area coverage context also lived in global chrome.

Changes made:
1. Removed body rendering of `secondaryCta` in `ServiceRequestPageTemplate`.
2. Removed realtor-side body route-link helper block.
3. Centralized coverage summary in footer via `serviceAreaContent.summary` + `serviceAreaContent.expansionNote`.
4. Removed portable route body copy line that repeated broad West Michigan coverage messaging.

## #160 Canonical Placement Map
| Content Type | Canonical Placement | File |
| --- | --- | --- |
| Coverage summary (West Michigan + portable rental range note) | Footer coverage snapshot | `src/components/site/Footer.tsx` |
| Fast-path route links | Footer fast-path panel | `src/components/site/Footer.tsx` |
| Active-step route guidance | In-step/support copy only (no duplicate lane-switch links) | `src/components/site/ServiceRequestPageTemplate.tsx`, `src/app/realtors/page.tsx` |

## #160 Final Content Map
- Kept:
  - Evidence-backed service-area summary (`serviceAreaContent.summary`)
  - Portable rental coverage note (`serviceAreaContent.expansionNote`)
  - Global fast-path links in footer
- Removed from task-route body:
  - lane-switch `secondaryCta` render path
  - realtor “open service page” route-link block
  - portable bullet/proofpoint lines that duplicated coverage framing

## #161 Token Table (Centralized)
Source: `src/config/requestLayoutContract.ts`

| Token | Value | Purpose |
| --- | --- | --- |
| `taskPageMaxWidth` | `1520px` | Request/task page desktop max width |
| `formShellMaxWidth` | `1180px` | Active form shell max width |
| `supportRailMaxWidth` | `408px` | Support rail max width |
| `desktopGutter` | `2.25rem` | Large-screen gutter between columns |

Global CSS aliases:
- `--layout-request-max: 1520px`
- `--layout-form-shell-max: 1180px`
- `--layout-support-rail-max: 408px`
- `--layout-task-gutter-lg: 2.25rem`

## #161 Usage Map
- `TaskPageLayout` now publishes and consumes desktop layout tokens via CSS vars/data markers.
- `RequestPageLayout` publishes desktop token markers for auditability.
- `globals.css` uses centralized tokens for:
  - task container width
  - support-rail column width
  - full-width form-shell width
  - desktop gutters.
- Ad hoc width overrides removed from route bodies; task routes inherit shared layout behavior.

## #161 Before/After Width Summary
- Before:
  - request/form widths tied to previous v3 contract values (`1480px` / `1120px`).
  - weaker centralized rail tokenization.
- After:
  - request/form widths updated (`1520px` / `1180px`) with explicit rail + gutter tokens.
  - all audited request routes use shared token-driven layout semantics.

## #162 Composition Gate Checklist
- Required in PRs touching request-route layout:
  1. Blank-space intent explained.
  2. Rail stability verified.
  3. Form dominance verified.
  4. Footer separation verified.
  5. Action locality verified.

Implemented in:
- `docs/design/task-page-large-screen-composition-contract.md`
- `docs/qa/task-page-composition-checklist.md`
- `.github/PULL_REQUEST_TEMPLATE.md`

## #162 Screenshot Proof Standard
- New standard doc:
  - `docs/qa/request-route-screenshot-proof-standard.md`
- Required artifacts:
  - Desktop: `1280`, `1440`
  - Mobile: `390`
  - Composition JSON: `docs/screenshots/issues-159-162/composition-audit.json`

## #162 PR-Template Update
- PR checklist now requires:
  - before/after desktop screenshots at `1280/1440`
  - mobile screenshots at `390`
  - updated `issues-159-162/composition-audit.json` with `passed: true`
  - Apple-style spatial-intent answers.

## #162 Baseline Inventory
Artifact folder:
- `docs/screenshots/issues-159-162`

Contains:
- Desktop: `*-desktop-1280.png`, `*-desktop-1440.png`
- Mobile: `*-mobile-390.png`
- `composition-audit.json`

## Before/After Screenshot Map
Before baselines:
- `docs/screenshots/issues-143-152/*-desktop-1280.png`
- `docs/screenshots/issues-143-152/*-desktop-1440.png`

After baselines:
- `docs/screenshots/issues-159-162/*-desktop-1280.png`
- `docs/screenshots/issues-159-162/*-desktop-1440.png`
- `docs/screenshots/issues-159-162/*-mobile-390.png`

## Copy Diff
- Removed route-link duplication in body:
  - no rendered `secondaryCta` in service template support card
  - removed realtor body-level route-link helper
- Moved coverage summary to footer canonical block:
  - added “Coverage snapshot” with West Michigan and portable-rental coverage language
- Portable service copy updated to avoid repeated coverage phrasing in task body.

## DOM/Text Proof
- Visual evidence contract now checks `issues-159-162` artifact inventory:
  - `tests/visual/publicEvidence.spec.ts`
- Layout contract upgraded to `request-desktop-modes-v5` and tokenized:
  - `src/config/requestLayoutContract.ts`
  - `.env*` `REQUEST_LAYOUT_CONTRACT_VERSION=request-desktop-modes-v5`
- Composition audit result:
  - `docs/screenshots/issues-159-162/composition-audit.json` => `"passed": true`

## QA Notes
- Executed:
  - `npm run test:request-layout-contract`
  - `npm run test:task-page-composition-contract`
  - `npm run test:visual-public-evidence`
  - `npm run typecheck`
  - `docker compose -f compose.yaml --env-file .env.develop config`
  - `docker compose -f docker-compose.yml --env-file .env.main config`
  - `docker compose -f compose.test.yaml --env-file .env.test config`
