// frontend/src/hooks/useConfig.ts
import { useEffect, useState } from "react";

export interface Config {
  compute_profile: string;
  // add more fields later
}

export const useConfig = () => {
  const [cfg, setCfg] = useState<Config | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then(r => r.json())
      .then(setCfg)
      .catch(console.error);
  }, []);

  const update = async (patch: Partial<Config>) => {
    const res = await fetch("/api/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });
    setCfg(await res.json());
  };

  return { cfg, update };
};
