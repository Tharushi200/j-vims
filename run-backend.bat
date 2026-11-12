@echo off
title J-VIMS Backend (Spring Boot)
echo ========================================================
echo   Starting J-VIMS Spring Boot Backend Service...
echo ========================================================

set "PATH=C:\Program Files\JetBrains\IntelliJ IDEA Community Edition 2024.2.1\plugins\maven\lib\maven3\bin;%PATH%"

cd /d "%~dp0"
if exist pom.xml (
    mvn spring-boot:run
) else if exist backend\pom.xml (
    cd backend
    mvn spring-boot:run
)

pause

