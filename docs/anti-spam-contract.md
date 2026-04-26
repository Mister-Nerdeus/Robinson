# Anti-Spam Contract

## Purpose
Define layered abuse controls that reduce junk submissions without blocking legitimate leads.

## Layered Controls
1. Rate limiting
- Keyed by source IP (`submissions:<ip>`).
- Config: `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MODE`.

2. Heuristic and honeypot controls
- Hidden-field trap (`companyWebsite`) must stay empty.
- Block known spam patterns and malformed payloads.
- Flag suspicious traffic for challenge/escalation.

3. Challenge escalation
- Config: `ABUSE_CHALLENGE_MODE` (`off`, `shadow`, `required`).
- In `required` mode, suspicious requests must include `x-abuse-challenge-token` header.
- In `shadow` mode, suspicious requests are accepted but logged as abuse outcomes.

4. Trusted override (optional)
- Config: `ABUSE_TRUSTED_IPS`, `ABUSE_TRUSTED_EMAILS`.
- Allows known owner/staff workflows while preserving observability.

## Observability Outcomes
- `blocked` (rate-limit/heuristic)
- `challenged`
- `shadow-allowed`
- `allowed-after-challenge`
- `allowed-trusted`

## Invariants
- Lane taxonomy remains unchanged.
- Legitimate homeowner/realtor/commercial requests remain submittable.
- Controls must degrade gracefully and be explainable.

## Verification
- `tests/anti-spam-contract.spec.ts`
- `npm run verify:v1`
