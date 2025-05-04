// frontend/src/components/ControlPanelLayout.tsx
import React, { useState } from "react";
import { Panel } from "../layout/Panel";
import { ControlPanelNav } from "./ControlPanelNav";
import { CloudPage } from "./pages/CloudPage";
import { ComputePage } from "./pages/ComputePage";
import { LogsPage } from "./pages/LogsPage";
import { MemoryPage } from "./pages/MemoryPage";
import { ModelsPage } from "./pages/ModelsPage";
import { StatusPage } from "./pages/StatusPage";

export default function ControlPanelLayout() {
    const [section, setSection] = useState<string>("Status");

    /** Dummy pages map */
    const pages: Record<string, React.ReactNode> = {
        Status: <StatusPage />,
        Compute: <ComputePage />,
        Models: <ModelsPage />,
        Cloud: <CloudPage />,
        Logs: <LogsPage />,
        Memory: <MemoryPage />,
    };

    return (
        <Panel sidebar={<ControlPanelNav selected={section} onSelect={setSection} />}>
            {pages[section] || <div className="p-4">Unknown Section</div>}
        </Panel>
    );
}
