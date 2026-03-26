# Submission Contract

All lead forms post to `/api/submissions` using a shared schema.

## Required Canonical Fields
- `type` (job type / submission lane)
- `fullName`
- `phone`
- `email`
- `message`

## Supported Submission Types
- `general-contact`
- `septic-service`
- `well-septic-evaluation`
- `portable-toilet-rental`

## Type-Specific Fields
- `septic-service`: `tankSizeGallons`
- `well-septic-evaluation`: `roleInSale`, optional `realtorCompany`
- `portable-toilet-rental`: `eventType`, `unitCount`

## Validation Contract
- Validation is centralized in `src/lib/forms/schema.ts` (Zod).
- API returns `400` with flattened validation details when invalid.
- API returns `201` with `{ ok: true, id }` on success.

## Example Validated Payloads
```json
{
  "type": "general-contact",
  "fullName": "Alex Smith",
  "phone": "555-0123",
  "email": "alex@example.com",
  "message": "Need to discuss service options"
}
```

```json
{
  "type": "portable-toilet-rental",
  "fullName": "Jordan Lee",
  "phone": "555-0456",
  "email": "jordan@example.com",
  "message": "Jobsite rental request",
  "eventType": "construction",
  "unitCount": "4"
}
```
