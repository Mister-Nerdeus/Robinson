# V2 Proof Pack (Issues 15-24)

Date: 2026-03-26

## Issue 15 Fact Freeze Evidence
- Verification packet: `docs/owner-verification-packet.md`
- Canonical config finalized: `src/config/company.ts`
- Claim registry finalized statuses: `docs/claim-registry.md`
- No provisional claims in customer surfaces:
  - `rg -n "provisional|PROVISIONAL" src/app src/components src/content` -> no matches

## Issue 16 Final Copy Evidence
- Final content modules: `src/content/home.ts`, `services.ts`, `faq.ts`, `trust.ts`, `contact.ts`
- Proof map + before/after: `docs/final-copy-proof-map.md`

## Issue 17 Media Curation Evidence
- Active curated assets: `public/images/curated/*`
- Manifest: `docs/media-manifest.md`
- Replacement log: `docs/media-replacement-log.md`
- Screenshot audit: `docs/screenshots/home-desktop.png`, `docs/screenshots/septic-form-desktop.png`, `docs/screenshots/contact-mobile.png`

## Issue 18 Delivery + Persistence Evidence
- Submission route now returns delivery object from `createSubmission`.
- Notification logs written to `data/notification-log.ndjson`.
- Persistence remains in `data/submissions.json`.
- Smoke result: `[smoke] routes and submission path pass`.
- Real notification test (ethereal mode) result:
  - `{"ok":true,"channel":"ethereal","messageId":"...","previewUrl":"https://ethereal.email/message/..."}`
- Failure-mode test (invalid SMTP) result:
  - `{"delivery":{"ok":false,"channel":"smtp","error":"getaddrinfo ENOTFOUND invalid.localhost"},"persisted":true}`

## Issue 19 Anti-Spam Evidence
- Matrix command: `npx tsx tests/abuse-matrix.ts`
- Output:
  - `valid: allowed`
  - `honeypot: blocked (honeypot-filled)`
  - `pattern: blocked (blocked-pattern)`

## Issue 20 Analytics Evidence
- Event map: `docs/analytics-event-map.md`
- Event endpoint: `/api/analytics`
- Instrumented events logged to `data/analytics-events.ndjson`

## Issue 21 SEO Evidence
- Metadata map: `docs/seo-map.md`
- Schema samples: `docs/seo-schema-samples.md`
- Route build includes sitemap route (`/sitemap.xml`) in `next build` output.

## Issue 22 Location Strategy Evidence
- Strategy doc: `docs/location-display-strategy.md`
- Service area proof map: `docs/service-area-proof-map.md`
- Contact/footer updated to canonical location model.

## Issue 23 Listing Alignment Evidence
- Alignment checklist: `docs/business-listing-alignment.md`
- Citation audit table + blockers: `docs/citation-audit.md`

## Issue 24 Docker Test Environment Evidence
- Compose config command: `docker compose -f compose.yaml --env-file .env.test -p robinson-test config`
- Startup command: `powershell -ExecutionPolicy Bypass -File scripts/test-stack-up.ps1 -Api`
- Health status command: `docker compose -f compose.yaml --env-file .env.test -p robinson-test ps`
- Smoke command: `node scripts/test-smoke.mjs` -> `[test-stack-smoke] pass`
- Screenshots:
  - `docs/screenshots/test-stack-home-desktop.png`
  - `docs/screenshots/test-stack-contact-desktop.png`
- Teardown command:
  - `powershell -ExecutionPolicy Bypass -File scripts/test-stack-down.ps1 -Api -RemoveVolumes`
