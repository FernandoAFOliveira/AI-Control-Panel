# task_engine/utils.py
"""
Shared helpers for the Task-Engine layer.
New code should import `get` / `all` from runtime_config directly.
"""

from pathlib import Path
from runtime_config import get, all as _all_cfg

# ----------------------------------------------------------------------
# Back-compat: load_settings()
# ----------------------------------------------------------------------

def load_settings() -> dict:
    """
    Legacy helper; returns the merged runtime + static settings snapshot.
    Will be removed once all callers use runtime_config directly.
    """
    return _all_cfg()

# ----------------------------------------------------------------------
# Paths
# ----------------------------------------------------------------------

def workspace_root() -> Path:
    """
    Absolute path to the workspace folder, e.g. …/Control-Panel/workspace
    The relative folder name comes from settings.json →
        "workspace": { "path": "workspace" }.
    """
    repo_root = Path(__file__).resolve().parent.parent  # Control-Panel/
    ws_rel = get("workspace.path", "workspace")         # default if missing
    return (repo_root / ws_rel).resolve()

def is_within_workspace(path: str | Path) -> bool:
    """
    True if *path* resolves inside workspace_root().
    Uses Path.is_relative_to() when available (Py ≥ 3.9),
    falls back to string-prefix check otherwise.
    """
    ws = workspace_root()
    try:
        return Path(path).resolve().is_relative_to(ws)
    except AttributeError:
        return str(Path(path).resolve()).startswith(str(ws))
