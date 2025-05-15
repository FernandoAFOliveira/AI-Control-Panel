// frontend/src/Nav.tsx
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

  const tabBase = `
    px-3 py-1.5 sm:px-4 sm:py-2 lg:px-5 lg:py-2.5 /* Responsive padding */
    min-w-[70px] sm:min-w-[80px] lg:min-w-[100px]   /* Responsive min-width */
    text-xs sm:text-sm font-medium    /* Responsive text size */
    rounded-full                  
    border-2 bg-transparent       
    transition-all duration-200 ease-in-out
    focus:outline-none            
    focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
  `;

  const tabIdle = `
    border-sky-600                
    text-sky-400                  
    shadow-none                   
  `;

  const tabActive = `
    border-sky-300                
    text-white                      
    bg-transparent                  
    shadow-[0_0_10px_1px_rgba(56,189,248,0.75)] lg:shadow-[0_0_12px_2px_rgba(56,189,248,0.85)]
  `;

  const tabHover = `
    hover:border-sky-400            
    hover:text-sky-200              
    hover:shadow-[0_0_8px_1px_rgba(56,189,248,0.4)] lg:hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.5)]
  `;

  return (
    <nav className="flex justify-center flex-wrap -m-0.5 sm:-m-1 py-2 mt-1 sm:mt-2 px-1 sm:px-2 border-b border-slate-700">
      {sections.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`
            m-0.5 sm:m-1                           
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
