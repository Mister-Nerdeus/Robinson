# SEO Runtime Contract

## Canonical Inputs
- `SITE_URL`: absolute base URL for canonicals, sitemap, and robots sitemap pointer.
- `SEO_ALLOW_INDEXING=true|false`: whether robots allow crawling.

## Behavior
- Metadata canonicals use `SITE_URL` from `src/lib/runtime/env.ts`.
- Sitemap URLs are generated with `canonicalUrl(...)` and must not use localhost in public mode.
- `src/app/robots.ts` disallows all crawling when `SEO_ALLOW_INDEXING=false`.

## Non-Leak Rule
- Public SEO outputs must never include localhost URLs.

## Verification
- `tests/seo-contract.spec.ts` checks:
- sitemap uses configured `SITE_URL`
- canonical generation uses configured `SITE_URL`
- no localhost leak in runtime-generated SEO surfaces
- demo/local noindex behavior
