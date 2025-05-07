// frontend/src/components/CloudPage.tsx
import { useEffect, useState } from "react";

type Config = {
    cloud_model: {
        provider: string;
        model: string;
        use_fallback: boolean;
        api_key_env: string;
    };
};

export function CloudPage() {
    const [config, setConfig] = useState<Config | null>(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetch("/api/config")
            .then((r) => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    const handleProviderChange = async (provider: string) => {
        if (!config) return;
        setUpdating(true);
        await fetch("/api/config", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ cloud_chain: provider }),
        });
        setConfig({
            ...config,
            cloud_model: { ...config.cloud_model, provider },
        });
        setUpdating(false);
    };

    if (!config) return <p>Loading cloud settings…</p>;

    const providers = ["openai", "anthropic"]; // add more if you support them

    return (
        <section>
            <h2>Cloud AI Provider</h2>
            <label style={{ display: "block", margin: "12px 0" }}>
                <select
                    value={config.cloud_model.provider}
                    disabled={updating}
                    onChange={(e) => handleProviderChange(e.target.value)}
                >
                    {providers.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
            </label>
            {updating && <p>⏳ Applying…</p>}
        </section>
    );
}
