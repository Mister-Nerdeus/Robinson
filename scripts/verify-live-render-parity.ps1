param(
  [string]$TargetHost = "http://localhost:3001",
  [string]$ExpectedRequestLayoutContractVersion = "request-desktop-modes-v5",
  [string]$ExpectedHomeMarkerVersion = "home-hero-lanes-trust-v1",
  [string]$OutputPath = "",
  [string]$Mode = "strict"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$modeNormalized = $Mode.Trim().ToLowerInvariant()
if ($modeNormalized -ne "strict" -and $modeNormalized -ne "report") {
  throw "Mode must be either 'strict' or 'report'."
}
$strictMode = $modeNormalized -eq "strict"

$checksByRoute = @{
  "/" = @(
    "data-homepage-contract=""$ExpectedHomeMarkerVersion""",
    'data-homepage-route="/"',
    "24/7 Emergency Service",
    "Open Contact and Request Forms"
  )
  "/contact" = @(
    'data-task-page-route="/contact"',
    'data-task-page-layout-mode="supportRail"',
    'data-task-page-layout-mode="formDominant"'
  )
  "/services/septic-cleaning" = @(
    "data-request-layout-contract=""$ExpectedRequestLayoutContractVersion""",
    'data-request-layout-route="/services/septic-cleaning"',
    'data-request-layout-geometry="explicit-section-modes"',
    'data-request-layout-modes="supportRail|formDominant|fullWidthSupport"'
  )
}

$legacySignatures = @(
  "md:grid-cols-[1.15fr,0.85fr]",
  "md:grid-cols-[1.1fr,0.9fr]"
)

$results = @()
$hasFailures = $false

foreach ($route in $checksByRoute.Keys) {
  $url = "$TargetHost$route"
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 -Headers @{
    "Cache-Control" = "no-cache, no-store, max-age=0"
    "Pragma" = "no-cache"
  }

  $content = [string]$response.Content
  $errors = @()

  if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) {
    $errors += "HTTP status not successful: $($response.StatusCode)"
  }

  foreach ($requiredPattern in $checksByRoute[$route]) {
    if ($content -notmatch [regex]::Escape($requiredPattern)) {
      $errors += "Missing expected marker/content: $requiredPattern"
    }
  }

  if ($route -eq "/contact" -or $route -eq "/services/septic-cleaning") {
    $cacheControl = [string]$response.Headers["Cache-Control"]
    if ($cacheControl.ToLowerInvariant() -notmatch "no-store") {
      $errors += "Cache-Control missing no-store: $cacheControl"
    }
  }

  if ($route -eq "/contact" -or $route -eq "/services/septic-cleaning") {
    foreach ($signature in $legacySignatures) {
      if ($content.Contains($signature)) {
        $errors += "Legacy right-rail signature detected: $signature"
      }
    }
  }

  if ($errors.Count -gt 0) {
    $hasFailures = $true
  }

  $results += [PSCustomObject]@{
    route = $route
    url = $url
    statusCode = [int]$response.StatusCode
    cacheControl = [string]$response.Headers["Cache-Control"]
    cfCacheStatus = [string]$response.Headers["CF-Cache-Status"]
    etag = [string]$response.Headers["ETag"]
    result = if ($errors.Count -eq 0) { "pass" } else { "fail" }
    errors = $errors
  }
}

$report = [PSCustomObject]@{
  generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
  targetHost = $TargetHost
  expectedRequestLayoutContractVersion = $ExpectedRequestLayoutContractVersion
  expectedHomeMarkerVersion = $ExpectedHomeMarkerVersion
  mode = $modeNormalized
  routes = $results
}

if (-not [string]::IsNullOrWhiteSpace($OutputPath)) {
  $directory = Split-Path -Parent $OutputPath
  if (-not [string]::IsNullOrWhiteSpace($directory) -and -not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }
  $report | ConvertTo-Json -Depth 8 | Set-Content -Path $OutputPath -Encoding UTF8
  Write-Host "Saved live-render parity report to $OutputPath"
}

$results | Format-Table route, statusCode, result, cfCacheStatus -AutoSize | Out-String | Write-Host

if ($strictMode -and $hasFailures) {
  throw "Live render parity verification failed for one or more routes."
}
