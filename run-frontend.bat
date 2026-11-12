@echo off
title J-VIMS Frontend (React UI)
echo ========================================================
echo   Starting J-VIMS React Client (http://localhost:5173)...
echo ========================================================

cd /d "%~dp0frontend"
npm.cmd run dev

pause

