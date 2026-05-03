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

function Read-EnvValue {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Key
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    return ""
  }

  $target = "$Key="
  $line = Get-Content -LiteralPath $Path | Where-Object { $_.StartsWith($target) } | Select-Object -First 1
  if (-not $line) {
    return ""
  }

  return $line.Substring($target.Length).Trim()
}

function Test-IsPlaceholderSecret {
  param([string]$Value)

  $normalized = ""
  if ($Value) {
    $normalized = $Value.Trim().ToLowerInvariant()
  }
  return (
    $normalized.Length -lt 24 -or
    $normalized.Contains("replace-with") -or
    $normalized.Contains("example") -or
    $normalized.StartsWith("local-")
  )
}

function Assert-DevelopAdminSecrets {
  param([Parameter(Mandatory = $true)][string]$Path)

  $reviewEnabled = (Read-EnvValue -Path $Path -Key "ENABLE_ADMIN_SUBMISSIONS_REVIEW").ToLowerInvariant()
  if ($reviewEnabled -ne "true") {
    return
  }

  $ownerToken = Read-EnvValue -Path $Path -Key "ADMIN_OWNER_TOKEN"
  $opsToken = Read-EnvValue -Path $Path -Key "ADMIN_OPS_TOKEN"
  if ((Test-IsPlaceholderSecret -Value $ownerToken) -and (Test-IsPlaceholderSecret -Value $opsToken)) {
    throw "Develop admin review is enabled, but ADMIN_OWNER_TOKEN/ADMIN_OPS_TOKEN are missing, weak, or placeholder-shaped in $Path."
  }
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

Assert-DevelopAdminSecrets -Path $EnvFile

$cmd = "docker compose -f $ComposeFile --env-file $EnvFile -p $ProjectName up --build -d --remove-orphans"
Write-Host "Running: $cmd"
Invoke-Expression $cmd

Write-Host "`nContainers for $ProjectName"
docker ps --filter "label=com.docker.compose.project=$ProjectName" --format "table {{.Names}}`t{{.Image}}`t{{.Status}}`t{{.Ports}}"
