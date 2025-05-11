# backend/routers/system.py
import psutil
import pathlib
import json
from fastapi import APIRouter, HTTPException
from runtime_config import all as get_cfg, set as cfg_set


router = APIRouter(tags=["system"])

@router.get("/config")
def read_config():
    return get_cfg()

@router.patch("/config")
def update_config(patch: dict):
    allowed = {"compute_profile", "local_model.active", "cloud_chain", "cloud_policy"}
    unknown = set(patch) - allowed
    if unknown:
        raise HTTPException(400, f"Unknown keys: {', '.join(unknown)}")
    for k, v in patch.items():
        cfg_set(k, v)
    return get_cfg()

@router.get("/status")
def read_status():
    return {
        "ai_model": "ready",        # TODO: wire real heartbeat later
        "task_engine": "idle",
        "cpu": psutil.cpu_percent(),          # 37
        "ram": psutil.virtual_memory().percent  # 62
    }
