param(
  [switch]$Api,
  [switch]$Db,
  [switch]$RemoveVolumes
)

$profiles = @()
if ($Api) { $profiles += '--profile api' }
if ($Db) { $profiles += '--profile db' }
$profileArgs = $profiles -join ' '
$extra = if ($RemoveVolumes) { '--volumes' } else { '' }
$cmd = "docker compose -f compose.yaml --env-file .env.test -p robinson-test $profileArgs down $extra"
Write-Host "Running: $cmd"
Invoke-Expression $cmd
