import { useEffect, useState } from "react";

export interface Status {
  ai_model: string;
  task_engine: string;
  cpu: number;
  ram: number;
}

export const useStatus = (interval = 2000) => {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    async function fetchStatus() {
      try {
        const res = await fetch("/api/status");

        if (!res.ok) {
          const text = await res.text();
          console.warn(`⚠️ /api/status returned ${res.status}:`, text);
          return; // <- Prevent crashing on 404/401/etc
        }

        const data = await res.json();
        setStatus(data);
      } catch (err) {
        console.error("🔥 Failed to fetch status", err);
      } finally {
        timer = setTimeout(fetchStatus, interval);
      }
    }

    fetchStatus();
    return () => clearTimeout(timer);
  }, [interval]);

  return status;
};
