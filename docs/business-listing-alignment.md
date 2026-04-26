# Business Listing Alignment

## Summary
This alignment record binds external listings to the canonical public-facts contract in `src/config/company.ts` and `src/content/businessFacts.ts`.

## Canonical Public Listing Facts
- Public business name: `Robinson Septic Cleaning`
- Legal business name: `Robinson Septic Tank Cleaning LLC`
- Primary line (dominant): `(616) 636-5565`
- Secondary office line (subordinate): `(616) 887-2060`
- Canonical address: `1565 N Dagget Rd, Pierson, MI 49339`
- Routine scheduling hours: `Mon-Fri 8:00 AM-5:00 PM`
- Emergency wording: `24/7 emergency response is call-first; routine scheduling follows normal office hours.`

## Alignment Rules
- Every listing update must map directly to canonical facts.
- No provisional/unverified phone, address, hours, or emergency statement is publishable.
- Legacy references are retained as tracked records until retired/suppressed.
- Brand name is fixed to `Robinson Septic Cleaning` across all listings.

## Current Execution Status
- See `docs/external-footprint-matrix.md` for platform-by-platform status.
- See `docs/external-listing-sync-checklist.md` for execution and evidence steps.

## Blocking Items
- BBB/accreditation-sensitive wording remains unresolved pending owner verification.
- Legacy alternate records must be explicitly suppressed before public cutover.
