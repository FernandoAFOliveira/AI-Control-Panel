// TopControlBar.tsx
import cloudIcon from '../assets/icons/cloud.svg';
import cpuIcon from '../assets/icons/cpu.svg';
import settingsIcon from '../assets/icons/gear.svg';
import micIcon from '../assets/icons/microphone.svg';
import wifiIcon from '../assets/icons/wifi-x.svg';

export default function TopControlBar({ onSettingsToggle }: { onSettingsToggle: () => void }) {
    return (
        <div className="w-full h-[70px] px-4 flex items-center justify-between bg-gradient-to-r from-[#0D1F40] to-[#1A3A66] shadow-lg rounded-b-2xl backdrop-blur-md border-b border-blue-800">
            {/* Left-side Controls */}
            <div className="flex items-center gap-4">
                {/* Voice Toggle */}
                <button className="w-10 h-10 bg-[#1E375E] rounded-lg flex items-center justify-center shadow-[0_0_12px_#00A9FF80] border border-[#53C5FF] hover:scale-105 transition-transform">
                    <img src={micIcon} alt="Voice On" className="w-6 h-6" />
                </button>

                {/* Local LLM */}
                <div className="w-10 h-10 rounded-lg bg-[#1E375E] flex items-center justify-center border border-[#53C5FF] shadow-[0_0_10px_#53C5FF80]">
                    <img src={cpuIcon} alt="Local LLM" className="w-6 h-6" />
                </div>

                {/* Cloud AI */}
                <div className="w-10 h-10 rounded-lg bg-[#1E375E] flex items-center justify-center border border-[#00A9FF] shadow-[0_0_10px_#00A9FF80]">
                    <img src={cloudIcon} alt="Cloud AI" className="w-6 h-6" />
                </div>

                {/* Network LLM */}
                <div className="w-10 h-10 rounded-lg bg-[#1E375E] flex items-center justify-center border border-[#FF4444] shadow-[0_0_10px_#FF444480]">
                    <img src={wifiIcon} alt="Network Offline" className="w-6 h-6" />
                </div>
            </div>

            {/* Right-side Controls */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onSettingsToggle}
                    className="w-10 h-10 bg-[#1E375E] rounded-lg flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_10px_#3D6AB280] border border-[#3D6AB2]"
                >
                    <img src={settingsIcon} alt="Settings" className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
