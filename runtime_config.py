# runtime_config.py
"""
Unified runtime configuration registry.

* Loads secrets from .env
* Loads static defaults from settings.json
* Loads / persists user-editable prefs in workspace/user_prefs.json

Use:
    from runtime_config import get, set, all
"""

from pathlib import Path
import json, os, threading
try:
    from dotenv import load_dotenv              # normal case
except ModuleNotFoundError:                     # fresh clone, no package yet
    def load_dotenv(*args, **kwargs):
        return None                             # graceful fallback


_BASE = Path(__file__).parent
_PREFPATH = _BASE / "workspace" / "user_prefs.json"

# 1 · Secrets
load_dotenv(_BASE / ".env", override=False)

# 2 · Static settings (committed)
_STATIC = json.loads((_BASE / "settings.json").read_text())

# 3 · Runtime prefs (hot-swappable)
_RUNNING = {}
_LOCK = threading.RLock()


def _load_runtime() -> None:
    if _PREFPATH.exists():
        _RUNNING.update(json.loads(_PREFPATH.read_text()))


_load_runtime()


# ---------- Public API ---------- #

def get(key: str, default=None):
    """Read a single value, checking runtime prefs first, then static settings."""
    with _LOCK:
        return _RUNNING.get(key, _STATIC.get(key, default))


def set(key: str, value):
    """Update a runtime value and persist it immediately."""
    with _LOCK:
        _RUNNING[key] = value
        _PREFPATH.parent.mkdir(parents=True, exist_ok=True)
        _PREFPATH.write_text(json.dumps(_RUNNING, indent=2))


def all() -> dict:
    """Merged read-only snapshot (runtime overrides static)."""
    with _LOCK:
        merged = _STATIC.copy()
        merged.update(_RUNNING)
        return merged

