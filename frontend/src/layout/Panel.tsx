// frontend/src/layout/Panel.tsx
import { ReactNode } from "react";

export function Panel({
    sidebar,
    children,
}: {
    sidebar: ReactNode;
    children: ReactNode;
}) {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <aside
                style={{
                    width: 256,
                    backgroundColor: "#1f2937",
                    color: "#f9fafb",
                    padding: 16,
                    boxSizing: "border-box",
                    overflowY: "auto",
                }}
            >
                {sidebar}
            </aside>
            <main
                style={{
                    flex: 1,
                    padding: 24,
                    backgroundColor: "#f9fafb",
                    overflow: "auto",
                }}
            >
                {children}
            </main>
        </div>
    );
}
