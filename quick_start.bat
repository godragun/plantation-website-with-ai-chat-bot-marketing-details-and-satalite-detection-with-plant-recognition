@echo off
echo 🚀 Plantation Management System - Quick Start
echo ============================================

echo.
echo 📋 Checking system requirements...

:: Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Python is installed

:: Check if required files exist
if not exist "backend\main.py" (
    echo ❌ Backend files not found
    pause
    exit /b 1
)

if not exist "frontend\index.html" (
    echo ❌ Frontend files not found
    pause
    exit /b 1
)

echo ✅ All files present

echo.
echo 🔧 Installing dependencies...
cd backend
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)

echo ✅ Backend dependencies installed

cd ..

echo.
echo 🚀 Starting the system...

:: Start backend in background
echo Starting backend server...
cd backend
start "Plantation Backend" cmd /k "python main.py"

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start frontend
echo Starting frontend server...
cd ..\frontend
start "Plantation Frontend" cmd /k "python -m http.server 3000"

:: Wait for servers to start
echo Waiting for servers to start...
timeout /t 5 /nobreak >nul

echo.
echo 🧪 Running system tests...
cd ..
python test_system.py

echo.
echo 🌐 Opening application in browser...
timeout /t 2 /nobreak >nul
start http://localhost:3000

echo.
echo ✅ System started successfully!
echo.
echo 📱 Access your application:
echo    Frontend: http://localhost:3000
echo    Backend API: http://localhost:8000
echo    API Documentation: http://localhost:8000/docs
echo.
echo 💡 Features available:
echo    - Crop disease detection with AI
echo    - Agricultural chatbot
echo    - Weather monitoring
echo    - Market price tracking
echo    - Satellite view with NDVI
echo    - Multi-language support (English/Sinhala)
echo.
echo Press any key to exit...
pause >nul
