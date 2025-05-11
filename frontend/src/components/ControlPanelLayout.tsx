// frontend/src/components/ControlPanelLayout.tsx
import React, { useState } from "react";
import { CloudPage } from "./CloudPage";
import { ComputePage } from "./ComputePage";
import { LogsPage } from "./LogsPage";
import { MemoryPage } from "./MemoryPage";
import { ModelsPage } from "./ModelsPage";
import { StatusPage } from "./StatusPage";
import TopControlBar from "./TopControlBar";

type Section = "Status" | "Compute" | "Models" | "Cloud" | "Logs" | "Memory";

export function ControlPanelLayout() {
    const [section, _setSection] = useState<Section>("Status");
    const [showSettings, setShowSettings] = useState(false);

    const pages: Record<Section, React.ReactNode> = {
        Status: <StatusPage />,
        Compute: <ComputePage />,
        Models: <ModelsPage />,
        Cloud: <CloudPage />,
        Logs: <LogsPage />,
        Memory: <MemoryPage />,
    };

    return (
        <div className="flex flex-col h-screen w-full bg-panel text-white">
            <TopControlBar onSettingsToggle={() => setShowSettings(!showSettings)} />

            <div className="flex flex-1 overflow-hidden">
                {showSettings && (
                    <aside className="w-64 bg-[#1f2937] p-4 overflow-y-auto border-r border-gray-800">
                        {/* Placeholder Settings Panel */}
                        <h2 className="text-lg font-semibold mb-4">Settings</h2>
                        <ul className="space-y-2 text-sm">
                            <li>Memory location</li>
                            <li>Plugins</li>
                            <li>Voice options</li>
                        </ul>
                    </aside>
                )}

                <main className="flex-1 p-6 overflow-auto">
                    {pages[section]}
                </main>
            </div>
        </div>
    );
}
