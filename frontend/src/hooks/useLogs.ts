// frontend/src/hooks/useLogs.ts
import { useEffect, useState } from "react";

export function useLogs() {
  const [logs, setLogs] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function stream() {
      const res = await fetch("http://localhost:8000/logs/stream");
      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (!cancelled) {
        const { value, done } = await reader.read();
        if (done) break;
        setLogs((prev) => prev + decoder.decode(value));
      }
    }

    stream();
    return () => { cancelled = true; };
  }, []);

  return logs;
}
