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
        <div className="flex h-screen bg-panel text-white">
            <aside className="w-64 bg-[#1f2937] text-gray-100 p-4 overflow-y-auto">
                {sidebar}
            </aside>
            <main className="flex-1 p-6 bg-panel overflow-auto">
                {children}
            </main>
        </div>
    );
}
