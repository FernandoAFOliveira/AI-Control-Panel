import "./App.css";
import { useStatus } from "./hooks/useStatus";

function App() {
  const status = useStatus();

  if (!status) return <p>Loading status…</p>;

  const dot = (ok: boolean) =>
    <span style={{
      display: "inline-block",
      width: 10, height: 10, borderRadius: "50%",
      background: ok ? "limegreen" : "crimson", marginRight: 4
    }} />;

  return (
    <div className="p-4 space-y-2 text-sm font-mono">
      <div>{dot(status.ai_model === "ready")} AI-Model: {status.ai_model}</div>
      <div>{dot(status.task_engine === "idle" || status.task_engine === "running")}
        Task-Engine: {status.task_engine}</div>
      <div>CPU {status.cpu}%</div>
      <div>RAM {status.ram}%</div>
    </div>
  );
}

export default App;
