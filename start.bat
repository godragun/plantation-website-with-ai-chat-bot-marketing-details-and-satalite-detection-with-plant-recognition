@echo off
setlocal EnableExtensions EnableDelayedExpansion

echo Starting Plantation Management System...

rem Ensure we run from the script directory
cd /d "%~dp0"

set "BACKEND_DIR=backend"
set "FRONTEND_DIR=frontend"
set "VENV_PY=%CD%\%BACKEND_DIR%\venv\Scripts\python.exe"

rem Resolve Python executable: prefer venv, else py -3, else python
set "PYTHON_EXE="
if exist "%VENV_PY%" (
    set "PYTHON_EXE=%VENV_PY%"
    echo Using Python from backend virtual environment: "%PYTHON_EXE%"
) else (
    where py >nul 2>&1 && (
        set "PYTHON_EXE=py -3"
        echo Using Python launcher: %PYTHON_EXE%
    ) || (
        set "PYTHON_EXE=python"
        echo Using system Python: %PYTHON_EXE%
    )
)

echo.
echo 1) Verifying backend dependencies...
call %PYTHON_EXE% -c "import importlib,sys; sys.exit(0 if all(importlib.util.find_spec(m) for m in ['fastapi','uvicorn','pydantic']) else 1)"
if %errorlevel% neq 0 (
    echo Installing backend dependencies...
    call %PYTHON_EXE% -m pip install -r "%BACKEND_DIR%\requirements.txt"
    if %errorlevel% neq 0 (
        echo Failed to install backend dependencies. Exiting.
        pause
        exit /b 1
    )
)

echo.
echo 2) Starting Backend (FastAPI)...
start "Backend Server" cmd /k "cd /d \"%CD%\%BACKEND_DIR%\" && %PYTHON_EXE% main.py"

rem Wait until backend port 8000 is listening (max 20s)
call :WaitForPort 8000 20 "Backend"

echo.
echo 3) Starting Frontend static server...

rem Pick an available port starting at 3000
set "PORT=3000"
call :IsPortBusy %PORT%
if not "%PORT_BUSY%"=="0" (
    set "PORT=3001"
    call :IsPortBusy %PORT%
)

start "Frontend Server" cmd /k "cd /d \"%CD%\%FRONTEND_DIR%\" && %PYTHON_EXE% -m http.server %PORT% --bind 127.0.0.1"

rem Wait until frontend port is listening (max 20s)
call :WaitForPort %PORT% 20 "Frontend"

echo.
echo 4) Opening application in browser...
rem Verify the frontend is actually responding; if not, fallback to file
set "_STATUS_CODE="
for /f "usebackq tokens=*" %%s in (`powershell -NoProfile -Command "try{(iwr -UseBasicParsing -TimeoutSec 5 http://127.0.0.1:%PORT%/).StatusCode}catch{''}"`) do set "_STATUS_CODE=%%s"
if "%_STATUS_CODE%"=="200" (
    start http://127.0.0.1:%PORT%/
) else (
    echo Frontend URL did not respond (status: %_STATUS_CODE%). Opening file directly...
    start "" "%CD%\%FRONTEND_DIR%\index.html"
)

echo.
echo System started successfully!
echo Backend API: http://localhost:8000
echo Frontend:     http://localhost:%PORT%
echo API Docs:     http://localhost:8000/docs
echo.
echo Close the server windows to stop the system.
echo.
pause
exit /b 0

:IsPortBusy
rem Sets PORT_BUSY=0 if free, 1 if occupied
set "PORT_BUSY=0"
for /f "tokens=*" %%a in ('netstat -ano ^| findstr /R ":%1[ ]" ^| findstr LISTENING') do (
    set "PORT_BUSY=1"
)
exit /b 0

:WaitForPort
rem %1 port, %2 max seconds, %3 label
setlocal EnableDelayedExpansion
set "_PORT=%1"
set "_MAX=%2"
set "_LABEL=%~3"
set "_i=0"
:_wait_loop
for /f "tokens=*" %%a in ('netstat -ano ^| findstr /R ":!_PORT![ ]" ^| findstr LISTENING') do (
    echo !_LABEL! is listening on port !_PORT!.
    endlocal & exit /b 0
)
set /a _i+=1
if !_i! geq !_MAX! (
    echo Timeout waiting for !_LABEL! to listen on port !_PORT!.
    if /I "!_LABEL!"=="Frontend" (
        echo Opening frontend directly without server as a fallback...
        start "" "%CD%\%FRONTEND_DIR%\index.html"
    )
    endlocal & exit /b 1
)
timeout /t 1 /nobreak >nul
goto :_wait_loop
