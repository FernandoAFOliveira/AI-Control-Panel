// frontend/src/components/LogsPage.tsx
import { useLogs } from "../hooks/useLogs";

export function LogsPage() {
    const logs = useLogs();

    return (
        <section>
            <h2>Logs</h2>
            <pre
                style={{
                    backgroundColor: "#000",
                    color: "#0f0",
                    height: "300px",
                    overflowY: "auto",
                    padding: "8px",
                }}
            >
                {logs || "Connecting to logs…"}
            </pre>
        </section>
    );
}
