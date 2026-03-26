# V1 Proof Pack

Date: 2026-03-25 (local workspace)

## Command Evidence

### Lint + Typecheck + Build + Smoke + Publishability Checks
Command:
`npm run verify:v1`

Result summary:
- lint: pass
- typecheck: pass
- build: pass
- smoke tests: pass (`[smoke] routes and submission path pass`)
- hardcoded contact check: pass
- provisional claims check: pass

### Dev Startup
Command:
`npm run dev`

Result summary:
- Next.js started on `http://localhost:4850`
- Ready in ~2.3s (captured in `dev-startup.log`)

### Docker Startup
Command:
`docker compose up --build -d`

Result summary:
- Image built successfully
- Container `robinson-local-v1` started
- Port mapping: `3017 -> 4850`
- Runtime log shows `next start -p 4850` and ready state

## Screenshot Pack
Captured via `node scripts/capture-screenshots.mjs`:
- `docs/screenshots/home-desktop.png`
- `docs/screenshots/services-desktop.png`
- `docs/screenshots/contact-desktop.png`
- `docs/screenshots/septic-form-desktop.png`
- `docs/screenshots/admin-gated-desktop.png`
- `docs/screenshots/home-mobile.png`
- `docs/screenshots/contact-mobile.png`
- `docs/screenshots/portable-form-mobile.png`

## Scope Completion
- Local-only v1 status: complete
- Production deploy work: intentionally excluded
- Provisional claims remaining: yes (tracked in claim registry)
