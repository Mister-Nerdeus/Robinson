# Contact Form Truth Contract

## Goal
UI-required fields and server validation must match exactly.

## Required alignment
- Base request fields required in UI and schema:
- `fullName`
- `phone`
- `email`
- `address`
- `urgency`
- `message`

## Lane selection behavior
- `/contact` must start with a neutral chooser state.
- No lane is preselected by default.
- Users explicitly choose septic, evaluation, rental, commercial, or general.

## Source of truth
- Schema: `src/lib/forms/schema.ts`
- UI form: `src/components/forms/RequestForm.tsx`
- Contact router: `src/components/forms/ContactIntakeRouter.tsx`