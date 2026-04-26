# Incident Playbook Public Facts

## Scope
Public fact drift, listing mismatch, or incorrect public business info.

## First Response
1. Compare live surface facts against canonical `src/config/company.ts`.
2. Log drift type (name/phone/address/hours/emergency wording).
3. Flag whether drift is active on site, external listings, or both.

## Containment
- Freeze external listing edits that rely on unresolved/provisional facts.
- Add temporary owner-note in citation audit if public mismatch exists.

## Resolution
- Correct canonical facts only after owner verification.
- Sync corrected facts to listing matrix/checklist artifacts.
- Capture before/after evidence for changed surfaces.

## Escalation
- Owner approval required for any address/phone/emergency wording change.
- If legal/accreditation wording is involved, hold until verified.
