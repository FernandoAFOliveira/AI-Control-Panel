import "./App.css";
import { ControlPanel } from "./components/ControlPanel";
import { useStatus } from "./hooks/useStatus";

function App() {
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
    <div className="flex flex-col items-center pt-8 space-y-6">

      {/* --- NEW: runtime-config dropdown --- */}
      <ControlPanel />

      {/* --- existing live-status widget --- */}
      {status ? (
        <div className="text-sm font-mono space-y-1">
          <div>
            {dot(status.ai_model === "ready")} AI-Model: {status.ai_model}
          </div>
          <div>
            {dot(
              status.task_engine === "idle" ||
              status.task_engine === "running"
            )}
            Task-Engine: {status.task_engine}
          </div>
          <div>CPU {status.cpu}%</div>
          <div>RAM {status.ram}%</div>
        </div>
      ) : (
        <p>Loading status…</p>
      )}
    </div>
  );
}

export default App;
