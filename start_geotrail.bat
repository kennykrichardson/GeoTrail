@echo off
cd /d "%~dp0"
set "PYTHON=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
if not exist "%PYTHON%" (
  echo Bundled Python was not found at:
  echo %PYTHON%
  pause
  exit /b 1
)
"%PYTHON%" server.py
pause
