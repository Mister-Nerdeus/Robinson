# ISSUE 173-184 CLOSEOUT

## #173 Replace generic homepage service CTAs with explicit task CTAs

### Before / After
| Route | Before | After |
| --- | --- | --- |
| Home desktop | `docs/screenshots/issue-83-94-home-desktop-1440.png` | `docs/screenshots/issues-173-184/home-desktop-1440-after.png` |
| Home mobile | `docs/screenshots/issue-83-94-home-mobile-390.png` | `docs/screenshots/issues-173-184/home-mobile-390-after.png` |

### CTA inventory
| Lane | CTA label | Target |
| --- | --- | --- |
| Emergency septic service | Emergency Septic Help | `/contact?lane=septic-service` |
| Routine pumping and maintenance | Start Routine Pumping Request | `/contact?lane=septic-service` |
| Well and septic evaluations | Start Realtor Evaluation | `/contact?lane=evaluation` |
| Portable toilet rentals | Start Rental Quote | `/contact?lane=rental` |
| Commercial septic support | Open Commercial Paths | `/contact?lane=commercial-service` |

### Copy diff summary
- Removed generic `Learn more` from primary lane cards.
- Replaced duplicated lane blocks with one canonical five-lane routing block.

## #174 Consolidate repeated trust and lane messaging

### Repetition audit
| Area | Before | After |
| --- | --- | --- |
| Lane explanation sections | Primary task CTA section + service lane section + Realtor lane section | Single service lane section |
| Trust messaging | Hero + trust panel + repeated lane framing | Hero + one trust block with distinct trust anchors |

### Scroll-depth result
- Homepage sections reduced from `hero + primary task ctas + lanes + trust + realtor + faq + final cta` to `hero + lanes + trust + faq + final cta`.

## #175 Canonical public business facts source

### Canonical fact table
Source: `src/content/businessFacts.ts`

| Fact | Value | Status | Public |
| --- | --- | --- | --- |
| business_name | Robinson Septic Cleaning | verified | true |
| primary_service_line | (616) 636-5565 | verified | true |
| additional_office_line | (616) 887-2060 | verified | true |
| primary_address | 1565 N Dagget Rd, Pierson, MI 49339 | verified | true |
| sparta_legacy_address | 113 South Union, Sparta, MI 49345 | pending-verification | false |
| legacy_secondary_phone_variant | (231) 937-8282 | pending-verification | false |

### Search/diff proof
- `npm run check:hardcoded-contact` -> pass
- `rg -n "113 South Union|937-8282" src/app src/components src/lib` -> no public matches

## #176 Remove duplicated nav rendering and enforce compact task-header mode

### Before / After
| Route | Before | After |
| --- | --- | --- |
| Septic route | `docs/screenshots/issue-83-94-septic-cleaning-desktop-1440.png` | `docs/screenshots/issues-173-184/septic-cleaning-desktop-1440-after.png` |
| Contact route | `docs/screenshots/issue-83-94-contact-desktop-1440.png` | `docs/screenshots/issues-173-184/contact-desktop-1440-after.png` |

### DOM/text snapshot proof
- Contract check: `npm run test:request-flow-behavior`
- E2E check: `npm run test:request-flow-behavior-e2e`

## #177 Remove public deployment provenance and runtime leakage

### Route text proof
- Leakage guard in e2e (`tests/routes/requestFlowBehavior.e2e.ts`) scans for: `Mode:`, `Commit:`, `Build time`, `runtime mode` and fails if present.
- Runtime proof API now host-gated in addition to auth (`isRuntimeProofHostAllowed`).

### Test output
- `npm run test:request-flow-behavior` -> pass
- `npm run test:request-flow-behavior-e2e` -> pass

## #178 Rebuild septic route narrative

### Before / After
| Route | Before | After |
| --- | --- | --- |
| Septic desktop | `docs/screenshots/issue-83-94-septic-cleaning-desktop-1440.png` | `docs/screenshots/issues-173-184/septic-cleaning-desktop-1440-after.png` |
| Septic mobile | `docs/screenshots/issue-83-94-septic-cleaning-mobile-390.png` | `docs/screenshots/issues-173-184/septic-cleaning-mobile-390-after.png` |

### Copy diff
- Added explicit `What service includes` block.
- Added explicit `Pricing factors` block with non-quote framing.
- Added explicit `What happens next` block adjacent to request flow.
- Compressed overlapping support/FAQ blocks on the septic route.

### Source mapping note
- Narrative source: `src/content/serviceTemplates.ts` + `src/content/services.ts`
- Route composition source: `src/components/site/ServiceRequestPageTemplate.tsx`

## #179 Realtor lane as deadline-first workflow

### Screenshots
- Before: `docs/screenshots/issues-159-162/realtors-desktop-1440.png`
- After: `docs/screenshots/issues-173-184/realtors-desktop-1440-after.png`

### Field matrix (new/explicit)
| Field | Purpose |
| --- | --- |
| Primary Deadline (`deadlineType`) | Identifies closing/contingency urgency driver |
| Closing Date (required) | Hard deadline anchor |
| Schedule Flexibility (`timelineFlexibility`) | Clarifies date tolerance |
| Access Contact Name/Phone | Explicit access coordination ownership |
| Sale timeline notes | Transaction-specific constraints |

### Copy diff
- Route reframed from generic evaluation support to transaction deadline-first language.
- Removed duplicate Realtor FAQ mini-block to keep workflow-focused path.

## #180 Portable-toilet scenario and quote-flow expansion

### Before / After
| Route | Before | After |
| --- | --- | --- |
| Portable toilets desktop | `docs/screenshots/issue-83-94-portable-toilets-desktop-1440.png` | `docs/screenshots/issues-173-184/portable-toilets-desktop-1440-after.png` |

### Field matrix
| Field | Change |
| --- | --- |
| Rental Scenario (`eventType`) | Expanded to homes, events, schools, businesses, jobsites |
| Service Cadence (`serviceFrequency`) | Expanded to one-time, weekly, twice-weekly, every-other-week, monthly, custom |
| Coverage copy | Added qualified 60-mile servicing statement |

### Copy diff
- Route now explicitly names major rental scenarios.
- Help copy now frames cadence and coverage before quote steps.

## #181 Commercial sub-lanes

### Screenshots
- Before: `docs/screenshots/issue-83-94-commercial-desktop-1440.png`
- After: `docs/screenshots/issues-173-184/commercial-desktop-1440-after.png`

### CTA table
| Sub-lane | CTA | Target |
| --- | --- | --- |
| Grease trap | Request Grease Trap Service | `/services/commercial?work=grease-trap` |
| Lift pump | Request Lift Pump Support | `/services/commercial?work=lift-pump` |
| Commercial septic | Request Commercial Septic Service | `/services/commercial?work=septic-pumping` |
| Catch-all | Open Commercial Troubleshooting | `/services/commercial?work=catch-all` |

### Routing summary
- Commercial page maps `work` query to prefill `serviceNeeded` in the request form.

## #182 Trust governance for legacy blocks

### Trust inventory / decision table
- See `docs/trust/legacy-trust-governance.md`.

### Before / After
| Route | Before | After |
| --- | --- | --- |
| Home desktop | `docs/screenshots/issue-83-94-home-desktop-1440.png` | `docs/screenshots/issues-173-184/home-desktop-1440-after.png` |

## #183 FAQ usefulness and schema alignment

### FAQ screenshots
- Before: `docs/screenshots/issue-83-94-faq-desktop-1440.png`
- After: `docs/screenshots/issues-173-184/faq-desktop-1440-after.png`

### FAQ inventory
- Canonical FAQ entries: `src/content/faq.ts`
- Visible FAQ route rendering: `src/app/faq/page.tsx`
- FAQ schema source: `src/lib/seo/schema.ts -> faqSchema()`

### Schema proof
- `npm run test:schema-source-contract` -> pass

## #184 Owner-verification + release-proof gate

### Verification checklist
- `docs/business-truth/owner-verification-checklist.md`

### Release gate doc
- `docs/release/public-surface-release-gate.md`

### PR template diff
- Added checks for:
  - canonical public fact table updates
  - pending-verification fact isolation
  - screenshot/schema/CTA proof bundle completeness

### Example proof bundle
- This closeout file + `docs/screenshots/issues-173-184/*`
- Contract test outputs:
  - `npm run test:request-route-release-gate` (pass)
  - `npm run test:business-facts-contract` (pass)
  - `npm run test:request-flow-behavior` (pass)
  - `npm run test:request-flow-behavior-e2e` (pass)
