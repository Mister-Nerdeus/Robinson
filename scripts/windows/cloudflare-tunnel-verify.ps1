param(
  [Parameter(Mandatory = $true)]
  [string]$PublicHostname,

  [string]$LocalAppUrl = "http://localhost:3001",
  [string]$MailpitUrl = "http://localhost:4001",
  [int]$TimeoutSec = 15
)

function Test-Url {
  param(
    [Parameter(Mandatory = $true)] [string]$Url,
    [int]$TimeoutSec = 15
  )

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec
    return [pscustomobject]@{
      Url        = $Url
      Success    = $true
      StatusCode = [int]$response.StatusCode
      Error      = $null
    }
  }
  catch {
    $statusCode = $null
    if ($_.Exception.Response -and $_.Exception.Response.StatusCode) {
      $statusCode = [int]$_.Exception.Response.StatusCode
    }

    return [pscustomobject]@{
      Url        = $Url
      Success    = $false
      StatusCode = $statusCode
      Error      = $_.Exception.Message
    }
  }
}

$publicUrl = "https://$PublicHostname"

Write-Host "Cloudflare Tunnel Demo Verification"
Write-Host "- Local app target: $LocalAppUrl"
Write-Host "- Public hostname target: $publicUrl"
Write-Host "- Mailpit awareness target (must remain local-only): $MailpitUrl"
Write-Host ""

$localResult = Test-Url -Url $LocalAppUrl -TimeoutSec $TimeoutSec
$mailpitResult = Test-Url -Url $MailpitUrl -TimeoutSec $TimeoutSec
$publicResult = Test-Url -Url $publicUrl -TimeoutSec $TimeoutSec

$summary = @(
  [pscustomobject]@{ Check = "Local app"; Url = $localResult.Url; Success = $localResult.Success; Status = $localResult.StatusCode; Error = $localResult.Error },
  [pscustomobject]@{ Check = "Public hostname"; Url = $publicResult.Url; Success = $publicResult.Success; Status = $publicResult.StatusCode; Error = $publicResult.Error },
  [pscustomobject]@{ Check = "Mailpit local awareness"; Url = $mailpitResult.Url; Success = $mailpitResult.Success; Status = $mailpitResult.StatusCode; Error = $mailpitResult.Error }
)

$summary | Format-Table -AutoSize

Write-Host ""
Write-Host "Security reminders:"
Write-Host "- Public route must map only to $LocalAppUrl"
Write-Host "- Do NOT publish Mailpit ($MailpitUrl)"
Write-Host "- No tunnel secrets/tokens should be committed"

$pass = $localResult.Success -and $publicResult.Success
if ($pass) {
  Write-Host ""
  Write-Host "RESULT: PASS (local + public checks succeeded)"
  exit 0
}
else {
  Write-Host ""
  Write-Host "RESULT: FAIL (one or more required checks failed)"
  exit 1
}
