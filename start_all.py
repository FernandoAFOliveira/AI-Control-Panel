# Control-Panel/start_all.py
"""
Boots the entire stack:
  • Regenerates ai_model/actions.json
  • Task Engine (voice assistant)  –> new terminal
  • Task Monitor                  –> new terminal
  • Backend (FastAPI / Uvicorn)   –> new terminal
  • Model Console                 –> new terminal
  • Front-end (Vite dev server)   –> background process
Warns if .env is missing.
"""

import subprocess
import os
import sys
import time
from pathlib import Path

# ---------------------------------------------------------------------- #
# 0 · Path helpers
# ---------------------------------------------------------------------- #
BASE_DIR = Path(__file__).resolve().parent          # …/Control-Panel
GENERATOR_PATH = BASE_DIR / "ai_model" / "generate_actions_json.py"
ENGINE_PATH    = BASE_DIR / "task_engine" / "voice_assistant.py"
MONITOR_PATH   = BASE_DIR / "task_engine" / "task_monitor.py"
CONSOLE_PATH   = BASE_DIR / "ai_model" / "model_console.py"
FRONTEND_CMD   = ["npm", "run", "dev"]

# ---------------------------------------------------------------------- #
# 1 · Pre-flight
# ---------------------------------------------------------------------- #
if not (BASE_DIR / ".env").exists():
    print("⚠️  ️No .env file found. Copy .env.example and add your secrets.")

print("🔧 Regenerating actions.json from task library…")
subprocess.run([sys.executable, str(GENERATOR_PATH)], check=True)

# ---------------------------------------------------------------------- #
# 2 · Spawn long-running services (each in its own terminal)
# ---------------------------------------------------------------------- #
print("🔧 Starting Local AI Assistant, Backend, and Console…")

def spawn(cmd: str | list[str]):
    # On Windows we launch each service in its own `cmd /k` window.
    if os.name == "nt":
        subprocess.Popen(["start", "cmd", "/k"] + (cmd if isinstance(cmd, list) else [cmd]),
                         shell=True)
    else:                               # macOS / Linux – open plain terminals
        subprocess.Popen(cmd if isinstance(cmd, list) else cmd.split())

spawn([sys.executable, str(ENGINE_PATH)])
time.sleep(1)
spawn([sys.executable, str(MONITOR_PATH)])
spawn("uvicorn backend.main:app --reload")
spawn([sys.executable, str(CONSOLE_PATH)])

# Front-end runs quietly in the background (same terminal)
subprocess.Popen(FRONTEND_CMD, cwd=BASE_DIR / "frontend",
                 shell=(os.name == "nt"))

print("✅ All components launched in separate terminals.")

# ---------------------------------------------------------------------- #
# 3 · Keep parent process alive so VS Code terminals stay open
# ---------------------------------------------------------------------- #
try:
    while True:
        time.sleep(60)
except KeyboardInterrupt:
    print("Shutting down…")
