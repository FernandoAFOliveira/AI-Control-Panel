from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import system

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

app.include_router(system.router)            # or include_router(..., prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Control Panel Backend is running"}
