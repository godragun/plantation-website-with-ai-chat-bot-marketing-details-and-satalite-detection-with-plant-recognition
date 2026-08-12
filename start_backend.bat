@echo off
cd /d %~dp0backend
echo Starting Backend Server...
py -3 -c "import uvicorn; uvicorn.run('main:app', host='0.0.0.0', port=8000, log_level='info')"
pause

