param(
  [string]$TargetHost = "https://robinson-demo.hearthcore.app",
  [string]$ExpectedContractVersion = "form-first-full-width-v2",
  [string]$OutputPath = "",
  [string[]]$Routes = @(
    "/services/septic-cleaning",
    "/services/well-septic-evaluations",
    "/services/portable-toilets",
    "/services/commercial",
    "/contact",
    "/realtors"
  )
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$staleLayoutSignatures = @(
  "md:grid-cols-[1.15fr,0.85fr]",
  "md:grid-cols-[1.1fr,0.9fr]"
)

$routeMarkers = @{
  "/contact" = 'data-task-page-route="/contact"'
  "/realtors" = 'data-task-page-route="/realtors"'
  "/services/septic-cleaning" = 'data-request-layout-route="/services/septic-cleaning"'
  "/services/well-septic-evaluations" = 'data-request-layout-route="/services/well-septic-evaluations"'
  "/services/portable-toilets" = 'data-task-page-route="/services/portable-toilets"'
  "/services/commercial" = 'data-task-page-route="/services/commercial"'
}

$results = @()

foreach ($route in $Routes) {
  $url = "$TargetHost$route"
  $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 25 -Headers @{
    "Cache-Control" = "no-cache, no-store, max-age=0"
    "Pragma" = "no-cache"
  }

  if ($response.StatusCode -lt 200 -or $response.StatusCode -ge 400) {
    throw "Route parity failed for ${route}: HTTP $($response.StatusCode)"
  }

  $content = [string]$response.Content
  $cacheControl = [string]$response.Headers["Cache-Control"]
  if ([string]::IsNullOrWhiteSpace($cacheControl)) {
    throw "Route parity failed for ${route}: missing Cache-Control header"
  }

  if ($cacheControl.ToLowerInvariant() -notmatch "no-store") {
    throw "Route parity failed for ${route}: Cache-Control does not include no-store ($cacheControl)"
  }

  if ($routeMarkers.ContainsKey($route)) {
    $expectedMarker = $routeMarkers[$route]
    if ($content -notmatch [regex]::Escape($expectedMarker)) {
      throw "Route parity failed for ${route}: missing expected route marker ($expectedMarker)"
    }
  }

  if ($content -match 'data-request-layout-route=') {
    if ($content -notmatch "data-request-layout-contract=""$([regex]::Escape($ExpectedContractVersion))""") {
      throw "Route parity failed for ${route}: missing expected layout contract marker"
    }
  }

  foreach ($signature in $staleLayoutSignatures) {
    if ($content.Contains($signature)) {
      throw "Route parity failed for ${route}: stale right-rail signature found ($signature)"
    }
  }

  $results += [PSCustomObject]@{
    Route = $route
    StatusCode = $response.StatusCode
    CacheControl = $cacheControl
    CfCacheStatus = [string]$response.Headers["CF-Cache-Status"]
    ETag = [string]$response.Headers["ETag"]
    LastModified = [string]$response.Headers["Last-Modified"]
    Contract = $ExpectedContractVersion
    Result = "pass"
  }
}

Write-Host "Request layout parity verification passed:"
$results | Format-Table -AutoSize | Out-String | Write-Host

if (-not [string]::IsNullOrWhiteSpace($OutputPath)) {
  $directory = Split-Path -Parent $OutputPath
  if (-not [string]::IsNullOrWhiteSpace($directory) -and -not (Test-Path -LiteralPath $directory)) {
    New-Item -ItemType Directory -Path $directory -Force | Out-Null
  }

  $payload = [PSCustomObject]@{
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    targetHost = $TargetHost
    expectedContractVersion = $ExpectedContractVersion
    routes = $results
  }

  $payload | ConvertTo-Json -Depth 5 | Set-Content -Path $OutputPath -Encoding UTF8
  Write-Host "Saved parity report to $OutputPath"
}
