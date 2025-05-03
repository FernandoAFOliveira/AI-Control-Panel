# Control-Panel/assistant/voice_assistant.py
"""Voice Assistant that routes speech to Ollama with memory context, delegates structured tasks,
and supports ESC-interruptible speech output.
"""

import os
import sys
import re
import json
import subprocess
import threading
import msvcrt
import speech_recognition as sr
import pyttsx3
import requests
# Control-Panel/ai_model/model_console.py
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from ai_model.model_api import query_ollama
from task_engine.utils import is_within_workspace, load_settings

TASK_FILE = "task_engine/task_queue.txt"
RESULT_FILE = "ai_model/task_result.json"
MEMORY_FILE = load_settings()["memory"]["file"]
USE_OFFLINE_WHISPER = False

recognizer = sr.Recognizer()
speaker = pyttsx3.init()
voices = speaker.getProperty('voices')
for voice in voices:
    if 'zira' in voice.name.lower():
        speaker.setProperty('voice', voice.id)
        break
speaker.setProperty('rate', 150)


def load_memory():
    try:
        with open(MEMORY_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def format_prompt_with_memory(user_prompt, memory):
    if not memory:
        return user_prompt
    memory_context = json.dumps(memory, indent=2)
    return f"MEMORY:\n{memory_context}\n\nUSER:\n{user_prompt}"


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


def write_task_file(instruction):
    os.makedirs(os.path.dirname(TASK_FILE), exist_ok=True)
    with open(TASK_FILE, "w", encoding="utf-8") as f:
        f.write(instruction)


def read_result_file():
    if os.path.exists(RESULT_FILE):
        with open(RESULT_FILE, "r", encoding="utf-8") as f:
            try:
                result = json.load(f)
                print("\n📝 Task Result:")
                print(json.dumps(result, indent=2))
            except Exception as e:
                print(f"[Error reading task result: {e}]")


def speak_with_interrupt(text):
    def _speak():
        speaker.say(text)
        speaker.runAndWait()

    thread = threading.Thread(target=_speak)
    thread.start()
    print("🔈 Speaking... Press ESC to interrupt.")

    while thread.is_alive():
        if msvcrt.kbhit() and msvcrt.getch() == b'\x1b':  # ESC key
            speaker.stop()
            print("🛑 Speech interrupted.")
            break


print("Voice Assistant is ready. Speak a task or instruction.")

while True:
    try:
        with sr.Microphone() as source:
            recognizer.adjust_for_ambient_noise(source)
            print("Listening...")
            audio = recognizer.listen(source, timeout=10, phrase_time_limit=15)

            if USE_OFFLINE_WHISPER:
                with open("C:\\Dev\\AI\\Assistant\\temp.wav", "wb") as f:
                    f.write(audio.get_wav_data())
                result = subprocess.run(
                    ['C:\\Dev\\Tools\\whisper.cpp\\build\\bin\\whisper-cli.exe',
                     '-m', 'C:\\Dev\\Tools\\whisper.cpp\\models\\ggml-small.en.bin',
                     '-f', 'C:\\Dev\\AI\\Assistant\\temp.wav',
                     '--output-txt'],
                    capture_output=True, text=True, check=True
                )
                try:
                    with open("C:\\Dev\\AI\\Assistant\\temp.wav.txt", "r", encoding="utf-8") as file:
                        text = file.read().strip()
                        os.remove("C:\\Dev\\AI\\Assistant\\temp.wav")
                        os.remove("C:\\Dev\\AI\\Assistant\\temp.wav.txt")
                except Exception as err:
                    text = "Error reading transcription."
                    print(f"Error: {err}")
            else:
                text = recognizer.recognize_google(audio)

            print(f"You said: {text}")

            memory = load_memory()
            full_prompt = format_prompt_with_memory(text, memory)
            payload = {
                "model": "llama3",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": full_prompt}
                ],
                "stream": False
            }
            try:
                response = requests.post("http://localhost:11434/api/chat", json=payload, timeout=30)
                response.raise_for_status()
                result = response.json()
                ai_reply = result.get("message", {}).get("content", "[No response]")
            except Exception as e:
                ai_reply = f"[Error talking to Ollama: {e}]"

            print(f"Assistant: {ai_reply}")
            speak_with_interrupt(ai_reply)

            json_block = extract_json_block(ai_reply)
            if json_block:
                task_text = json.dumps(json_block, indent=2)
                print("📤 Writing delegated task from voice to task_queue.txt")
                write_task_file(task_text)
                time.sleep(2)
                read_result_file()

    except sr.UnknownValueError:
        print("Sorry, I did not understand that.")
    except sr.RequestError as req_err:
        print(f"Could not request results; {req_err}")
    except sr.WaitTimeoutError:
        print("Listening timed out.")

