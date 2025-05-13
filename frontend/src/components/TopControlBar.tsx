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

export default function TopControlBar({
  current, onSectionChange,
  voiceOn, onVoiceToggle,
  useLocal, onLocalToggle,
  useCloud, onCloudToggle,
  offline, onOfflineToggle,
  onSettingsToggle,
}: {
  current: Section;
  onSectionChange(s: Section): void;
  voiceOn: boolean;   onVoiceToggle(): void;
  useLocal: boolean;  onLocalToggle(): void;
  useCloud: boolean;  onCloudToggle(): void;
  offline: boolean;   onOfflineToggle(): void;
  onSettingsToggle(): void;
}) {
  const btnBase = `
    flex flex-col items-center justify-center
    px-4 py-2 rounded-lg
    border-2 bg-transparent text-white
    transition
  `;

  const idle   = "border-blue-300 text-white/70";
  const hover  = "hover:border-blue-400 hover:text-white hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]";
  const active = "border-blue-500 text-white bg-black/40 shadow-[0_0_12px_rgba(59,130,246,0.75)]";

  const classes = (on: boolean) =>
    `${btnBase} ${on ? active : `${idle} ${hover}`}`;

  return (
    <header className="border-b border-gray-700 px-4">
      <div className="flex items-center justify-between py-2 mb-2">
        <div className="flex space-x-4">
          <button className={classes(voiceOn)} onClick={onVoiceToggle}>
            {voiceOn
              ? <MicOn  className="w-6 h-6 text-white"/>
              : <MicOff className="w-6 h-6 text-white"/>}
            <span className="text-xs mt-1">{voiceOn ? "Voice On" : "Voice Off"}</span>
          </button>

          <button className={classes(useLocal)} onClick={onLocalToggle}>
            <CpuIcon className="w-6 h-6 text-white"/>
            <span className="text-xs mt-1">{useLocal ? "Local LLM" : "No Local"}</span>
          </button>

          <button className={classes(useCloud)} onClick={onCloudToggle}>
            {useCloud
              ? <CloudOn  className="w-6 h-6 text-white"/>
              : <CloudOff className="w-6 h-6 text-white"/>}
            <span className="text-xs mt-1">{useCloud ? "Cloud AI" : "No Cloud"}</span>
          </button>

          <button className={classes(offline)} onClick={onOfflineToggle}>
            {offline
              ? <WifiOff className="w-6 h-6 text-white"/>
              : <WifiOn  className="w-6 h-6 text-white"/>}
            <span className="text-xs mt-1">{offline ? "Offline" : "Online"}</span>
          </button>
        </div>

        <button className={`${btnBase} ${idle} ${hover}`} onClick={onSettingsToggle}>
          <Gear className="w-6 h-6 text-white"/>
          <span className="text-xs mt-1">Settings</span>
        </button>
      </div>

      <Nav current={current} onChange={onSectionChange}/>
    </header>
  );
}
