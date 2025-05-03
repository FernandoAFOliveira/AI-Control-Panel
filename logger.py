# Control-Panel/logger.py
"""
Universal logger for all components (ai_model, task_engine, backend, etc).
Each component writes to its own log file, e.g., ai_model.log, task_engine.log.
Handles message logging, rotation, and archiving via /logs/log_config.json.
Use from anywhere via:
    from logger import log
    log("Something happened", source="ai_model")
"""

import os
import json
import time
from datetime import datetime
from shutil import move

# Load logger settings
CONFIG_PATH = os.path.join("logs", "log_config.json")
LOG_DIR = os.path.join("logs")
ARCHIVE_DIR = os.path.join(LOG_DIR, "archive")
DEFAULT_CONFIG = {
    "max_size_kb": 512,  # 0.5MB
    "log_file": "system.log"
}

def load_config():
    if not os.path.exists(CONFIG_PATH):
        return DEFAULT_CONFIG
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return DEFAULT_CONFIG

def rotate_log_if_needed(path, max_size_kb):
    if os.path.exists(path) and os.path.getsize(path) > max_size_kb * 1024:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        archive_path = os.path.join(ARCHIVE_DIR, f"{timestamp}_{os.path.basename(path)}")
        move(path, archive_path)

def log(message, source="system"):
    os.makedirs(LOG_DIR, exist_ok=True)
    os.makedirs(ARCHIVE_DIR, exist_ok=True)

    config = load_config()
    log_file = os.path.join(LOG_DIR, f"{source}.log")
            
    rotate_log_if_needed(log_file, config.get("max_size_kb", 512))

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"[{timestamp}] [{source}] {message}\n"

    with open(log_file, "a", encoding="utf-8") as f:
        f.write(entry)

