// frontend/src/components/StatusPage.tsx
import { useStatus } from "../hooks/useStatus";

export function StatusPage() {
    const status = useStatus();

    if (!status) return <p>Loading status…</p>;

    return (
        <section>
            <h2>Status</h2>
            <div style={{ fontFamily: "monospace" }}>
                <div>
                    <span
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: status.task_engine === "error" ? "crimson" : "limegreen",
                            marginRight: 4,
                        }}
                    />
                    AI Model: {status.ai_model}
                </div>
                <div>
                    <span
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: status.task_engine === "error" ? "crimson" : "limegreen",
                            marginRight: 4,
                        }}
                    />
                    Task Engine: {status.task_engine}
                </div>
                <div>CPU: {status.cpu.toFixed(0)}%</div>
                <div>RAM: {status.ram.toFixed(0)}%</div>
            </div>
        </section>
    );
}
