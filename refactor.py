# rename_assistant_to_task_engine.py
import os

def replace_in_file(file_path, replacements):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    for old, new in replacements:
        content = content.replace(old, new)

    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def update_folder(folder):
    replacements = [
        ('from assistant.', 'from task_engine.'),
        ('import assistant.', 'import task_engine.'),
        ('"assistant/', '"task_engine/'),
        ("'assistant/", "'task_engine/"),
        # Also consider triple-quoted paths or doc comments if needed
    ]
    for root, _, files in os.walk(folder):
        for filename in files:
            if filename.endswith('.py'):
                path = os.path.join(root, filename)
                replace_in_file(path, replacements)
                print(f"✅ Updated: {path}")

update_folder("task_engine")
update_folder("ai_model")

