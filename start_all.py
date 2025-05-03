# Control-Panel/start_all.py
"""Launches the Voice Assistant, Backend API server, and Model Console in separate terminals.
Auto-generates ai_model/actions.json before startup.
Warns if .env file with secrets is missing.
"""

import subprocess
import os
import time
import sys

# Paths to Python scripts
GENERATOR_PATH = os.path.join("ai_model", "generate_actions_json.py")
ENGINE_PATH = os.path.join("task_engine", "voice_assistant.py")
MONITOR_PATH = os.path.join("task_engine", "task_monitor.py")
BACKEND_PATH = os.path.join("backend", "main.py")
CONSOLE_PATH = os.path.join("ai_model", "model_console.py")

# Warn user if .env with secrets is missing
if not os.path.exists(".env"):
    print("⚠️  WARNING: No .env file found. Please create one based on .env.example to enable ChatGPT API access.")

print("🔧 Regenerating actions.json from task library...")
subprocess.run([sys.executable, GENERATOR_PATH], check=True)

print("🔧 Starting Local AI Assistant, Backend, and Console...")

# Start the Task Engine (Voice Assistant)
subprocess.Popen(["start", "cmd", "/k", f"python {ENGINE_PATH}"], shell=True)

# Wait briefly before launching backend and monitor
time.sleep(2)

# Start the Task Monitor
import subprocess

subprocess.Popen(["start", "cmd", "/k", f"python {MONITOR_PATH}"], shell=True)

# Start the Backend
subprocess.Popen(["start", "cmd", "/k", "uvicorn backend.main:app --reload"], shell=True)

# Start the Model Console
subprocess.Popen(["start", "cmd", "/k", f"python {CONSOLE_PATH}"], shell=True)

print("✅ All components launched in separate terminals.")
# ───────────────────────── keep parent process alive ───────────────────────── #
print("✅ All components launched in separate terminals.")
try:
    while True:
        time.sleep(60)          # ☕  idle; Ctrl-C stops the whole stack
except KeyboardInterrupt:
    print("Shutting down…")


