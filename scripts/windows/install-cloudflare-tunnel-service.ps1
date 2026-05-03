param(
  [string]$TunnelId = "",
  [string]$SourceConfigPath = "$env:USERPROFILE\.cloudflared\config.yml",
  [string]$SourceCredentialPath = "",
  [string]$SourceCertPath = "$env:USERPROFILE\.cloudflared\cert.pem",
  [string]$ServiceBinDirectory = "C:\Cloudflared\bin",
  [string]$ServiceConfigDirectory = "C:\Windows\System32\config\systemprofile\.cloudflared"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-IsAdministrator {
  $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($identity)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Assert-PathExists {
  param(
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Label
  )

  if (-not (Test-Path -LiteralPath $Path)) {
    throw "$Label not found: $Path"
  }
}

if (-not (Test-IsAdministrator)) {
  throw "This script must be run from an elevated Administrator PowerShell session."
}

Assert-PathExists -Path $SourceConfigPath -Label "Source config"
Assert-PathExists -Path $SourceCertPath -Label "Source cert"

$rawConfig = Get-Content -LiteralPath $SourceConfigPath -Raw
if ($rawConfig -notmatch "(?m)^\s*tunnel\s*:\s*(?<tunnel>[^\s#]+)") {
  throw "Source config is missing required 'tunnel' entry."
}

if (-not $TunnelId) {
  $TunnelId = $Matches["tunnel"].Trim().Trim("'").Trim('"')
}

if (-not $SourceCredentialPath) {
  $SourceCredentialPath = Join-Path "$env:USERPROFILE\.cloudflared" "$TunnelId.json"
}

Assert-PathExists -Path $SourceCredentialPath -Label "Source credentials"

$cloudflaredCommand = Get-Command cloudflared -ErrorAction Stop
$sourceBinaryPath = $cloudflaredCommand.Source
Assert-PathExists -Path $sourceBinaryPath -Label "cloudflared binary"

$serviceBinaryPath = Join-Path $ServiceBinDirectory "cloudflared.exe"
$serviceConfigPath = Join-Path $ServiceConfigDirectory "config.yml"
$serviceCredentialPath = Join-Path $ServiceConfigDirectory "$TunnelId.json"
$serviceCertPath = Join-Path $ServiceConfigDirectory "cert.pem"

New-Item -ItemType Directory -Path $ServiceBinDirectory -Force | Out-Null
New-Item -ItemType Directory -Path $ServiceConfigDirectory -Force | Out-Null

Copy-Item -LiteralPath $sourceBinaryPath -Destination $serviceBinaryPath -Force
Copy-Item -LiteralPath $SourceCredentialPath -Destination $serviceCredentialPath -Force
Copy-Item -LiteralPath $SourceCertPath -Destination $serviceCertPath -Force

if ($rawConfig -match "(?m)^\s*credentials-file\s*:") {
  $rawConfig = [regex]::Replace(
    $rawConfig,
    "(?m)^\s*credentials-file\s*:\s*.*$",
    "credentials-file: '$serviceCredentialPath'"
  )
}
else {
  $rawConfig = $rawConfig.TrimEnd() + "`r`ncredentials-file: '$serviceCredentialPath'`r`n"
}

Set-Content -LiteralPath $serviceConfigPath -Value $rawConfig -Encoding UTF8

Push-Location $ServiceBinDirectory
try {
  & $serviceBinaryPath service install
}
finally {
  Pop-Location
}

$serviceImagePath = "`"$serviceBinaryPath`" --config=`"$serviceConfigPath`" tunnel run"
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\cloudflared" -Name ImagePath -Value $serviceImagePath

& $serviceBinaryPath tunnel --config="$serviceConfigPath" ingress validate | Out-Host

$service = Get-Service cloudflared -ErrorAction SilentlyContinue
if ($service -and $service.Status -eq "Running") {
  Stop-Service cloudflared -Force
}

Start-Service cloudflared
Start-Sleep -Seconds 4

$finalService = Get-Service cloudflared -ErrorAction Stop
$registryImagePath = (Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\cloudflared").ImagePath

Write-Host ""
Write-Host "Cloudflare service install complete"
Write-Host "- Service status: $($finalService.Status)"
Write-Host "- Binary: $serviceBinaryPath"
Write-Host "- Config: $serviceConfigPath"
Write-Host "- Credentials: $serviceCredentialPath"
Write-Host "- ImagePath: $registryImagePath"
