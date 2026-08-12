@echo off
echo Starting Plantation Management System with Docker...

echo.
echo Building and starting containers...
docker-compose up --build

echo.
echo System started successfully!
echo Frontend: http://localhost:3000
echo Backend API: http://localhost:8000
echo.
pause
