# Citation / Listing Alignment Audit

## Summary
This table tracks public citations against canonical listing facts and preserves legacy facts for verification or retirement.

| surface | canonical mapping | status | action | notes |
| --- | --- | --- | --- | --- |
| Website canonical (`src/config/company.ts`) | Name, phone semantics, address, and hours map to canonical contract | aligned | monitor | Canonical source only; no public edits outside contract-managed updates. |
| Google Business Profile | Name + phone + address + hours + emergency wording | needs-update | owner update | Must normalize emergency and routine-hours wording to canonical contract. |
| Facebook Page | Brand name + primary line + call-first emergency wording | needs-update | owner update | Remove alternate naming variants and stale phone references. |
| BBB-facing profile text | Legal name + owner-verified wording only | unresolved | owner verify | Accreditation-sensitive claims stay blocked until verified. |
| Major directory citations | Canonical name/phone/address/hours | needs-update | owner update | Remove stale mirrors and duplicate entries with legacy facts. |
| Legacy website mirrors | Suppress stale references and retain historical log | retired-suppress | owner suppress | Do not republish legacy records; keep retirement notes only. |
| Legacy alternate phone `(231) 937-8282` | Retired legacy fact | retired-suppress | owner suppress | Tracked for drift checks; blocked from public publishing. |
| Legacy Sparta address `113 South Union, Sparta, MI 49345` | Retired legacy fact | retired-suppress | owner suppress | Preserve in audit trail only until owner confirms final retirement. |
| Legacy Howard City reference `5757 Henkel Rd, Howard City, MI 49329` | Retired legacy fact | retired-suppress | owner suppress | Historical reference retained for citation cleanup queue only. |

## Rule
No listing sync task proceeds while a required field is provisional, unresolved, or owner-unverified.
