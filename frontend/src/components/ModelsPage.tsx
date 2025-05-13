// frontend/src/components/ModelsPage.tsx
import { useState, type ChangeEvent } from "react";
import { useConfig, type Config } from "../hooks/useConfig";

export function ModelsPage() {
  const { config, update } = useConfig();
  const [updating, setUpdating] = useState(false);

  if (!config) return <p>Loading models…</p>;

  const options: Config["local_model"]["name"][] = [
    "llama3",
    "7b",
    "8b",
    "13b",
  ];


  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    setUpdating(true);
    await update({
      local_model: { ...config.local_model, name: e.target.value },
    });
    setUpdating(false);
  };

  return (
    <section>
      <h2>Local Model</h2>
      <label className="block my-3">
        <select
          value={config.local_model.name}
          disabled={updating}
          onChange={handleChange}
          className="ml-2 p-1 bg-gray-800 border border-gray-600"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      {updating && <p>⏳ Switching model…</p>}
    </section>
  );
}