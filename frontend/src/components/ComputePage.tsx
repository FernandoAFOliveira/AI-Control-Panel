// frontend/src/components/ComputePage.tsx
import { useState, type ChangeEvent } from "react";
import { useConfig, type Config } from "../hooks/useConfig";

export function ComputePage() {
  const { config, update } = useConfig();
  const [updating, setUpdating] = useState(false);

  if (!config) return <p>Loading compute settings…</p>;

  const profiles: Config["compute_profile"][] = ["small", "medium", "large"];

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdating(true);
    await update({ compute_profile: e.target.value });
    setUpdating(false);
  };

  return (
    <section>
      <h2>Compute Profile</h2>
      <label className="block my-3">
        <select
          value={config.compute_profile}
          disabled={updating}
          onChange={handleChange}
          className="ml-2 p-1 bg-gray-800 border border-gray-600"
        >
          {profiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      {updating && <p>⏳ Applying compute profile…</p>}
    </section>
  );
}
