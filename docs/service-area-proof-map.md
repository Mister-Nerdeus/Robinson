# Service Area Proof Map

| Surface | Source | Output |
|---|---|---|
| Footer service-area text | `src/content/serviceArea.ts` | `src/components/site/Footer.tsx` |
| Contact service-area block | `src/content/serviceArea.ts` | `src/components/site/ServiceAreaBlock.tsx` + `src/app/contact/page.tsx` |
| Structured data area-served note | `src/lib/seo/schema.ts` | Service JSON-LD on service routes |

## Canonical Location Agreement
- Address and contact facts sourced from `src/config/company.ts`.
- Location strategy defined in `docs/location-display-strategy.md`.
