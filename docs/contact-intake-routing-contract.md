# Contact Intake Routing Contract

## Goal
`/contact` acts as an intake hub, not only a generic inbox.

## Source of truth
- Contact page: `src/app/contact/page.tsx`
- Intake router UI: `src/components/forms/ContactIntakeRouter.tsx`
- Lane form implementation: `src/components/forms/RequestForm.tsx`
- Contact copy: `src/content/contact.ts`

## Required lanes
- Septic service (`septic-service`)
- Evaluation (`evaluation`)
- Portable rental (`rental`)
- Commercial service (`commercial-service`)
- General contact fallback (`general`)

## Behavior
- Emergency guidance remains call-first and visible above lane selection.
- Lane-specific forms remain the source of truth for lane-specific fields.
- General lane remains available when request intent is unclear.

## Acceptance probe
- Open `/contact` and switch through all five lanes.
- Confirm form title and lane fields change with lane selection.