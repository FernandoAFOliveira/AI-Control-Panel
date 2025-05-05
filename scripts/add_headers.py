# add_headers.py
import os
from pathlib import Path

# Directories to skip entirely
EXCLUDE_DIRS = {".git", ".vscode", ".venv", "node_modules", "__pycache__", "logs", "workspace"}

# File types with their comment styles
COMMENT_STYLES = {
    ".py": "#",
    ".js": "//",
    ".ts": "//",
    ".tsx": "//",
    ".jsx": "//",
    ".css": "/* */",
    ".json": "//",
    ".sh": "#",
    ".c": "//",
    ".cpp": "//",
    ".html": "<!-- -->",
    ".md": "<!-- -->",
    ".yml": "#",
    ".yaml": "#",
}

SAFE_JSON_FILES = {
    "settings.json",
    "tsconfig.json",
    "tsconfig.app.json",
    "tsconfig.node.json",
}

def is_safe_to_comment(file_path):
    if file_path.name == "__init__.py":
        return False
    if file_path.suffix in {".py", ".ts", ".tsx", ".js", ".html"}:
        return True
    if file_path.name in SAFE_JSON_FILES:
        return True
    return False


def get_comment_block(filepath):
    ext = os.path.splitext(filepath)[1]
    comment_style = COMMENT_STYLES.get(ext)
    if not comment_style:
        return None

    relative_path = os.path.relpath(filepath, os.getcwd()).replace("\\", "/")
    if comment_style == "//":
        return f"// {relative_path}\n"
    elif comment_style == "#":
        return f"# {relative_path}\n"
    elif comment_style == "<!-- -->":
        return f"<!-- {relative_path} -->\n"
    elif comment_style == "/* */":
        return f"/* {relative_path} */\n"
    return None

def insert_header(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            contents = f.read()

        # Skip if the file already starts with one of our comment markers
        if any(contents.lstrip().startswith(marker.split()[0]) for marker in COMMENT_STYLES.values()):
            return

        comment = get_comment_block(filepath)
        if comment:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(comment + contents)
            print(f"✅ Header added: {filepath}")
    except Exception as e:
        print(f"⚠️ Skipped {filepath}: {e}")

def walk_project(root="."):
    root_path = Path(root)
    for current_root, dirs, files in os.walk(root_path):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            file_path = Path(current_root) / file
            if is_safe_to_comment(file_path):
                insert_header(str(file_path))


if __name__ == "__main__":
    walk_project()
    print("\n✨ Header insertion complete.")
