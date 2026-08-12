@echo off
echo Installing Plantation Management System Libraries...
echo.

echo Installing FastAPI and core dependencies...
pip install fastapi uvicorn python-multipart

echo.
echo Installing AI and image processing libraries...
pip install google-generativeai pillow

echo.
echo Installing database and authentication libraries...
pip install sqlalchemy python-jose[cryptography] bcrypt

echo.
echo Installing utility libraries...
pip install python-dotenv requests

echo.
echo Installation complete!
echo.
echo Now you can start the system by running:
echo 1. cd plantation\backend
echo 2. python main.py
echo.
pause
