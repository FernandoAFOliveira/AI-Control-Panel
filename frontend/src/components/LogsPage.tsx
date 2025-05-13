// frontend/src/components/LogsPage.tsx
import { useLogs } from "../hooks/useLogs";

export function LogsPage() {
  const logs = useLogs();
  if (!logs) return <p>Loading logs…</p>;

  return (
    <section>
      <h2>Logs</h2>
      <pre style={{ overflowX: "auto", whiteSpace: "pre-wrap" }}>
        {logs}
      </pre>
    </section>
  );
}
