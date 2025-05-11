// frontend/src/hooks/useStatus.ts
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
        setStatus(await res.json());
      } catch (err) {
        console.error("status poll failed", err);
      } finally {
        timer = setTimeout(fetchStatus, interval);
      }
    }
    fetchStatus();
    return () => clearTimeout(timer);
  }, [interval]);

  return status;
};
