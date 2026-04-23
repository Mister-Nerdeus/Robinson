param(
  [string]$LegacyPath = "data/submissions.json"
)

npx tsx scripts/import-legacy-submissions.ts $LegacyPath
