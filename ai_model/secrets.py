# Control-Panel/ai_model/secrets.py
"""
Secure access and logging for environment-based secrets (like API keys).
Prevents accidental printing of full secret values and enforces masking.
"""

import os
import builtins

_real_print = builtins.print

# Intercept print calls and raise an error if full secrets are detected
# This is a safeguard to catch accidental debug leaks.
def safe_print(*args, **kwargs):
    combined = " ".join(map(str, args))
    for key, value in os.environ.items():
        if value and value in combined:
            raise RuntimeError(f"\U0001F6A8 Attempted to print value of secret: {key}")
    _real_print(*args, **kwargs)

builtins.print = safe_print

# Load from .env file if it exists
try:
    from dotenv import load_dotenv
    load_dotenv()
    _real_print("📦 Loaded environment variables from .env")
except ImportError:
    _real_print("⚠️ Warning: python-dotenv not installed. .env loading skipped.")

# Public interface for securely loading and previewing secrets
def get_secret(key: str) -> str:
    value = os.getenv(key)
    if value and isinstance(value, str):
        preview = value[:6] + "..." + value[-4:] if len(value) >= 10 else "[REDACTED]"
        _real_print(f"🔑 Loaded {key}: {preview}")
    else:
        _real_print(f"⚠️ Missing environment variable: {key}")
    return value

