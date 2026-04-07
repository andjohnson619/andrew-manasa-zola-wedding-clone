@echo off
REM Run this after closing apps that might lock the folder (e.g. Explorer, editors).
REM Removes the empty duplicate folder left under Cary AI Outputs after the project moved to Cursor AI.

set "TARGET=C:\Users\Andrew S Johnson\OneDrive - McKinsey & Company\Cary - Documents\04 Team Working Folder\Andrew\AI Outputs\andrew-manasa-zola-wedding-clone"

if exist "%TARGET%" (
  rd /s /q "%TARGET%"
  if exist "%TARGET%" (
    echo Could not delete. Close programs using this path and try again.
    pause
    exit /b 1
  )
  echo Deleted: %TARGET%
) else (
  echo Nothing to delete at: %TARGET%
)

pause
