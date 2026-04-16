param(
  [switch]$Api,
  [switch]$Db
)

$profiles = @()
if ($Api) { $profiles += '--profile api' }
if ($Db) { $profiles += '--profile db' }
$profileArgs = $profiles -join ' '

$cmd = "docker compose -f compose.test.yaml --env-file .env.test -p robinson-test $profileArgs up --build -d --remove-orphans"
Write-Host "Running: $cmd"
Invoke-Expression $cmd
