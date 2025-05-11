import os, json
from pathlib import Path

project_root = Path(__file__).parent.parent
exts = {".py", ".ts", ".tsx", ".js", ".json", ".html", ".css", ".md"}

manifest = []
for p in project_root.rglob("*"):
    if p.is_file() and p.suffix in exts:
        text = p.read_text(errors="ignore").splitlines()
        manifest.append({
            "path": str(p.relative_to(project_root)),
            "lines": len(text),
            "preview": "\n".join(text[:10])
        })

(project_root/"project_manifest.json").write_text(json.dumps(manifest, indent=2))
print("Wrote project_manifest.json")
