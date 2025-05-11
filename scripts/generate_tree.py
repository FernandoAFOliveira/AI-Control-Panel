# scripts/generate_tree.py
import os

EXCLUDE_DIRS = {".venv", "node_modules", "__pycache__", ".git", ".vscode", "logs", "workspace"}
EXCLUDE_FILES = {
    ".env", ".env.example", ".gitattributes", ".gitignore", "package-lock.json",
    "project_tree.txt", "README.md", "visual-mockup.md", "ai-assistant.code-workspace"
}

def find_project_root(start_path):
    """Walk upward to find project root (e.g., containing .git or start_all.py)"""
    current = os.path.abspath(start_path)
    while current != os.path.dirname(current):  # Stop at filesystem root
        if any(os.path.exists(os.path.join(current, marker)) for marker in [".git", "start_all.py"]):
            return current
        current = os.path.dirname(current)
    raise FileNotFoundError("Project root not found")

def print_tree(startpath, output_file="project_tree.txt"):
    with open(os.path.join(startpath, output_file), "w", encoding="utf-8") as f:
        for root, dirs, files in os.walk(startpath):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            level = root.replace(startpath, "").count(os.sep)
            indent = "    " * level
            f.write(f"{indent}{os.path.basename(root)}/\n")

            subindent = "    " * (level + 1)
            for file in files:
                if file in EXCLUDE_FILES:
                    continue
                f.write(f"{subindent}{file}\n")

if __name__ == "__main__":
    root = find_project_root(__file__)
    print_tree(root)
    print(f"✅ Cleaned project structure written to '{os.path.join(root, 'project_tree.txt')}'")
