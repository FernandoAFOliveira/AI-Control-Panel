// frontend/src/components/ControlPanelNav.tsx

export function ControlPanelNav({
    selected,
    onSelect,
}: {
    selected: Section;
    onSelect: (section: Section) => void;
}) {
    const tabs: Section[] = [
        "Status",
        "Compute",
        "Models",
        "Cloud",
        "Logs",
        "Memory",
    ];
    return (
        <nav className="space-y-2">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className={
                        selected === tab
                            ? "block w-full text-left bg-gray-700 text-white p-2"
                            : "block w-full text-left text-gray-300 p-2 hover:bg-gray-600"
                    }
                >
                    {tab}
                </button>
            ))}
        </nav>
    );
}

// Don’t forget to import or declare Section in this file, e.g.:
type Section = "Status" | "Compute" | "Models" | "Cloud" | "Logs" | "Memory";
