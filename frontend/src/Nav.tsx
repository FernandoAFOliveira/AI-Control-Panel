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
            px-5 py-2 
            rounded-full
            border-2 border-blue-400
            bg-transparent text-white
            transition
            ${s === current
              ? 'shadow-[0_0_12px_rgba(59,130,246,0.85)]'
               : 'hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]'
            }
          `}
        >
          {s}
        </button>
      ))}
    </nav>
  );
}
