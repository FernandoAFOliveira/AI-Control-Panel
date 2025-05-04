// frontend/src/App.tsx
import { ControlPanel } from "./components/ControlPanel";
import { useStatus } from "./hooks/useStatus";
import { Panel } from "./layout/Panel";

export default function App() {
  const status = useStatus();

  const dot = (ok: boolean) => (
    <span
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: ok ? "limegreen" : "crimson",
        marginRight: 4
      }}
    />
  );

  return (
    <Panel sidebar={<ControlPanel />}>
      {status ? (
        <div className="space-y-2 text-sm font-mono">
          <pre className="h-64 bg-black text-green-400 p-2 rounded">
            Terminal output coming soon…
          </pre>

          <div>{dot(status.ai_model === "ready")} AI-Model: {status.ai_model}</div>
          <div>{dot(status.task_engine === "idle" || status.task_engine === "running")}
            Task-Engine: {status.task_engine}</div>
          <div>CPU {status.cpu}%</div>
          <div>RAM {status.ram}%</div>
        </div>
      ) : (
        <p>Loading status…</p>
      )}
    </Panel>
  );
}
