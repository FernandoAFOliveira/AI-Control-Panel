# Control-Panel/task_engine/task_monitor.py
"""Monitors task_queue.txt, executes JSON tasks defined in task_library.ACTIONS,
   enforces sandbox validation, logs every step with the shared logger, and
   writes a status/result JSON for upstream tools.
"""

import json
import os
import time
from datetime import datetime
import sys
sys.path.append(os.path.abspath(os.path.join(__file__, "..", "..")))
from task_engine.task_library import ACTIONS
from task_engine.utils import is_within_workspace
from logger import log  # <-- shared logger

TASK_FILE   = "task_engine/task_queue.txt"
STATUS_FILE = "ai_model/status_report.json"
RESULT_FILE = "ai_model/task_result.json"
LOG_FILE    = "logs/task_engine.log"          # exists for convenience; log()
                                             # also writes a consolidated file.

# --------------------------------------------------------------------------- #
# Helper functions
# --------------------------------------------------------------------------- #
def read_task() -> str | None:
    """Return raw task text or None if queue is empty."""
    if not os.path.exists(TASK_FILE):
        return None
    with open(TASK_FILE, "r", encoding="utf-8") as fh:
        return fh.read().strip() or None


def clear_task() -> None:
    with open(TASK_FILE, "w", encoding="utf-8") as fh:
        fh.write("")


def write_status(message: str) -> None:
    with open(STATUS_FILE, "w", encoding="utf-8") as fh:
        json.dump({"status": message}, fh, indent=2)
    log(message, source="task_monitor")  # extra visibility


def write_result(task: str, outcome: str) -> None:
    result = {
        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "task": task,
        "result": outcome,
    }
    with open(RESULT_FILE, "w", encoding="utf-8") as fh:
        json.dump(result, fh, indent=2)
    log(f"Result recorded: {outcome}", source="task_monitor")


# --------------------------------------------------------------------------- #
# Core execution
# --------------------------------------------------------------------------- #
def run_task(raw: str) -> None:
    """Parse JSON, dispatch to ACTIONS, update status/result, handle errors."""
    log(f"Incoming task: {raw}", source="task_monitor")

    try:
        task = json.loads(raw)
        if not isinstance(task, dict) or "action" not in task:
            raise ValueError("Invalid task format (missing 'action')")

        action_name = task["action"]
        if action_name not in ACTIONS:
            outcome = f"❌ Action '{action_name}' is not registered."
            write_status(outcome)
            write_result(raw, outcome)
            return

        # Sandbox validation for path-based actions -------------------------
        path_arg = task.get("path")
        if path_arg and not is_within_workspace(path_arg):
            outcome = f"🛑 Refused to work outside workspace: {path_arg}"
            write_status(outcome)
            write_result(raw, outcome)
            return

        # Execute -----------------------------------------------------------
        outcome = ACTIONS[action_name](task)
        write_status(outcome)
        write_result(raw, outcome)

    except Exception as exc:  # pylint: disable=broad-except
        outcome = f"❌ Task error: {exc}"
        write_status(outcome)
        write_result(raw, outcome)
        log(outcome, source="task_monitor", level="ERROR")

    finally:
        clear_task()


def monitor_loop() -> None:
    """Continuous watcher loop."""
    log("Task monitor started.", source="task_monitor")
    print("[Task Monitor] watching task_queue.txt ... (Ctrl+C to stop)")
    while True:
        try:
            if raw := read_task():
                run_task(raw)
            time.sleep(1)
        except KeyboardInterrupt:
            print("\n[Task Monitor] stopped.")
            log("Task monitor terminated by user.", source="task_monitor")
            break
        except Exception as exc:  # safeguard against runaway crash
            log(f"Fatal monitor error: {exc}", source="task_monitor", level="ERROR")
            time.sleep(1)


# --------------------------------------------------------------------------- #
if __name__ == "__main__":
    monitor_loop()

