# Intake Field Matrix

## Emergency Rule
All forms keep the explicit rule: emergencies are fastest by phone call; forms capture dispatch context.

## Lane Matrix

| Lane | Dispatch-grade fields added/required |
| --- | --- |
| General contact | topic, urgency, address, preferred date, message |
| Septic service | tank size, tank count, lids exposed, warning signs, urgency |
| Evaluation | role in sale, closing date, occupancy status, brokerage, urgency |
| Rental | event/jobsite type, unit count, rental duration, service frequency, site conditions |
| Commercial | facility name, facility type, service needed, tank/trap count, on-site contact, urgency |

## Ownership
- UI fields: `src/components/forms/RequestForm.tsx`
- Validation: `src/lib/forms/schema.ts`
- Persisted contract: `src/lib/forms/types.ts`
- Delivery rendering: `src/lib/notifications/send.ts`
