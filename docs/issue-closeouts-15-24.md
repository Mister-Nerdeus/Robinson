# Closeouts: Issues 15-24

## Issue 15
- Verification packet completed in `docs/owner-verification-packet.md`.
- Finalized facts applied in `src/config/company.ts`.
- Claim statuses updated in `docs/claim-registry.md`.
- Risky claims removed/rewritten: emergency guarantee removed, fax retired, secondary phone retired.

## Issue 16
- Final copy modules updated:
  - `src/content/home.ts`
  - `src/content/services.ts`
  - `src/content/faq.ts`
  - `src/content/trust.ts`
  - `src/content/contact.ts`
- Proof map: `docs/final-copy-proof-map.md`.

## Issue 17
- Active curated set in `public/images/curated/*`.
- Manifest: `docs/media-manifest.md`.
- Replacement log: `docs/media-replacement-log.md`.

## Issue 18
- Notification config: `src/config/notifications.ts`.
- Delivery path: `src/lib/notifications/*`.
- Persistence-first flow retained in `src/lib/forms/actions.ts`.
- Flow doc: `docs/submission-delivery-flow.md`.
- Real delivery proof captured via ethereal mode; failure-mode persistence proof captured in `docs/v2-proof-pack.md`.

## Issue 19
- Anti-spam checks: `src/lib/forms/antiSpam.ts`.
- Rate limit utility: `src/lib/rate-limit/memory.ts`.
- Abuse log path: `src/lib/forms/abuseLog.ts`.
- Control doc: `docs/form-abuse-protection.md`.

## Issue 20
- Analytics libs/API:
  - `src/lib/analytics/*`
  - `src/app/api/analytics/route.ts`
- Event instrumentation in header, lane cards, and form lifecycle.
- Event map: `docs/analytics-event-map.md`.

## Issue 21
- Metadata + schema utilities:
  - `src/lib/seo/*`
- Route metadata exports and JSON-LD added on major routes.
- `public/robots.txt`, `src/app/sitemap.ts`, `docs/seo-map.md`.

## Issue 22
- Service area content: `src/content/serviceArea.ts`.
- Display component: `src/components/site/ServiceAreaBlock.tsx`.
- Contact/footer alignment updated.
- Strategy doc: `docs/location-display-strategy.md`.

## Issue 23
- Alignment checklist: `docs/business-listing-alignment.md`.
- Citation audit table: `docs/citation-audit.md`.

## Issue 24
- Canonical stack file: `compose.yaml`.
- Test env file: `.env.test`.
- Scripts:
  - `scripts/test-stack-up.ps1`
  - `scripts/test-stack-down.ps1`
  - `scripts/test-smoke.mjs`
- Docs:
  - `docs/docker-test-environment.md`
  - `docs/test-runbook.md`
