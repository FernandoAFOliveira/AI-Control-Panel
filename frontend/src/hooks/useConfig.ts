// frontend/src/hooks/useConfig.ts
import { useEffect, useState } from "react";

export interface Config {
  compute_profile: string;
  local_model: {
      /** the name of the active local LLM */
    name: string;
    /** URL (or endpoint) if you need to drive it remotely */
    url: string;
    /** how confident it needs to be before fallback */
    confidence_threshold: number;
    /** whether to fall back to cloud if local fails */
    fallback_enabled: boolean;
  };
    cloud_model: {
    provider: string;
    model: string;
    use_fallback: boolean;
    api_key_env: string;
  };
  // add more fields later
}

export const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => {
        if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
        return r.json();
      })
      .then(setConfig)
      .catch((err) => {
        console.error("Failed to load config:", err);
      });
  }, []);

  const update = async (patch: Partial<Config>) => {
    const res = await fetch("/api/config", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch)
    });    if (!res.ok) throw new Error(`PATCH failed: ${res.status}`);
    const updated = await res.json();
    setConfig(updated);
  };

  return { config, update };
};
