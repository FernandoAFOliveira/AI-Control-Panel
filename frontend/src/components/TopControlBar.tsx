// frontend/src/components/TopControlBar.tsx
import CloudOff from "../assets/svg/cloud-slash.svg?react";
import CloudOn from "../assets/svg/cloud.svg?react";
import CpuIcon from "../assets/svg/cpu.svg?react";
import Gear from "../assets/svg/gear.svg?react";
import MicOff from "../assets/svg/microphone-slash.svg?react";
import MicOn from "../assets/svg/microphone.svg?react";
import WifiOff from "../assets/svg/wifi-x.svg?react";
import WifiOn from "../assets/svg/wifi.svg?react";

import { Nav } from "../Nav"; // Assuming Nav.tsx is in src/, adjust if it's in src/components/
import type { Section } from "../types"; // Ensure this path is correct

console.log("✅ Loaded TopControlBar.tsx");

export interface TopControlBarProps {
  current: Section;
  onSectionChange(s: Section): void;
  voiceOn: boolean;
  onVoiceToggle(): void;
  useLocal: boolean;
  onLocalToggle(): void;
  useCloud: boolean;
  onCloudToggle(): void;
  offline: boolean;
  onOfflineToggle(): void;
  onSettingsToggle(): void;
}

export default function TopControlBar({
  current, onSectionChange,
  voiceOn, onVoiceToggle,
  useLocal, onLocalToggle,
  useCloud, onCloudToggle,
  offline, onOfflineToggle,
  onSettingsToggle,
}: TopControlBarProps) {

  const iconSize = "w-6 h-6"; // Icon size (1.5rem) - you can make this w-7 h-7 if preferred
  const textSize = "text-xs";  // Text size below icons (0.75rem)

  // Base styles for all top icon buttons
  const btnBase = `
    flex flex-col items-center justify-center
    p-2                             /* Padding inside the button */
    min-w-[70px] min-h-[70px]       /* Minimum size for better touch targets */
    border-2 bg-transparent         /* Transparent background, 2px border */
    rounded-[10px]                  /* Rounded corners */
    transition-all duration-200 ease-in-out /* Smooth transitions */
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 /* Accessibility focus */
  `;

  // Styles for when a button is INACTIVE (off) - Light blue border, light blue text, no glow
  const idleState = `
    border-sky-500                  /* Light blue border (e.g., Tailwind's sky-500) */
    text-sky-300                    /* Light blue text/icon (e.g., Tailwind's sky-300) */
    shadow-none                     /* Explicitly no shadow for idle state */
  `;

  // Styles for when hovering over ANY button (active or inactive) - Add glow, brighter border/text
  const hoverEffect = `
    hover:border-sky-300            /* Brighter light blue border on hover */
    hover:text-white                /* White text/icon on hover for contrast */
    hover:shadow-[0_0_10px_2px_rgba(56,189,248,0.5)] /* Sky-400 at 50% opacity for glow */
  `;

  // Styles for when a button is ACTIVE (on) - Brighter border, white text, stronger glow, transparent background
  const activeState = `
    border-sky-300                  /* Brighter/lighter light blue border for active (sky-300 is lighter than sky-500) */
    text-white                      /* White text/icon for active */
    bg-transparent                  /* Ensure transparent background */
    shadow-[0_0_15px_3px_rgba(56,189,248,0.75)]  /* Stronger Sky-400 at 75% opacity for glow */
  `;

  function getButtonClasses(isOn: boolean): string {
    return `${btnBase} ${isOn ? activeState : idleState} ${hoverEffect}`;
  }

  const settingsButtonClasses = `${btnBase} ${idleState} ${hoverEffect}`;

  return (
    <header className="px-2 pt-3 pb-1 mb-1 border-b border-slate-700"> {/* Reduced mb slightly */}
      <div className="flex items-start justify-between mx-auto max-w-7xl px-1 sm:px-2 md:px-4">
        <div className="flex flex-wrap justify-start -m-0.5 sm:-m-1"> {/* Adjusted negative margin for tighter packing if needed */}
          {/* Voice Button */}
          <div className="m-0.5 sm:m-1">
            <button className={getButtonClasses(voiceOn)} onClick={onVoiceToggle}>
              {voiceOn
                ? <MicOn  className={`${iconSize} fill-current`} />
                : <MicOff className={`${iconSize} fill-current`} />}
              <span className={`${textSize} mt-1 select-none`}>
                {voiceOn ? 'Voice On' : 'Voice Off'}
              </span>
            </button>
          </div>

          {/* Local LLM Button */}
          <div className="m-0.5 sm:m-1">
            <button className={getButtonClasses(useLocal)} onClick={onLocalToggle}>
              <CpuIcon className={`${iconSize} fill-current`} />
              <span className={`${textSize} mt-1 select-none`}> {useLocal ? "Local LLM" : "No Local"} </span>
            </button>
          </div>

          {/* Cloud AI Button */}
          <div className="m-0.5 sm:m-1">
            <button className={getButtonClasses(useCloud)} onClick={onCloudToggle}>
              {useCloud
                ? <CloudOn  className={`${iconSize} fill-current`} />
                : <CloudOff className={`${iconSize} fill-current`} />}
              <span className={`${textSize} mt-1 select-none`}> {useCloud ? "Cloud AI" : "No Cloud"} </span>
            </button>
          </div>
          
          {/* Online/Offline Button */}
          <div className="m-0.5 sm:m-1">
            <button className={getButtonClasses(!offline)} onClick={onOfflineToggle}>
              {offline
                ? <WifiOff className={`${iconSize} fill-current`} />
                : <WifiOn  className={`${iconSize} fill-current`} />}
              <span className={`${textSize} mt-1 select-none`}> {offline ? "Offline" : "Online"} </span>
            </button>
          </div>
        </div>

        <div className="m-0.5 sm:m-1">
          <button className={settingsButtonClasses} onClick={onSettingsToggle}>
            <Gear className={`${iconSize} fill-current`} />
            <span className={`${textSize} mt-1 select-none`}>Settings</span>
          </button>
        </div>
      </div>

      <Nav current={current} onChange={onSectionChange} />
    </header>
  );
}
