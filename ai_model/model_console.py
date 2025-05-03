# Control-Panel/ai_model/model_console.py
"""Terminal-based chat interface with Ollama that delegates actionable tasks to the Assistant.
Injects memory/core.json into each prompt if available. Watches task_queue.txt for pasted input, shows task results,
and triggers automatic follow-up suggestions if execution fails. Attempts to salvage shell commands as exec actions.
Loads expanded memory/core.json from external memory folder.
"""

import requests
import json
import time
import re
import os

# Control-Panel/ai_model/model_console.py
import sys
sys.path.append(os.path.abspath(os.path.join(__file__, "..", "..")))
from runtime_config import all as get_settings 
from logger import log

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "llama3"
TASK_FILE = "task_engine/task_queue.txt"
RESULT_FILE = "ai_model/task_result.json"
MEMORY_FILE = get_settings()["memory"]["file"]

SYSTEM_PROMPT = "You are a capable AI assistant working with a developer. Use JSON output for all structured local tasks."

def load_memory():
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        log(f"Failed to load memory: {e}", source="model_console")
        return {}

def format_prompt_with_memory(user_prompt, memory, task_result=None):
    sections = []
    if memory:
        memory_context = json.dumps(memory, indent=2)
        sections.append(f"PROJECT MEMORY:\n{memory_context}")
    if task_result:
        sections.append(f"LAST TASK RESULT:\n{json.dumps(task_result, indent=2)}")
    sections.append(f"USER:\n{user_prompt}")
    return "\n\n".join(sections)

def query_ollama(user_prompt, task_result=None):
    memory = load_memory()
    full_prompt = format_prompt_with_memory(user_prompt, memory, task_result)
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": full_prompt}
        ],
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        content = result.get("message", {}).get("content", "[No response]")
        log("Ollama responded successfully", source="model_console")
        return content
    except Exception as e:
        log(f"Error querying Ollama: {e}", source="model_console")
        return f"[Error querying Ollama: {e}]"

def extract_json_block(text):
    matches = re.findall(r"\{.*?\}", text, re.DOTALL)
    for block in matches:
        try:
            parsed = json.loads(block)
            if isinstance(parsed, dict) and "action" in parsed:
                return parsed
        except json.JSONDecodeError:
            continue
    return None

def extract_shell_command(text):
    shell_match = re.search(r"content: \|\n\s+(.+?)(\n\n|$)", text, re.DOTALL)
    if shell_match:
        cmd = shell_match.group(1).strip().replace('\n', '; ')
        return {
            "action": "exec",
            "path": ["bash", "-c", cmd]
        }
    return None

def write_task_file(instruction):
    os.makedirs(os.path.dirname(TASK_FILE), exist_ok=True)
    with open(TASK_FILE, "w", encoding="utf-8") as f:
        f.write(instruction)
    log("Wrote new task to task_queue.txt", source="model_console")

def read_result_file():
    if os.path.exists(RESULT_FILE):
        with open(RESULT_FILE, "r", encoding="utf-8") as f:
            try:
                result = json.load(f)
                return result
            except Exception as e:
                log(f"Error reading result file: {e}", source="model_console")
    return None

def main():
    print("\U0001F9E0 Ollama Console — talk to your assistant directly")
    print("Type 'exit' to quit. You can also paste directly into task_queue.txt to trigger processing.")

    last_seen = ""

    while True:
        try:
            if os.path.exists(TASK_FILE):
                with open(TASK_FILE, "r", encoding="utf-8") as f:
                    contents = f.read().strip()
                if contents and contents != last_seen:
                    print("\n\U0001F4E5 Detected new task in task_queue.txt:")
                    print(contents)
                    last_seen = contents
                    reply = query_ollama(contents)
                    print("\n\U0001F916 Ollama says:")
                    print(reply)
                    json_block = extract_json_block(reply) or extract_shell_command(reply)
                    if json_block:
                        task_text = json.dumps(json_block, indent=2)
                        write_task_file(task_text)
                        print("✅ Delegated structured task to Assistant.")
                        time.sleep(2)
                        result = read_result_file()
                        if result:
                            print("\n\U0001F4DD Task Result:")
                            print(json.dumps(result, indent=2))
                            if "❌" in result.get("result", "") or "⚠️" in result.get("result", ""):
                                print("\n\U0001F914 Task may have failed — asking Ollama how to proceed...")
                                suggestion = query_ollama("What should I do next?", task_result=result)
                                print("\n\U0001F501 Ollama follow-up:")
                                print(suggestion)

            user_input = input("\n>> ").strip()
            if user_input.lower() in ("exit", "quit"):
                break

            print("[Thinking...]")
            result = read_result_file()
            reply = query_ollama(user_input, task_result=result)
            print("\n\U0001F916 Ollama says:\n")
            print(reply)

            json_block = extract_json_block(reply) or extract_shell_command(reply)
            if json_block:
                print("\n\U0001F4E4 Delegating task to Assistant:")
                task_text = json.dumps(json_block, indent=2)
                print(task_text)
                write_task_file(task_text)
                print("✅ Task written to task_queue.txt")
                time.sleep(2)
                result = read_result_file()
                if result:
                    print("\n\U0001F4DD Task Result:")
                    print(json.dumps(result, indent=2))
                    if "❌" in result.get("result", "") or "⚠️" in result.get("result", ""):
                        print("\n\U0001F914 Task may have failed — asking Ollama how to proceed...")
                        suggestion = query_ollama("What should I do next?", task_result=result)
                        print("\n\U0001F501 Ollama follow-up:")
                        print(suggestion)
            else:
                print("⚠️ No structured task found — response only.")

        except KeyboardInterrupt:
            print("\n[Session ended]")
            break

if __name__ == "__main__":
    main()

