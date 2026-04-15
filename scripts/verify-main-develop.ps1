param(
  [string]$MainHost = "https://robinson.hearthcore.app",
  [string]$DevelopHost = "https://robinson-demo.hearthcore.app"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

& "$PSScriptRoot/verify-host-routing.ps1" -MainHost $MainHost -DevelopHost $DevelopHost

Write-Host "`nRuntime identity snapshots"
$mainHtml = (Invoke-WebRequest -Uri $MainHost -UseBasicParsing -TimeoutSec 20).Content
$developHtml = (Invoke-WebRequest -Uri $DevelopHost -UseBasicParsing -TimeoutSec 20).Content

$mainHasStamp = $mainHtml -match "Deployment Provenance"
$developHasStamp = $developHtml -match "Deployment Provenance"
$developHasCommit = $developHtml -match "Commit:"
$developHasRef = $developHtml -match "Ref:"
$developHasBuild = $developHtml -match "Built \(UTC\):"

Write-Host "Main stamp visible: $mainHasStamp"
Write-Host "Develop stamp visible: $developHasStamp"
Write-Host "Develop provenance fields present: commit=$developHasCommit ref=$developHasRef build=$developHasBuild"

if ($mainHasStamp) {
  throw "Main environment must not expose deployment stamp"
}

if (-not ($developHasStamp -and $developHasCommit -and $developHasRef -and $developHasBuild)) {
  throw "Develop environment must expose full deployment provenance when stamp is visible"
}

Write-Host "`nDual-environment quick verification passed."