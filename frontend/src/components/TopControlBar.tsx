// src/components/TopControlBar.tsx
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
  //
  // button base: padding, border, transparent bg, transition
  //
const btnBase = 'flex flex-col items-center justify-center px-5 py-3 rounded-[12px] border-2 bg-transparent transition'; // Adjusted padding

// when OFF (idle)  
const idle = 'border-blue-400 text-blue-300';
// on hover
const hover  = 'hover:border-blue-400 hover:text-white hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]';
// when ON (active)
const active = 'border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.75)]';

const settingsButtonIdle = 'border-sky-500 text-sky-300'; // Matching the general idle

  // helper to pick the right combo
function classes(isOn: boolean) {
  return [btnBase, isOn ? active : `${idle} ${hover}`].join(' ');
}

  return (
    <header className="border-b border-gray-700">
      {/* ICON ROW */}
      <div className="flex items-center justify-between px-4 py-2 mb-2">
        <div className="flex space-x-4">
          {/* Voice */}
        <button className={classes(voiceOn)} onClick={onVoiceToggle}>
          {voiceOn
            ? <MicOn  className="w-7 h-7 fill-current stroke-current" /> // Slightly larger icon
            : <MicOff className="w-7 h-7 fill-current stroke-current" />}
          <span className="text-sm mt-1 select-none"> {/* Larger text */}
            {voiceOn ? 'Voice On' : 'Voice Off'}
          </span>
        </button>

          {/* Local LLM */}
          <button className={classes(useLocal)} onClick={onLocalToggle}>
            <CpuIcon className="w-7 h-7 fill-current stroke-current" />
            <span className="text-sm mt-1"> {useLocal ? "Local LLM" : "No Local"} </span>
          </button>

          {/* Cloud AI */}
          <button className={classes(useCloud)} onClick={onCloudToggle}>
            {useCloud ? (
              <CloudOn  className="w-7 h-7 fill-current stroke-current" />
            ) : (
              <CloudOff className="w-7 h-7 fill-current stroke-current" />
            )}
            <span className="text-sm mt-1"> {useCloud ? "Cloud AI" : "No Cloud"} </span>
          </button>

          {/* Online/Offline */}
          <button className={classes(offline)} onClick={onOfflineToggle}>
            {offline ? (
              <WifiOff className="w-7 h-7 fill-current stroke-current" />
            ) : (
              <WifiOn  className="w-7 h-7 fill-current stroke-current" />
            )}
            <span className="text-sm mt-1"> {offline ? "Offline" : "Online"} </span>
          </button>
        </div>

        {/* Settings gear */}
        <button className={`${btnBase} ${settingsButtonIdle} ${hover}`} onClick={onSettingsToggle}>
          <Gear className="w-7 h-7 fill-current stroke-current" /> {/* Ensure fill-current for consistency */}
          <span className="text-sm mt-1">Settings</span>
        </button>
      </div>

      {/* TAB ROW */}
      <Nav current={current} onChange={onSectionChange} />
    </header>
  );
}
