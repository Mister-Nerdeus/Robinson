# RELEASE_SIGNOFF

## Required Before Release
- Route smoke pass
- Contact truth/content contract pass
- Visual screenshot matrix complete
- Redirect verification complete
- Analytics smoke check complete
- Deploy manifest generated (`npm run verify:deploy-manifest`)
- Request route parity proof generated (`npm run verify:request-route-parity`)
- Parity + manifest artifacts archived with CI run

## Rollback Requirement
- Rollback procedure must be documented and testable.
