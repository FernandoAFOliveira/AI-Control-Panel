# backend/routers/logs.py
import asyncio
from pathlib import Path
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

router = APIRouter(tags=["logs"])

# Adjust this path if you want a different log file
ROOT = Path(__file__).resolve().parent.parent.parent   # Control-Panel/
LOG_PATH = ROOT / "logs" / "model_console.log"

async def log_generator():
    # open in text mode, seek to end, then yield new lines as they appear
    with open(LOG_PATH, "r", encoding="utf-8") as f:
        f.seek(0, 2)
        while True:
            line = f.readline()
            if line:
                yield line
            else:
                await asyncio.sleep(0.5)

@router.get("/logs/stream")
async def stream_logs():
    return StreamingResponse(log_generator(), media_type="text/plain")
