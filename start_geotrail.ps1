$Python = "$env:USERPROFILE\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if (-not (Test-Path $Python)) {
  Write-Error "Bundled Python was not found at $Python"
  exit 1
}

& $Python server.py
