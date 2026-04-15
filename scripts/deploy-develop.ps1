param(
  [string]$ComposeFile = "compose.yaml",
  [string]$EnvFile = ".env.develop",
  [string]$EnvTemplate = ".env.develop.example",
  [string]$ProjectName = "robinson-develop",
  [string]$ExpectedRef = "refs/heads/develop"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Upsert-EnvValue {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Key,
    [Parameter(Mandatory = $true)][string]$Value
  )

  $lines = if (Test-Path -LiteralPath $Path) { Get-Content -LiteralPath $Path } else { @() }
  $target = "$Key="
  $updated = $false

  for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i].StartsWith($target)) {
      $lines[$i] = "$Key=$Value"
      $updated = $true
      break
    }
  }

  if (-not $updated) {
    $lines += "$Key=$Value"
  }

  Set-Content -LiteralPath $Path -Value ($lines -join "`n")
}

if (-not (Test-Path -LiteralPath $EnvFile)) {
  Copy-Item -LiteralPath $EnvTemplate -Destination $EnvFile
  Write-Host "Created $EnvFile from $EnvTemplate"
}

$commit = (git rev-parse --short=12 HEAD).Trim()
$timestamp = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

Upsert-EnvValue -Path $EnvFile -Key "DEPLOY_COMMIT_SHA" -Value $commit
Upsert-EnvValue -Path $EnvFile -Key "DEPLOY_REF" -Value $ExpectedRef
Upsert-EnvValue -Path $EnvFile -Key "DEPLOY_BUILD_TIME_UTC" -Value $timestamp

$cmd = "docker compose -f $ComposeFile --env-file $EnvFile -p $ProjectName up --build -d --remove-orphans"
Write-Host "Running: $cmd"
Invoke-Expression $cmd

Write-Host "`nContainers for $ProjectName"
docker ps --filter "label=com.docker.compose.project=$ProjectName" --format "table {{.Names}}`t{{.Image}}`t{{.Status}}`t{{.Ports}}"