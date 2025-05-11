// frontend/src/components/ComputePage.tsx
import { useEffect, useState } from "react";

type Config = {
    compute_profile: string;
    // (you can add the other fields here if you like)
};

export function ComputePage() {
    const [config, setConfig] = useState<Config | null>(null);
    const [updating, setUpdating] = useState(false);

    // 1️⃣ Fetch via the Vite proxy
    useEffect(() => {
        fetch("/api/config")
            .then((r) => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    // 2️⃣ PATCH via the proxy too
    const handleChange = async (newProfile: string) => {
        if (!config) return;
        setUpdating(true);

        try {
            await fetch("/api/config", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ compute_profile: newProfile }),
            });
            // locally update the select immediately
            setConfig({ ...config, compute_profile: newProfile });
        } catch (err) {
            console.error(err);
            // you could also show an error message to the user here
        } finally {
            setUpdating(false);
        }
    };

    if (!config) return <p>Loading config…</p>;

    return (
        <section>
            <h2>Compute Profile</h2>
            <label style={{ display: "block", margin: "12px 0" }}>
                <select
                    value={config.compute_profile}
                    disabled={updating}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value="eco">eco</option>
                    <option value="balanced">balanced</option>
                    <option value="performance">performance</option>
                </select>
            </label>
            {updating && <p>⏳ Applying…</p>}
        </section>
    );
}
