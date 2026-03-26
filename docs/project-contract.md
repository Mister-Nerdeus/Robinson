# Project Contract (Authority Document)

## Purpose
This document is the project authority for scope, sequencing, and truth standards during the initial repository build.

## Authority Rule
This is the only issue layer allowed to define project-wide authority. Later issues inherit this contract and must not redefine it.

## Scope Contract

### In Scope (Initial Build)
- Local development implementation for v1 foundations.
- Repository setup and application work that can be executed and validated locally.
- Evidence-backed content and claim handling.

### Out of Scope (Initial Build)
- Production deployment, release engineering, public launch ops.
- Publishing uncertain business facts as confirmed truth.
- Any production-only hardening not required to prove local v1 behavior.

## Local-Only Runtime Requirement
- Initial build must run in local development mode only.
- No task in the first implementation batch may require production credentials or live public systems.
- Environment defaults must keep local-only behavior enabled.

## Evidence-Backed Content Rules
- No public-facing business claim is canonical unless marked `confirmed`.
- Claims with unresolved verification must be labeled `provisional`.
- Claims that are unsafe to publish must be labeled `do-not-publish-yet` and excluded from user-facing surfaces.
- New content work must reference the canonical claim registry when it exists.

## Sequencing Contract
Work order must follow the source-plan phase order:
1. Shell
2. Forms
3. Trust/content cleanup
4. Later pre-launch items

## Closeout Standard Binding
Every issue closeout must follow [`docs/issue-closeout-standard.md`](issue-closeout-standard.md) and include artifact-backed evidence.

## Change Control
- Changes to this contract require explicit issue-level rationale and must preserve local-only and evidence-backed constraints unless intentionally superseded by a later approved phase.
