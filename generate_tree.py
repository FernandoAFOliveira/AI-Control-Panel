# generate_tree.py
import os

EXCLUDE_DIRS = {".venv", "node_modules", "__pycache__"}

def print_tree(startpath, output_file="project_tree.txt"):
    with open(output_file, "w", encoding="utf-8") as f:
        for root, dirs, files in os.walk(startpath):
            # Skip excluded directories
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]

            level = root.replace(startpath, "").count(os.sep)
            indent = "    " * level
            f.write(f"{indent}{os.path.basename(root)}/\n")
            subindent = "    " * (level + 1)
            for file in files:
                f.write(f"{subindent}{file}\n")

if __name__ == "__main__":
    print_tree(os.getcwd())
    print("✅ Project structure written to 'project_tree.txt'")

