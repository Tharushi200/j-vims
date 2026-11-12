@echo off
title J-VIMS Backend (Spring Boot)
echo ========================================================
echo   Starting J-VIMS Spring Boot Backend Service...
echo ========================================================

set "PATH=C:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2024.2.1\plugins\maven\lib\maven3\bin;%PATH%"

cd /d "%~dp0"
mvn spring-boot:run

pause

