# Control-Panel/ai_model/generate_actions_json.py
"""
Scans task_library.py for defined actions and docstrings, then generates ai_model/actions.json.
Intended to run automatically during startup or build.
"""

import os
import sys
import json
import inspect

# Ensure we can import from assistant/
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from task_engine.task_library import ACTIONS
from logger import log



OUTPUT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "actions.json"))

def get_function_signature(func):
    sig = inspect.signature(func)
    return list(sig.parameters.keys())

def extract_description(func):
    doc = inspect.getdoc(func)
    return doc.strip() if doc else "No description."

def build_manifest():
    manifest = {}
    for name, func in ACTIONS.items():
        manifest[name] = {
            "description": extract_description(func),
            "parameters": ["path", "content"],
            "secure": True,
            "example": {
                "action": name,
                "path": "workspace/example"
            }
        }
    return manifest

def write_manifest(data):
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)
    print(f"✅ Wrote manifest to {OUTPUT_PATH}")

if __name__ == "__main__":
    manifest = build_manifest()
    write_manifest(manifest)

