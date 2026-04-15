param(
  [string]$MainHost = "https://robinson.hearthcore.app",
  [string]$DevelopHost = "https://robinson-demo.hearthcore.app",
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
    }
  } catch {
    [PSCustomObject]@{
      Url = $Url
      StatusCode = -1
      Ok = $false
    }
  }
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

Show-Project -Name $MainProject -ExpectedPort $MainPort
Show-Project -Name $DevelopProject -ExpectedPort $DevelopPort

Write-Host "Host routing verification passed."