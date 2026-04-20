# CONTACT_AND_INTAKE_ANALYTICS

## Canonical Event Registry
- Source: `src/lib/analytics/events.ts`

## Required Events
- `call_cta_click`
- `contact_router_lane_select`
- `form_start`
- `form_step_view`
- `form_submit`
- `form_submit_success`
- `form_submit_error`

## Instrumented Surfaces
- Header call CTAs
- Footer call CTA
- Contact lane router (`RequestRouter`, `ContactIntakeRouter`)
- Shared `RequestForm` step and submit lifecycle
