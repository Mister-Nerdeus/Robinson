# SEO Map

| Route | Metadata Intent | Schema |
|---|---|---|
| `/` | core local service summary | LocalBusiness |
| `/services` | service hub index | none |
| `/services/septic-cleaning` | septic cleaning intent | Service |
| `/services/well-septic-evaluations` | realtor/home-sale evaluation intent | Service |
| `/services/portable-toilets` | rental intent | Service |
| `/services/commercial` | commercial support intent | Service |
| `/faq` | common question intent | FAQPage |
| `/contact` | contact + request intake intent | none |
| `/realtors` | realtor lane intent | none |

## Files
- Metadata builder: `src/lib/seo/metadata.ts`
- Schema helpers: `src/lib/seo/schema.ts`
- Robots: `public/robots.txt`
- Sitemap: `src/app/sitemap.ts`
