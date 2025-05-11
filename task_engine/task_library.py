# task_library.py
"""
This module defines the executable logic for all supported Assistant actions.
Each function accepts a single `params` dict containing keys like `path`, `content`, etc.
All paths are validated before execution.
"""

import os
import sys
import subprocess
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from task_engine.utils import is_within_workspace

def mkdir(params):
    """Creates a directory at the given path."""
    folder = params.get("path")
    if not folder or not is_within_workspace(folder):
        return f"🛑 Refused to create folder outside workspace: {folder}"
    os.makedirs(folder, exist_ok=True)
    return f"📁 Folder '{folder}' created successfully."


def touch(params):
    """Creates or overwrites a file with optional content."""
    file_path = params.get("path")
    if not file_path or not is_within_workspace(file_path):
        return f"🛑 Refused to touch file outside workspace: {file_path}"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(params.get("content", ""))
    return f"📝 File '{file_path}' created."


def exec(params):
    """Executes a shell command using subprocess."""
    args = params.get("path")
    if not isinstance(args, list):
        return f"❌ Invalid exec path list."
    try:
        result = subprocess.run(args, capture_output=True, text=True, check=True)
        return f"✅ Exec OK: {' '.join(args)}\n{result.stdout.strip()}"
    except subprocess.CalledProcessError as e:
        return f"❌ Exec failed: {e.cmd}\n{e.stderr.strip()}"


def generate_react_component_files(params):
    """Creates React component boilerplate files using Tailwind in the given path."""
    base = params.get("path")
    if not base or not is_within_workspace(base):
        return f"🛑 Refused to create components outside workspace: {base}"
    os.makedirs(base, exist_ok=True)
    components = [
        ("Header.tsx", "// Header\nexport default function Header() { return <header className='p-4 bg-gray-200'>Header</header>; }"),
        ("Sidebar.tsx", "// Sidebar\nexport default function Sidebar() { return <aside className='w-64 bg-gray-100'>Sidebar</aside>; }"),
        ("TerminalPanel.tsx", "// Terminal\nexport default function TerminalPanel() { return <div className='p-4'>Terminal Output</div>; }"),
        ("ResourceStats.tsx", "// Stats\nexport default function ResourceStats() { return <section className='flex gap-2'>Resources</section>; }"),
        ("VoiceToggle.tsx", "// Toggle\nexport default function VoiceToggle() { return <button className='p-2'>Voice</button>; }"),
        ("ControlButtons.tsx", "// Buttons\nexport default function ControlButtons() { return <div className='flex gap-2'><button>Start</button><button>Stop</button><button>Restart</button></div>; }"),
    ]
    for filename, code in components:
        path = os.path.join(base, filename)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(code)
    return f"⚛️ React component files created in '{base}'."

def write_text(params):
    """
    Write arbitrary text to a file.
    params = { "action": "write_text", "path": "workspace/foo.txt", "content": "Hello" }
    """
    path = params["path"]
    if not is_within_workspace(path):
        return "🛑 Refused – path outside workspace."
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(params.get("content", ""))
    return f"📝 Wrote text to {path}"


# Registry for dispatch use
ACTIONS = {
    "mkdir": mkdir,
    "touch": touch,
    "exec": exec,
    "generate-react-component-files": generate_react_component_files,
    "write_text": write_text
}

