# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import system
from backend.routers.logs import router as logs_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
        ],  # Vite dev server origin
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(system.router)
app.include_router(logs_router)# or include_router(..., prefix="/api")

@app.get("/api/status")
def get_status():
    return {
        "ai_model": "ready",
        "task_engine": "idle",
        "cpu": 0.0,
        "ram": 37.0
    }

