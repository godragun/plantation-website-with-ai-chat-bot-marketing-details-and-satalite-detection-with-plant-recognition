@echo off
echo Starting Plantation Management System...
echo.

echo Installing Python dependencies...
cd backend
pip install fastapi uvicorn python-multipart python-dotenv google-generativeai requests pillow sqlalchemy python-jose[cryptography] bcrypt

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "python main.py"

echo.
echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "python -m http.server 3000"

echo.
echo Waiting 3 seconds for frontend to start...
timeout /t 3 /nobreak > nul

echo.
echo Opening application in browser...
start http://localhost:3000

echo.
echo System started successfully!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
pause
