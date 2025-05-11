# Control-Panel/ai_model/model_api.py
"""Helper module for communicating with Ollama and ChatGPT (fallback via OpenAI API).
Adds support for confidence-scored replies and escalation logic."""

import os
import requests
import re
from dotenv import load_dotenv
import openai
from ai_model.utils import mask_api_key, warn_if_env_leaking
from logger import log

# Load environment variables
load_dotenv()

OLLAMA_URL = "http://localhost:11434/api/chat"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
USE_OPENAI_FALLBACK = os.getenv("USE_OPENAI_FALLBACK", "true").lower() == "true"
CONFIDENCE_THRESHOLD = int(os.getenv("CONFIDENCE_THRESHOLD", 6))

# Secure diagnostics
warn_if_env_leaking("OPENAI_API_KEY", OPENAI_API_KEY or "")
if OPENAI_API_KEY:
    openai.api_key = OPENAI_API_KEY

def parse_confidence_rating(response: str) -> int:
    match = re.search(r"CONFIDENCE\s*[:=]\s*(\d{1,2})", response, re.IGNORECASE)
    if match:
        try:
            value = int(match.group(1))
            return min(max(value, 1), 10)
        except ValueError:
            return 0
    return 0

def query_ollama(user_prompt: str, model: str = "llama3") -> str:
    """Send a prompt to the local Ollama server and return the response."""
    assessment_prompt = f"""
{user_prompt}

IMPORTANT:
On a scale from 1 (very uncertain) to 10 (completely confident), how confident are you in:
1. Understanding the user's goal
2. Knowing how to solve it with available Assistant actions
3. Producing a correct JSON instruction

Please respond using:
CONFIDENCE: (1-10)
REASONING: ...
ACTION (optional): {{ ... }}
"""

    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a helpful, concise assistant. Keep replies short unless asked."},
            {"role": "user", "content": assessment_prompt.strip()}
        ],
        "stream": False
    }
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=30)
        response.raise_for_status()
        result = response.json()
        content = result.get("message", {}).get("content", "[No response from Ollama]")

        log("Ollama response received", source="model_api")

        confidence = parse_confidence_rating(content)
        if confidence < CONFIDENCE_THRESHOLD:
            log(f"Confidence too low ({confidence}/10), escalating to ChatGPT", source="model_api")
            fallback = query_chatgpt(user_prompt)
            return f"[ChatGPT fallback]:\n{fallback}"

        return content

    except Exception as e:
        log(f"Ollama error: {e}", source="model_api")
        return f"[Ollama Error: {e}]"

def query_chatgpt(prompt: str, model: str = "gpt-4") -> str:
    """Send a prompt to OpenAI's ChatGPT API (used as fallback reasoning engine)."""
    if not (USE_OPENAI_FALLBACK and OPENAI_API_KEY):
        return "[ChatGPT fallback disabled — set USE_OPENAI_FALLBACK=true in .env]"

    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=[
                {"role": "system", "content": "You help translate requests into Assistant actions."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        log("ChatGPT fallback successful", source="model_api")
        return response.choices[0].message["content"]
    except Exception as e:
        log(f"ChatGPT API Error: {e}", source="model_api")
        return f"[ChatGPT API Error: {e}]"

