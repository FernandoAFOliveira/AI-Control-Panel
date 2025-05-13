// frontend/src/componets/ConfigPage.tsx

import { useConfig } from "../hooks/useConfig";

export function ConfigPage() {
  const { config, update } = useConfig();
  if (!config) return <p>Loading configuration…</p>;

  return (
    <section>
      <h2>Configuration</h2>

      <label style={{ display: "block", margin: "12px 0" }}>
        Compute Profile:
        <select
          value={config.compute_profile}
          onChange={(e) => update({ compute_profile: e.target.value })}
          style={{ marginLeft: 8 }}
        >
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>
    </section>
  );
}