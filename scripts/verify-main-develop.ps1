param(
  [string]$MainHost = "https://robinson.hearthcore.app",
  [string]$DevelopHost = "https://robinson-demo.hearthcore.app",
  [string]$DevelopReviewAccessKey = ""
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-StatusCode {
  param([string]$Url)

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 20
    return [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      return [int]$_.Exception.Response.StatusCode
    }
    return -1
  }
}

& "$PSScriptRoot/verify-host-routing.ps1" -MainHost $MainHost -DevelopHost $DevelopHost

Write-Host "`nRuntime identity snapshots"
$mainProof = (Invoke-WebRequest -Uri "$MainHost/api/runtime-proof" -UseBasicParsing -TimeoutSec 20).Content | ConvertFrom-Json
$developProof = (Invoke-WebRequest -Uri "$DevelopHost/api/runtime-proof" -UseBasicParsing -TimeoutSec 20).Content | ConvertFrom-Json

Write-Host "Main proofLevel=$($mainProof.proofLevel) mode=$($mainProof.mode) branchIntent=$($mainProof.branchIntent)"
Write-Host "Develop proofLevel=$($developProof.proofLevel) mode=$($developProof.mode) branchIntent=$($developProof.branchIntent)"

$mainAdminAnonStatus = Get-StatusCode -Url "$MainHost/admin/submissions"
$developAdminAnonStatus = Get-StatusCode -Url "$DevelopHost/admin/submissions"

Write-Host "Main anonymous admin status: $mainAdminAnonStatus"
Write-Host "Develop anonymous admin status: $developAdminAnonStatus"

if ($mainAdminAnonStatus -lt 400) {
  throw "Main must not expose /admin/submissions"
}

if ($developAdminAnonStatus -lt 400) {
  throw "Develop must block anonymous /admin/submissions"
}

if (-not [string]::IsNullOrWhiteSpace($DevelopReviewAccessKey)) {
  $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
  $authorized = Invoke-WebRequest -Uri "$DevelopHost/admin/submissions?review_access=$DevelopReviewAccessKey" -WebSession $session -MaximumRedirection 5 -UseBasicParsing -TimeoutSec 20
  Write-Host "Develop authorized admin status: $($authorized.StatusCode)"

  if ($authorized.StatusCode -lt 200 -or $authorized.StatusCode -ge 400) {
    throw "Develop authorized admin access failed"
  }
}

Write-Host "`nDual-environment quick verification passed."