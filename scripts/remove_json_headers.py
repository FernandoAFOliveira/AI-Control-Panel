# scripts/remove_json_headers.py

import os
from pathlib import Path

def clean_json_headers(root="."):
    for dirpath, dirnames, filenames in os.walk(root):
        for file in filenames:
            if file.endswith(".json"):
                filepath = Path(dirpath) / file
                try:
                    with filepath.open("r", encoding="utf-8") as f:
                        lines = f.readlines()

                    # Only remove line if it starts with //
                    if lines and lines[0].strip().startswith("//"):
                        with filepath.open("w", encoding="utf-8") as f:
                            f.writelines(lines[1:])
                        print(f"✅ Removed header from: {filepath}")
                except Exception as e:
                    print(f"⚠️ Skipped {filepath}: {e}")

if __name__ == "__main__":
    clean_json_headers()
    print("\n🧼 JSON cleanup complete.")
