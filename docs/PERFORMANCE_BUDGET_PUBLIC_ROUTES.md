# PERFORMANCE_BUDGET_PUBLIC_ROUTES

## Target Budgets
- Home route (`/`): LCP <= 3.2s, FCP <= 3.2s, TTFB <= 1.0s
- Contact route (`/contact`): LCP <= 2.5s, FCP <= 1.7s, TTFB <= 0.9s
- Core service route (`/services/septic-cleaning`): LCP <= 2.8s, FCP <= 1.8s, TTFB <= 1.0s

## Measurement Contract
- Audit script: `scripts/audit-public-route-performance.mjs`
- Artifact output: `docs/verification/public-route-performance.json`
- Package command: `npm run test:performance-budget-public-routes`
- Measurement mode: local Playwright runs against local app host (`BASE_URL`, default `http://127.0.0.1:4850`)
- Synthetic failure proof mode: `node scripts/audit-public-route-performance.mjs --synthetic --synthetic-fail`

## Rules
- Hero media should be intentional and route-specific.
- Non-critical imagery should not be hero-priority.
- Loading and skeleton states required on key public routes/forms.
