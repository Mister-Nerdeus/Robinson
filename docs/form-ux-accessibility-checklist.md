# Form UX Accessibility Checklist

## Coverage Lanes
- General contact
- Septic service
- Well/septic evaluation
- Portable toilet rental
- Commercial service

## Automated Gate
- `tests/form-ux-accessibility.spec.ts`

## Checklist
- Label association: every control has explicit label mapping (`htmlFor` / `id`).
- Helper + error semantics: controls reference helper/error text via `aria-describedby`.
- Keyboard flow: wizard steps are reachable and operable with keyboard controls.
- Error state: failed submit path announces state via assertive live region.
- Success state: successful submit path announces state via polite live region.
- Mobile/desktop proof set present for core forms.

## Screenshot Set
- `docs/screenshots/contact-desktop-1440.png`
- `docs/screenshots/contact-mobile-390.png`
- `docs/screenshots/septic-cleaning-desktop-1440.png`
- `docs/screenshots/septic-cleaning-mobile-390.png`
- `docs/screenshots/realtors-desktop-1440.png`
- `docs/screenshots/realtors-mobile-390.png`
- `docs/screenshots/portable-toilets-desktop-1440.png`
- `docs/screenshots/portable-toilets-mobile-390.png`
- `docs/screenshots/issue-83-94-commercial-desktop-1440.png`
- `docs/screenshots/issue-83-94-commercial-mobile-390.png`
