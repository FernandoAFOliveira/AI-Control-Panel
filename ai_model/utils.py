# Control-Panel/ai_model/utils.py
"""Utility functions shared across ai_model modules.

To load shared project settings:
    from ai_model.utils import load_settings
    settings = load_settings()
    model = settings.get("default_model")
    memory = settings.get("memory_path")
"""


import os
import json
from runtime_config import get
model_name = get("local_model.active")

def mask_api_key(key: str) -> str:
    if not key or len(key) < 6:
        return "[REDACTED]"
    return key[:4] + "..." + key[-2:]

def warn_if_env_leaking(name: str, value: str):
    if value and value in os.environ.get(name, ''):
        print(f"🔐 Warning: {name} appears in the environment — be cautious about logging or sharing this value.")

def load_settings():
    """Load settings from Control-Panel/settings.json and return as dict."""
    base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    path = os.path.join(base, "settings.json")
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        print(f"⚠️ Could not load settings.json: {e}")
        return {}

