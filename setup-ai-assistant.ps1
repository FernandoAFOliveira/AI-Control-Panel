# Create root project directory
$root = "Control-Panel"
New-Item -ItemType Directory -Path $root -Force
Set-Location $root

# Create frontend with Vite
npm create vite@latest control-panel-frontend -- --template react-ts
cd control-panel-frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
cd ..

# Create backend folder and virtual environment
New-Item -ItemType Directory -Path "assistant-backend"
python -m venv assistant-backend\.venv
Start-Process powershell -ArgumentList "cd assistant-backend; .\.venv\Scripts\Activate.ps1; pip install fastapi uvicorn pydantic" -Wait

# VSCode workspace-level settings
New-Item -ItemType Directory -Path ".vscode" -Force
@'
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true
  },
  "tailwindCSS.includeLanguages": {
    "typescriptreact": "html"
  }
}
'@ | Out-File .vscode\settings.json -Encoding utf8

# Create VS Code workspace file
@"
{
  "folders": [
    {
      "path": "control-panel-frontend"
    },
    {
      "path": "assistant-backend"
    }
  ],
  "settings": {
    "eslint.alwaysShowStatus": true
  }
}
"@ | Out-File "ai-assistant.code-workspace" -Encoding utf8

Write-Output "`n✅ AI Assistant Control Panel setup complete. Open 'ai-assistant.code-workspace' in VS Code!"
