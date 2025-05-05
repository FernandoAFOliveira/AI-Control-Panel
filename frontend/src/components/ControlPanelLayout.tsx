// frontend/src/components/ControlPanelLayout.tsx
import React, { useState } from "react";
import { Panel } from "../layout/Panel";
import { ControlPanelNav } from "./ControlPanelNav";

import { CloudPage } from "./CloudPage";
import { ComputePage } from "./ComputePage";
import { LogsPage } from "./LogsPage";
import { MemoryPage } from "./MemoryPage";
import { ModelsPage } from "./ModelsPage";
import { StatusPage } from "./StatusPage";

type Section = "Status" | "Compute" | "Models" | "Cloud" | "Logs" | "Memory";

export default function ControlPanelLayout() {
    const [section, setSection] = useState<Section>("Status");

    const pages: Record<Section, React.ReactNode> = {
        Status: <StatusPage />,
        Compute: <ComputePage />,
        Models: <ModelsPage />,
        Cloud: <CloudPage />,
        Logs: <LogsPage />,
        Memory: <MemoryPage />,
    };

    return (
        <Panel
            sidebar={
                <ControlPanelNav
                    selected={section}
                    onSelect={setSection}
                />
            }
        >
            <div className="bg-panel text-white min-h-screen p-4">
                {pages[section]}
            </div>
        </Panel>
    );

}
