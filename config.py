# Control-Panel/config.py
"""
Configuration loader for environment variables and user-defined runtime settings.
Supports .env for secrets and settings.json for runtime behavior.
"""

import os
import json
from dotenv import load_dotenv

# Load .env into os.environ
load_dotenv()

# Load JSON settings
DEFAULT_SETTINGS = {
    "max_fallback_log_size_mb": 2,
    "default_model": "llama3",
    "fallback_model": "gpt-4",
    "check_interval_seconds": 1,
    "confidence_threshold": 0.5,
    "log_retention_days": 30
}

SETTINGS_PATH = os.path.join(os.path.dirname(__file__), "settings.json")

try:
    with open(SETTINGS_PATH, "r", encoding="utf-8") as f:
        user_settings = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    user_settings = {}

# Merge with defaults
SETTINGS = {**DEFAULT_SETTINGS, **user_settings}

# API Key Access
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
USE_OPENAI_FALLBACK = os.getenv("USE_OPENAI_FALLBACK", "true").lower() == "true"

# Derived Settings
MAX_LOG_SIZE_MB = SETTINGS["max_fallback_log_size_mb"]
CONFIDENCE_THRESHOLD = SETTINGS["confidence_threshold"]
DEFAULT_MODEL = SETTINGS["default_model"]
FALLBACK_MODEL = SETTINGS["fallback_model"]

