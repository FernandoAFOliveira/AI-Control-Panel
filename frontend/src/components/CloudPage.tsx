// frontend/src/components/CloudPage.tsx
import { useState, type ChangeEvent } from "react";
import { useConfig, type Config } from "../hooks/useConfig";

export function CloudPage() {
  const { config, update } = useConfig();
  const [updating, setUpdating] = useState(false);

  if (!config) return <p>Loading cloud settings…</p>;

  const providers: Config["cloud_model"]["provider"][] = [
    "openai",
    "anthropic",
    // add more providers here later
  ];

  const handleChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value as Config["cloud_model"]["provider"];
    setUpdating(true);
    await update({
      cloud_model: {
        ...config.cloud_model,
        provider,
      },
    });
    setUpdating(false);
  };

  return (
    <section>
      <h2>Cloud AI Provider</h2>
      <label style={{ display: "block", margin: "12px 0" }}>
        <select
          value={config.cloud_model.provider}
          onChange={handleChange}
          disabled={updating}
        >
          {providers.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      {updating && <p>⏳ Applying…</p>}
    </section>
  );
}
