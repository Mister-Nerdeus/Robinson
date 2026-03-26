# Analytics Event Map

## Stable Event Names
- `page_view`
- `call_cta_click`
- `conversion_lane_click`
- `form_start`
- `form_submit`
- `form_submit_success`
- `form_submit_error`

## Instrumented Surfaces
- Header phone CTA -> `call_cta_click`
- Homepage conversion lane cards -> `conversion_lane_click`
- Form focus start -> `form_start`
- Form submit attempt -> `form_submit`
- Submit result -> `form_submit_success` / `form_submit_error`
- Route changes -> `page_view`

## Storage
- Internal event capture endpoint: `/api/analytics`
- Event log file: `data/analytics-events.ndjson`

## Simple Funnel
1. `page_view` on `/`
2. `conversion_lane_click`
3. `form_start`
4. `form_submit_success`
