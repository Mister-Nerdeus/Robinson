# Issue Closeout Standard

## Required Closeout Sections
Every closed issue must include all sections below.

1. Scope Outcome
- What was implemented.
- What was intentionally not implemented.

2. Files Changed
- Final file list (added/modified/deleted), with paths.

3. Acceptance Gate Check
- Gate-by-gate pass/fail status.

4. Evidence Artifacts
- Command outputs, logs, screenshots, or file excerpts that prove behavior.
- Evidence must be concrete and reproducible.

5. Risk/Provisional Claims
- Any remaining provisional or blocked claim.
- Why it remains unresolved.

6. Next-Step Handoff (optional)
- Only if required to unblock next phase.

## Proof Requirements
- “Done” claims without artifacts are invalid.
- At least one artifact must directly map to each acceptance gate.
- If screenshots are requested, include path or capture note.
- If grep/check output is requested, include exact command and result summary.

## Closure Template
Use this template for every issue:

```md
## Closeout: Issue <id/title>

### Scope Outcome
- Implemented:
- Not implemented:

### Files Changed
- <path>
- <path>

### Acceptance Gate Check
- Gate 1: PASS/FAIL - <evidence ref>
- Gate 2: PASS/FAIL - <evidence ref>

### Evidence Artifacts
- Command: `<command>`
  - Result: <summary>
- Screenshot: `<path or capture note>`
- Doc excerpt: `<file path + section>`

### Risk/Provisional Claims
- <claim>: confirmed/provisional/do-not-publish-yet
- Follow-up needed:

### Definition of Done Status
- PASS/FAIL
- Notes:
```

## Enforcement Expectation
If any required closeout section is missing, the issue remains open.
