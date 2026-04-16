# Intake Enrichment Contract (Issues 43-45)

## Scope
This contract defines dispatch-ready intake behavior across septic, evaluation, rental, commercial, and general lanes.

## Core Rules
- Emergency guidance remains call-first in every lane.
- Structured location fields are used across service lanes: `streetAddress`, `city`, `zip`, `state`.
- Unknown/unsure paths are always available where users may not know details.
- Freeform notes remain required so unusual cases are not blocked.

## Septic Lane
- Tank size is a guided selection with common capacities plus `unknown`.
- Problem signs are structured multi-select values; users can still provide freeform warning details.
- Access issues are structured multi-select values.
- Dispatch context includes tank location known, existing customer, property usage, and pump-history known.

## Cross-Lane Additions
- Evaluation includes utility status, occupant presence, property type, and access instructions.
- Rental includes handwash requirement, ADA requirement, placement surface, and site access notes.
- Commercial includes access hours, grease trap location, previous service history known, and service urgency.
- General lane remains lightweight and asks whether location-based service is involved.

## Contract Lockstep
- UI fields, schema validation, types, persistence, notifications, and admin summary views must remain aligned.
- Newly added structured fields are first-class persisted values.
- Admin summaries and export include city/ZIP and lane-specific structured details.
