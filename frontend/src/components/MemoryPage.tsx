// frontend/src/components/MemoryPage.tsx
import { useConfig } from "../hooks/useConfig";

export function MemoryPage() {
  const { config } = useConfig();

  if (!config) return <p>Loading memory settings…</p>;

  return (
    <section>
      <h2>Memory</h2>
      <p>
        Memory file location: <code>{config.memory.file}</code>
      </p>
    </section>
  );
}
