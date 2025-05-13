// frontend/src/components/ControlPanelLayout.tsx
import { useState, type ReactNode } from "react";
import type { Section } from "../types";
import { CloudPage } from "./CloudPage";
import { ComputePage } from "./ComputePage";
import { LogsPage } from "./LogsPage";
import { MemoryPage } from "./MemoryPage";
import { ModelsPage } from "./ModelsPage";
import { StatusPage } from "./StatusPage";
import TopControlBar from "./TopControlBar";

console.log("✅ Loaded ControlPanelLayout.tsx");

const pages: Record<Section, ReactNode> = {
  Status: <StatusPage />,
  Compute: <ComputePage />,
  Models: <ModelsPage />,
  Cloud: <CloudPage />,
  Logs: <LogsPage />,
  Memory: <MemoryPage />,
};

export default function ControlPanelLayout() {
  const [section, setSection] = useState<Section>("Status");
  const [showSettings, setShowSettings] = useState(false);
  const [voiceOn, setVoiceOn]     = useState(true);
  const [useLocal, setUseLocal]   = useState(true);
  const [useCloud, setUseCloud]   = useState(false);
  const [offline, setOffline]     = useState(false);

  return (
    <div
      className="
      flex flex-col h-screen w-full
      bg-[url('/images/backgrounds/hud-ring-glow.png')]
      bg-cover bg-center
    ">      
      {/* header + icons + tabs */}
      <TopControlBar
        current={section}
        onSectionChange={setSection}

        voiceOn={voiceOn}
        onVoiceToggle={() => setVoiceOn(v => !v)}

        useLocal={useLocal}
        onLocalToggle={() => setUseLocal(l => !l)}

        useCloud={useCloud}
        onCloudToggle={() => setUseCloud(c => !c)}

        offline={offline}
        onOfflineToggle={() => setOffline(o => !o)}

        onSettingsToggle={() => setShowSettings(s => !s)}
      />

      <div className="flex flex-1 overflow-hidden">
        {showSettings && (
          <aside className="w-64 bg-[#1f2937] p-4 overflow-y-auto border-r border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Settings</h2>
            <ul className="space-y-2 text-sm">
              <li>Memory location</li>
              <li>Plugins</li>
              <li>Voice options</li>
            </ul>
          </aside>
        )}

        <main className="relative flex-1 p-6 overflow-auto">
          <div className="relative z-10">
            {pages[section]}
          </div>
        </main>
      </div>
    </div>
  );
}
