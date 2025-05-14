// frontend/src/Nav.tsx
import type { Section } from "./types"; // Ensure this path is correct

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

  // Base styles for all tab buttons
  const tabBase = `
    px-4 sm:px-5 py-2            /* Padding */
    min-w-[80px]                  /* Minimum width for tabs, adjust as needed */
    text-sm font-medium           /* Font size and weight */
    rounded-full                  /* Pill shape */
    border-2 bg-transparent       /* Transparent background, 2px border */
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 /* Accessibility */
  `;

  // Styles for an INACTIVE tab - Light blue border, light blue text, no glow
  const tabIdle = `
    border-sky-500                /* Light blue border */
    text-sky-300                  /* Light blue text */
    shadow-none                   /* Explicitly no shadow for idle state */
  `;

  // Styles for an ACTIVE tab - Brighter/lighter border, white text, stronger glow, transparent background
  const tabActive = `
    border-sky-300                /* Brighter/lighter light blue border (sky-300 is lighter than sky-500) */
    text-white                      /* White text for the active tab */
    bg-transparent                  /* Ensure transparent background */
    shadow-[0_0_12px_2px_rgba(56,189,248,0.75)] /* Sky-400 at 75% opacity for glow */
  `;

  // Styles for HOVERING over ANY tab - Add glow, adjust border/text for hover
  const tabHover = `
    hover:border-sky-400            /* Slightly brighter border on hover */
    hover:text-sky-100              /* Slightly lighter text on hover */
    hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.5)] /* Sky-400 at 50% opacity for glow */
  `;

  return (
    <nav className="flex justify-center flex-wrap -m-0.5 sm:-m-1 py-2 mt-1 px-1 sm:px-2 border-b border-slate-700"> {/* Adjusted margins/padding */}
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`
            m-0.5 sm:m-1                           /* Margin for spacing between tabs */
            ${tabBase}
            ${s === current ? tabActive : tabIdle}
            ${tabHover}
          `}
        >
          {s}
        </button>
      ))}
    </nav>
  );
}
