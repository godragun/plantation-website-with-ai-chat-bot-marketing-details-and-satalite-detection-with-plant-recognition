@echo off
echo Starting Plantation Management System...

echo Starting Backend...
start "Backend" cmd /k "cd /d %~dp0backend && py -3 -m uvicorn main:app --host 0.0.0.0 --port 8000"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Frontend" cmd /k "cd /d %~dp0frontend && py -3 -m http.server 3001 --bind 127.0.0.1"

echo Waiting for frontend to start...
timeout /t 3 /nobreak >nul

echo Opening browser...
start http://127.0.0.1:3001

echo.
echo System started!
echo Backend: http://127.0.0.1:8000
echo Frontend: http://127.0.0.1:3001
echo.
pause

