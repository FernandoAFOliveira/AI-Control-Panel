// frontend/src/components/ModelsPage.tsx
import { useEffect, useState } from "react";

type Config = {
    local_model: {
        name: string;
        url: string;
        confidence_threshold: number;
        fallback_enabled: boolean;
    };
};

export function ModelsPage() {
    const [config, setConfig] = useState<Config | null>(null);
    const [updating, setUpdating] = useState(false);

    // Fetch on mount
    useEffect(() => {
        fetch("/api/config")
            .then((r) => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    const handleChange = async (name: string) => {
        if (!config) return;
        setUpdating(true);
        await fetch("/api/config", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "local_model.active": name }),
        });
        setConfig({
            ...config,
            local_model: { ...config.local_model, name },
        });
        setUpdating(false);
    };

    if (!config) return <p>Loading models…</p>;

    // You can replace these with the actual model names you support
    const options = ["llama3", "7b", "8b", "13b"];

    return (
        <section>
            <h2>Local Model</h2>
            <label style={{ display: "block", margin: "12px 0" }}>
                <select
                    value={config.local_model.name}
                    disabled={updating}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    {options.map((o) => (
                        <option key={o} value={o}>
                            {o}
                        </option>
                    ))}
                </select>
            </label>
            {updating && <p>⏳ Switching model…</p>}
        </section>
    );
}
