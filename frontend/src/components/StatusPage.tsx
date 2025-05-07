// frontend/src/components/StatusPage.tsx
import { useEffect, useState } from "react";

type Status = {
    ai_model: string;
    task_engine: string;
    cpu: number;
    ram: number;
    // if you add listening state later, include it here
};

export function StatusPage() {
    const [status, setStatus] = useState<Status | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function poll() {
            try {
                const res = await fetch("/api/status");
                const data: Status = await res.json();
                if (!cancelled) setStatus(data);
            } catch (err) {
                console.error("Failed to fetch status", err);
            }
        }

        // initial load + interval:
        poll();
        const iv = setInterval(poll, 2000);
        return () => {
            cancelled = true;
            clearInterval(iv);
        };
    }, []);

    if (!status) return <p>Loading status…</p>;

    const dot = (ok: boolean) => (
        <span
            style={{
                display: "inline-block",
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: ok ? "limegreen" : "crimson",
                marginRight: 4,
            }}
        />
    );

    return (
        <section>
            <h2>Status</h2>
            <div style={{ fontFamily: "monospace" }}>
                <div>
                    {dot(status.ai_model === "ready")}AI Model: {status.ai_model}
                </div>
                <div>
                    {dot(status.task_engine !== "error")}
                    Task Engine: {status.task_engine}
                </div>
                <div>CPU: {status.cpu.toFixed(0)}%</div>
                <div>RAM: {status.ram.toFixed(0)}%</div>
            </div>
        </section>
    );
}
