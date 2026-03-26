param(
  [switch]$Api,
  [switch]$Db
)

$profiles = @()
if ($Api) { $profiles += '--profile api' }
if ($Db) { $profiles += '--profile db' }
$profileArgs = $profiles -join ' '

$cmd = "docker compose -f compose.yaml --env-file .env.test -p robinson-test $profileArgs up --build -d"
Write-Host "Running: $cmd"
Invoke-Expression $cmd
