# External Listing Sync Checklist

## Summary
Execution checklist for external listing/citation synchronization from canonical truth.

## Platform-by-Platform Checklist

### Google Business Profile
- [ ] Update profile name to `Robinson Septic Cleaning`
- [ ] Confirm dominant public line `(616) 636-5565`
- [ ] Confirm canonical address `1565 N Dagget Rd, Pierson, MI 49339`
- [ ] Set routine hours to `Mon-Fri 8:00 AM-5:00 PM`
- [ ] Add call-first emergency wording per canonical contract
- [ ] Capture before/after screenshots and profile update timestamp

### Facebook
- [ ] Normalize page name to canonical brand
- [ ] Confirm primary line + subordinate secondary office line treatment
- [ ] Align address and hours with canonical facts
- [ ] Remove outdated emergency phrasing and stale aliases
- [ ] Capture before/after screenshots

### BBB / Verification-Sensitive Copy
- [ ] Hold unresolved wording until owner verification
- [ ] Add evidence record for verified language before publication
- [ ] Record unresolved items in `docs/citation-audit.md`

### Major Directories / Citations
- [ ] Enumerate active profiles and duplicates
- [ ] Update active records to canonical facts
- [ ] Suppress/retire stale duplicate records
- [ ] Document each changed profile URL and completion date

### Legacy References
- [ ] Track legacy records in audit table
- [ ] Suppress retired references where owner access exists
- [ ] Capture unresolved records in owner action queue

## Regression Guard
- [ ] Confirm updates source values from `src/config/company.ts` only
- [ ] Confirm no provisional/unverified facts are pushed
- [ ] Run `npm run test:external-listing-truth`
- [ ] Run `npm run verify:v1`
