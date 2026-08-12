# AgriVista — Plantation Management System

AI-assisted farm management with FastAPI, a static React frontend, and Gemini-powered disease detection/chatbot. Includes weather, market prices, satellite maps, and Sinhala localization.

## Features

- JWT auth with roles (farmer/admin)
- Farm/crop management with soil readings
- Gemini AI disease detection and agri chatbot (mock fallbacks when keys are missing)
- Weather (OpenWeather) and market prices (Alpha Vantage) with graceful mocks
- Redesigned AgriVista UI (sidebar navigation, crop cards, responsive mobile nav)
- PWA-ready static frontend (Leaflet maps, offline cache)
- Firebase Function endpoints for Gemini as an alternative deployment path

## Architecture

- Backend: FastAPI + SQLite (dev) with image uploads and JWT auth
- Frontend: static files served via simple HTTP server or any static host
- Serverless: `functions/main.py` for Firebase/Cloud Functions
- Docker: backend and frontend services via `docker-compose.yml`

## Prerequisites

- Python 3.12+ (recommended)
- Docker Desktop (optional)

## Setup (local)

1. Clone/fork the repo.
2. Create `backend/.env` from the example (do **not** commit this file):

```bash
cp backend/env_example.txt backend/.env
```

```
SECRET_KEY=generate-a-long-random-string
GEMINI_API_KEY=
OPENWEATHER_API_KEY=
ALPHA_VANTAGE_API_KEY=
```

3. Install backend deps:

```bash
cd backend
python -m pip install -r requirements.txt
```

4. Run the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

5. Run the frontend (static):

```bash
cd ../frontend
python -m http.server 3001 --bind 127.0.0.1
```

6. Open:
- Frontend: http://127.0.0.1:3001
- API docs: http://127.0.0.1:8000/docs

Windows shortcut: `start_app.bat` starts both servers.

## Docker

1. Create a `.env` at the project root with the same keys as above.
2. Start:

```bash
docker-compose up --build
```

3. Open http://127.0.0.1:3000 (frontend) and http://127.0.0.1:8000 (API).

## Secrets policy

- **No real API keys are stored in this repository.**
- Git history was rewritten to remove secret material; use environment variables only.
- Keep `.env` files private; `.gitignore` blocks them from being committed.
- Backend falls back to mock weather/market data and canned chatbot replies when keys are missing.

## Useful scripts

- `start_app.bat` — backend + static frontend (Windows)
- `start_backend.bat` — backend only
- `start_docker.bat` — docker-compose wrapper

## Project structure

```
plantation/
├─ backend/          # FastAPI app, DB, uploads
├─ frontend/         # Static assets, styles, PWA files
├─ functions/        # Firebase/Cloud Functions entry
├─ pic of project/   # Screenshots
├─ docker-compose.yml
└─ README.md
```

## Contributing

Feel free to open issues or PRs. Keep secrets out of version control and use environment variables for configuration.
