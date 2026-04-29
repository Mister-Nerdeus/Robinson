param(
  [string]$PublicHostname = "robinson-demo.hearthcore.app",
  [string]$ConfigPath = "$env:USERPROFILE\.cloudflared\config.yml",
  [string]$LogDirectory = "$env:USERPROFILE\.cloudflared",
  [int]$StartupWaitSec = 6,
  [int]$RequestTimeoutSec = 15
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-Http {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [int]$TimeoutSec = 15
  )

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec
    return [pscustomobject]@{
      Success = $true
      StatusCode = [int]$response.StatusCode
      Body = [string]$response.Content
      Error = $null
    }
  }
  catch {
    $statusCode = $null
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      $statusCode = [int]$_.Exception.Response.StatusCode
    }

    return [pscustomobject]@{
      Success = $false
      StatusCode = $statusCode
      Body = ""
      Error = $_.Exception.Message
    }
  }
}

if (-not (Test-Path -LiteralPath $ConfigPath)) {
  throw "Missing tunnel config: $ConfigPath"
}

$cloudflared = Get-Command cloudflared -ErrorAction Stop
$publicUrl = "https://$PublicHostname"
$serviceExists = $false
$serviceRunning = $false

$serviceRaw = & sc.exe query cloudflared 2>$null
if ($LASTEXITCODE -eq 0) {
  $serviceExists = $true
  $serviceRunning = ($serviceRaw | Select-String -Pattern "STATE\s+:\s+\d+\s+RUNNING").Count -gt 0
}

if ($serviceExists -and -not $serviceRunning) {
  Write-Host "Starting cloudflared service..."
  & sc.exe start cloudflared | Out-Null
  Start-Sleep -Seconds $StartupWaitSec
}
elseif (-not $serviceExists) {
  $currentProcesses = Get-CimInstance Win32_Process -Filter "Name = 'cloudflared.exe'" -ErrorAction SilentlyContinue
  $hasTunnelRun = $false
  foreach ($proc in $currentProcesses) {
    if ($proc.CommandLine -and $proc.CommandLine -match "\btunnel\b" -and $proc.CommandLine -match "\brun\b") {
      $hasTunnelRun = $true
      break
    }
  }

  if (-not $hasTunnelRun) {
    if (-not (Test-Path -LiteralPath $LogDirectory)) {
      New-Item -ItemType Directory -Path $LogDirectory -Force | Out-Null
    }

    $outLog = Join-Path $LogDirectory "cloudflared-runtime.out.log"
    $errLog = Join-Path $LogDirectory "cloudflared-runtime.err.log"
    Write-Host "Launching cloudflared user-mode process..."
    Start-Process `
      -FilePath $cloudflared.Source `
      -ArgumentList @("tunnel", "--config=`"$ConfigPath`"", "--loglevel", "info", "run") `
      -WindowStyle Hidden `
      -RedirectStandardOutput $outLog `
      -RedirectStandardError $errLog | Out-Null
    Start-Sleep -Seconds $StartupWaitSec
  }
}

$publicResult = Test-Http -Url $publicUrl -TimeoutSec $RequestTimeoutSec
$has1033Marker = $publicResult.Body -match "Error 1033"

Write-Host ""
Write-Host "Cloudflare Tunnel Recovery Check"
Write-Host "- Public URL: $publicUrl"
Write-Host "- Service exists: $serviceExists"
Write-Host "- Service running: $serviceRunning"
Write-Host "- HTTP status: $($publicResult.StatusCode)"

if ($publicResult.Success -and -not $has1033Marker) {
  Write-Host "RESULT: PASS"
  exit 0
}

if ($has1033Marker) {
  throw "Public hostname still returns Cloudflare Error 1033."
}

if (-not $publicResult.Success) {
  throw "Public hostname check failed: $($publicResult.Error)"
}

throw "Public hostname check did not pass."
