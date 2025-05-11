// frontend/src/components/ControlPanelLayout.tsx
import React, { useState } from "react";
import { CloudPage } from "./CloudPage";
import { ComputePage } from "./ComputePage";
import { LogsPage } from "./LogsPage";
import { MemoryPage } from "./MemoryPage";
import { ModelsPage } from "./ModelsPage";
import { StatusPage } from "./StatusPage";
import TopControlBar from "./TopControlBar";
import { Nav } from "../Nav"   

export function ControlPanelLayout() {
  const [section, setSection] = useState<Section>("Status")
  const [showSettings, setShowSettings] = useState(false)

  const pages: Record<Section, React.ReactNode> = { … }

  return (
    <div className="flex flex-col h-screen w-full bg-panel text-white">
      <TopControlBar onSettingsToggle={() => setShowSettings(!showSettings)} />

      {/* <Nav /> now actually gets rendered, so it won't get auto-removed */}
      <Nav
        current={section}
        onChange={s => setSection(s)}
      />

      <div className="flex flex-1 overflow-hidden">
        {showSettings && ( /* … */ )}

        <main className="flex-1 p-6 overflow-auto">
          {pages[section]}
        </main>
      </div>
    </div>
  )
}

export default ControlPanelLayout 