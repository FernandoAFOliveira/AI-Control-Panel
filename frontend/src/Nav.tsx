// src/Nav.tsx
import type { Section } from "./types";

console.log("✅ Loaded Nav.tsx");

export function Nav({
  current,
  onChange,
}: {
  current: Section;
  onChange: (s: Section) => void;
}) {
  const sections: Section[] = [
    "Status", "Compute", "Models", "Cloud", "Logs", "Memory",
  ];

  return (
    <nav className="flex justify-center space-x-4 py-3 border-b border-blue-700">
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`
            px-6 py-3 text-sm // Added text-sm, adjusted padding
            rounded-full
            transition
            ${s === current
              ? 'border-sky-300 text-white shadow-[0_0_12px_rgba(125,211,252,0.85)] bg-sky-700/50' // Active: White text, lighter border, distinct background tint & glow
              : 'border-sky-600 text-sky-400 hover:text-sky-200 hover:border-sky-400 hover:shadow-[0_0_8px_rgba(125,211,252,0.5)]' // Idle: Sky blue text & border. Hover: Lighter text/border & glow
            }
          `}
        >
          {s}
        </button>
      ))}
    </nav>
  );
}
