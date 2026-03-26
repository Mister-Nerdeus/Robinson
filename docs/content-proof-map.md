# Content Proof Map

| Content Module | Source Theme | Claim Status Handling | Notes |
|---|---|---|---|
| src/content/home.ts | Legacy homepage + service hierarchy | Uses non-numeric longevity wording only | Three conversion lanes are explicit. |
| src/content/services.ts | Legacy service pages | Service scope retained, risky claims removed | Realtor path remains first-class. |
| src/content/faq.ts | Legacy FAQ style content | Includes explicit emergency-claim caution | Structured Q/A for reuse. |
| src/content/trust.ts | Legacy trust narrative | Family-owned marked safe; other facts provisional | Keeps trust blocks evidence-aware. |

## Rule
Route files should reference content modules and avoid embedding long marketing copy directly.
No-inline-long-copy rule: route files may include only short structural text; primary content belongs in `src/content/*`.
