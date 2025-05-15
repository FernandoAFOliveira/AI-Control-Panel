// frontend/src/components/TopControlBar.tsx
import CloudOff from "../assets/svg/cloud-slash.svg?react";
import CloudOn from "../assets/svg/cloud.svg?react";
import CpuIcon from "../assets/svg/cpu.svg?react";
import Gear from "../assets/svg/gear.svg?react";
import MicOff from "../assets/svg/microphone-slash.svg?react";
import MicOn from "../assets/svg/microphone.svg?react";
import WifiOff from "../assets/svg/wifi-x.svg?react";
import WifiOn from "../assets/svg/wifi.svg?react";

import { Nav } from "../Nav";
import type { Section } from "../types";

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

  // Responsive sizes: Base -> sm -> lg
  const iconSize = "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"; 
  const textSize = "text-[10px] sm:text-xs lg:text-sm"; 

  const btnBase = `
    flex flex-col items-center justify-center
    p-1.5 sm:p-2                      /* Responsive padding */
    m-0.5 sm:m-1                      /* Responsive margin for spacing */
    min-w-[60px] min-h-[60px]         /* Base minimum size */
    sm:min-w-[65px] sm:min-h-[65px]   /* Min size on sm+ screens */
    lg:min-w-[75px] lg:min-h-[75px]   /* Min size on lg+ screens */
    border-2 bg-transparent
    rounded-[10px]                    /* Rounded corners */
    text-white                        /* Default to white text/icons */
    transition-all duration-150 ease-in-out
    focus:outline-none
    focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900
  `;

  const idleState = `
    border-sky-500                  
    text-sky-300                    
    shadow-none                     
  `;

  const hoverEffect = `
    hover:border-sky-300           
    hover:text-white               
    hover:shadow-[0_0_8px_2px_rgba(56,189,248,0.4)]   /* Base hover glow */
    lg:hover:shadow-[0_0_12px_3px_rgba(56,189,248,0.5)] /* Larger hover glow on lg+ */
  `;

  const activeState = `
    border-sky-300                 
    text-white                     
    bg-transparent                 
    shadow-[0_0_12px_2px_rgba(56,189,248,0.65)] /* Base active glow */
    lg:shadow-[0_0_18px_4px_rgba(56,189,248,0.75)] /* Larger active glow on lg+ */
  `;

  function getButtonClasses(isOn: boolean): string {
    return `${btnBase} ${isOn ? activeState : idleState} ${hoverEffect}`;
  }

  const settingsButtonClasses = `${btnBase} ${idleState} ${hoverEffect}`;

  return (
    <header className="px-1 sm:px-2 pt-2 sm:pt-3 pb-1 mb-1 border-b border-slate-700">
      <div className="flex items-start justify-between mx-auto max-w-full px-1 sm:px-2 md:px-4">
        <div className="flex flex-wrap justify-start -m-0.5 sm:-m-1">
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

        {/* Settings Gear Button */}
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
