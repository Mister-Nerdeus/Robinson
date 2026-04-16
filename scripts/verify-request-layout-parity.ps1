param(
  [string]$TargetHost = "https://robinson-demo.hearthcore.app",
  [string]$ExpectedContractVersion = "form-first-full-width-v2",
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

  if ($content -notmatch "data-request-layout-contract=""$([regex]::Escape($ExpectedContractVersion))""") {
    throw "Route parity failed for ${route}: missing expected layout contract marker"
  }

  if ($content -notmatch "data-request-layout-route=""$([regex]::Escape($route))""") {
    throw "Route parity failed for ${route}: missing expected route marker"
  }

  if ($content -notmatch 'data-request-layout-geometry="top-support-then-full-width-form"') {
    throw "Route parity failed for ${route}: missing expected geometry marker"
  }

  if ($content -notmatch 'data-request-layout-zone="full-width-form"') {
    throw "Route parity failed for ${route}: missing full-width form zone marker"
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
    Contract = $ExpectedContractVersion
    Result = "pass"
  }
}

Write-Host "Request layout parity verification passed:"
$results | Format-Table -AutoSize | Out-String | Write-Host
