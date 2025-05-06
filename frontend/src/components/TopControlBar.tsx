// TopControlBar.tsx
import { ReactComponent as CloudIcon } from '../assets/svg/cloud.svg?react';
import { ReactComponent as CpuIcon } from '../assets/svg/cpu.svg?react';
import { ReactComponent as GearIcon } from '../assets/svg/gear.svg?react';
import { ReactComponent as MicIcon } from '../assets/svg/microphone.svg?react';
import { ReactComponent as WifiXIcon } from '../assets/svg/wifi-x.svg?react';

interface TopControlBarProps {
    onSettingsToggle: () => void;
}

export default function TopControlBar({ onSettingsToggle }: TopControlBarProps) {
    return (
        <div className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-[#0B1120] to-blue-900 border-b border-blue-700">
            <div className="flex space-x-6 items-center">
                <div className="flex flex-col items-center cursor-pointer group">
                    <MicIcon className="w-6 h-6 text-green-400 group-hover:text-green-300 transition" />
                    <span className="text-xs mt-1">Voice On</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                    <CpuIcon className="w-6 h-6 text-blue-300 group-hover:text-white transition" />
                    <span className="text-xs mt-1">Local LLM</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                    <CloudIcon className="w-6 h-6 text-purple-300 group-hover:text-white transition" />
                    <span className="text-xs mt-1">Cloud AI</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer group">
                    <WifiXIcon className="w-6 h-6 text-red-400 group-hover:text-red-300 transition" />
                    <span className="text-xs mt-1">Offline</span>
                </div>
            </div>
            <div className="cursor-pointer" onClick={onSettingsToggle}>
                <GearIcon className="w-6 h-6 text-gray-300 hover:text-white transition" />
            </div>
        </div>
    );
}
