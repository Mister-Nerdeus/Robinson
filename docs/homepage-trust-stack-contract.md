# Homepage Trust Stack Contract

## Purpose
Limit homepage trust copy to verified public facts that help a customer decide whether Robinson handles the work they need.

## Allowed Homepage Trust Claims
| Claim | Status | Source Class |
| --- | --- | --- |
| Family owned and operated. | allowed | verified-source |
| Founded in 1979. | allowed | verified-source |
| Residential and commercial septic service. | allowed | verified-source |
| Well and septic evaluations for home sales. | allowed | verified-source |
| Portable toilet rentals, grease trap cleaning, and lift pump support. | allowed | verified-source |

## Explicitly Blocked Legacy Trust Noise
- Coupon or discount language
- Facebook-first social filler
- BBB wording
- Association membership as primary homepage proof
- Review-count inflation
- Casual “speed dial” reputation framing

## Executable Gate
- `npm run test:homepage-trust-stack-contract`

## Source of Truth
- `src/content/trust.ts`
- `src/content/home.ts`
- `docs/homepage-trust-source-map.md`
