param(
  [string]$MainHost = "https://robinson.hearthcore.app",
  [string]$DevelopHost = "https://robinson-demo.hearthcore.app",
  [string]$RequestLayoutContractVersion = "form-first-full-width-v2",
  [string]$MainProject = "robinson-main",
  [string]$DevelopProject = "robinson-develop",
  [int]$MainPort = 3010,
  [int]$DevelopPort = 3011
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Test-Url {
  param([string]$Url)

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 20
    [PSCustomObject]@{
      Url = $Url
      StatusCode = $response.StatusCode
      Ok = $response.StatusCode -ge 200 -and $response.StatusCode -lt 400
      Content = $response.Content
    }
  } catch {
    [PSCustomObject]@{
      Url = $Url
      StatusCode = -1
      Ok = $false
      Content = ""
    }
  }
}

function Get-RuntimeProof {
  param([string]$Endpoint)

  $response = Invoke-WebRequest -Uri "$Endpoint/api/runtime-proof" -UseBasicParsing -TimeoutSec 20
  return $response.Content | ConvertFrom-Json
}

function Get-JsonPropertyValue {
  param(
    [object]$Object,
    [string]$Name
  )

  $prop = $Object.PSObject.Properties[$Name]
  if ($null -eq $prop) {
    return ""
  }

  return [string]$prop.Value
}

function Show-Project {
  param(
    [string]$Name,
    [int]$ExpectedPort
  )

  $rows = docker ps --filter "label=com.docker.compose.project=$Name" --format "{{.Names}}|{{.Status}}|{{.Ports}}"
  if (-not $rows) {
    throw "No running containers found for project $Name"
  }

  Write-Host "Project: $Name"
  $rows | ForEach-Object { Write-Host "  $_" }

  $joined = ($rows -join " ")
  if ($joined -notmatch ":$ExpectedPort->") {
    throw "Expected external port $ExpectedPort for project $Name"
  }
}

$mainHostCheck = Test-Url -Url $MainHost
$developHostCheck = Test-Url -Url $DevelopHost

Write-Host "Main host check: $($mainHostCheck.Url) status=$($mainHostCheck.StatusCode)"
Write-Host "Develop host check: $($developHostCheck.Url) status=$($developHostCheck.StatusCode)"

if (-not $mainHostCheck.Ok) { throw "Main host did not respond with success status" }
if (-not $developHostCheck.Ok) { throw "Develop host did not respond with success status" }

$mainProof = Get-RuntimeProof -Endpoint $MainHost
$developProof = Get-RuntimeProof -Endpoint $DevelopHost

if ($mainProof.mode -ne "production" -or $mainProof.branchIntent -ne "main" -or -not $mainProof.seoAllowIndexing) {
  throw "Main runtime-proof identity mismatch"
}

if ($developProof.mode -ne "demo" -or $developProof.branchIntent -ne "develop" -or $developProof.seoAllowIndexing) {
  throw "Develop runtime-proof identity mismatch"
}

if (
  [string]::IsNullOrWhiteSpace($developProof.deploymentProvenance.commitSha) -or
  [string]::IsNullOrWhiteSpace($developProof.deploymentProvenance.ref) -or
  [string]::IsNullOrWhiteSpace($developProof.deploymentProvenance.buildTimestampUtc)
) {
  throw "Develop runtime-proof must include nonblank provenance fields"
}

Write-Host "Main proof: mode=$($mainProof.mode) branchIntent=$($mainProof.branchIntent) seoAllowIndexing=$($mainProof.seoAllowIndexing)"
Write-Host "Develop proof: mode=$($developProof.mode) branchIntent=$($developProof.branchIntent) seoAllowIndexing=$($developProof.seoAllowIndexing)"

if ((Get-JsonPropertyValue -Object $mainProof -Name "requestLayoutContractVersion") -ne $RequestLayoutContractVersion) {
  throw "Main runtime-proof layout contract mismatch"
}

if ((Get-JsonPropertyValue -Object $developProof -Name "requestLayoutContractVersion") -ne $RequestLayoutContractVersion) {
  throw "Develop runtime-proof layout contract mismatch"
}

& "$PSScriptRoot/verify-request-layout-parity.ps1" -TargetHost $MainHost -ExpectedContractVersion $RequestLayoutContractVersion
& "$PSScriptRoot/verify-request-layout-parity.ps1" -TargetHost $DevelopHost -ExpectedContractVersion $RequestLayoutContractVersion

Show-Project -Name $MainProject -ExpectedPort $MainPort
Show-Project -Name $DevelopProject -ExpectedPort $DevelopPort

Write-Host "Host routing verification passed."
