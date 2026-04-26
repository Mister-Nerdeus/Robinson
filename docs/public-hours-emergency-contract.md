# Public Hours and Emergency Contract

## Canonical Truth Source
- Source module: `src/config/company.ts` via `serviceHoursContract`.
- Public projection module: `src/content/businessFacts.ts`.

## Canonical Facts
- Normal business hours: `Mon-Fri 8:00 AM-5:00 PM`.
- Emergency policy: `Emergency septic response line is call-first and staffed 24/7.`
- Qualification rule: emergency response wording must not imply routine office staffing outside normal hours.

## Surface Rules
- Footer must show both normal hours and emergency policy.
- Contact route must explicitly separate emergency call-first behavior from routine scheduling hours.
- Schema must use canonical opening-hours array from company contract.
- CTA wording must avoid ambiguous "everything 24/7" phrasing.

## Schema Rule
- `src/lib/seo/schema.ts` must map opening-hours from `company.serviceHoursContract.openingHoursSchema`.
- Visible copy and schema must not conflict.

## Verification Checklist
- [ ] Footer wording aligns with canonical hours and emergency policy.
- [ ] Contact page wording aligns with canonical hours and emergency policy.
- [ ] SEO schema openingHours aligns with canonical hours.
- [ ] `tests/public-hours-truth.spec.ts` passes.
