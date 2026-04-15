# Public vs Develop Surface Contract

## Intent
Separate customer-facing `main` presentation from review-facing `develop` surfaces.

## Main (public)
- `RUNTIME_MODE=production`
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `SEO_ALLOW_INDEXING=true`
- Footer must not render runtime badges or deployment stamp.

## Develop (review)
- `RUNTIME_MODE=demo`
- `REVIEW_SURFACES_VISIBLE=true`
- `DEPLOYMENT_STAMP_VISIBLE=true`
- `SEO_ALLOW_INDEXING=false`
- Footer may render runtime badges and deployment provenance.

## SEO alignment
- Canonical URL uses `SITE_URL` from environment.
- `robots.ts` uses production+indexing as the only indexable state.
- `sitemap.ts` entries always derive from `SITE_URL`.

## Env templates
- Public template: `.env.main.example`
- Review template: `.env.develop.example`