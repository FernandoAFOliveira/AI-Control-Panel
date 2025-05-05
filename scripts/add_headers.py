# scripts/add_headers.py
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
    ".sh": "#",
    ".c": "//",
    ".cpp": "//",
    ".html": "<!-- -->",
    ".md": "<!-- -->",
    ".yml": "#",
    ".yaml": "#",
}

# JSON files are now entirely excluded
def is_safe_to_comment(file_path: Path):
    if file_path.name == "__init__.py":
        return False
    if file_path.suffix == ".json":
        return False
    return file_path.suffix in COMMENT_STYLES

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
        path_obj = Path(filepath)
        if not is_safe_to_comment(path_obj):
            return

        with open(filepath, "r", encoding="utf-8") as f:
            contents = f.read()

        # Skip if already commented
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
    for current_root, dirs, files in os.walk(root):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            filepath = os.path.join(current_root, file)
            insert_header(filepath)

if __name__ == "__main__":
    walk_project()
    print("\n✨ Header insertion complete.")
