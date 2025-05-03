# Control-Panel/Backend/main.py
from fastapi import FastAPI
from backend.routers import system

app = FastAPI()
app.include_router(system.router)

@app.get("/")
def read_root():
    return {"message": "Control Panel Backend is running"}

