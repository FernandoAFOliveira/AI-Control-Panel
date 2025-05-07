// frontend/src/components/MemoryPage.tsx
import { useEffect, useState } from "react";

type Config = {
    memory: {
        file: string;
    };
};

export function MemoryPage() {
    const [config, setConfig] = useState<Config | null>(null);

    useEffect(() => {
        fetch("/api/config")
            .then((r) => r.json())
            .then(setConfig)
            .catch(console.error);
    }, []);

    if (!config) return <p>Loading memory settings…</p>;

    return (
        <section>
            <h2>Memory</h2>
            <p>
                Memory file location: <code>{config.memory.file}</code>
            </p>
        </section>
    );
}
