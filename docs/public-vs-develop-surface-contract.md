# Public vs Develop Surface Contract

## Intent
Separate customer-facing production presentation from review-facing develop surfaces on `robinsonseptic.net` topology.

## Canonical Host Topology
- Canonical public host: `https://robinsonseptic.net`.
- Non-canonical public host: `https://www.robinsonseptic.net` must 301 redirect to apex canonical host.
- Review/develop host: `https://develop.robinsonseptic.net` (noindex, review/admin allowed per runtime contract).

## Main (public)
- `RUNTIME_MODE=production`
- `SITE_URL=https://robinsonseptic.net`
- `REVIEW_SURFACES_VISIBLE=false`
- `DEPLOYMENT_STAMP_VISIBLE=false`
- `SEO_ALLOW_INDEXING=true`
- Footer must not render runtime badges or deployment stamp.

## Develop (review)
- `RUNTIME_MODE=demo`
- `SITE_URL=https://develop.robinsonseptic.net`
- `REVIEW_SURFACES_VISIBLE=true`
- `DEPLOYMENT_STAMP_VISIBLE=true`
- `SEO_ALLOW_INDEXING=false`
- Footer may render runtime badges and deployment provenance.

## SEO Alignment
- Canonical URL uses `SITE_URL` from environment.
- `robots.ts` uses production+indexing as the only indexable state.
- `sitemap.ts` entries always derive from `SITE_URL`.

## Env Templates
- Public template: `.env.main.example`
- Review template: `.env.develop.example`
- Topology source of truth: `docs/railway-domain-topology-contract.md`
