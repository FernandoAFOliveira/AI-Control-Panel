// BackgroundPanel.tsx
import React from 'react';

export default function BackgroundPanel({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full min-h-screen bg-[#0B1120]">
            {/* Futuristic background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
                style={{ backgroundImage: 'url(/src/assets/backgrounds/hud-ring-glow.png)' }}
            />

            {/* Overlay glowing lines (SVG circuits) */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    viewBox="0 0 1440 1024"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full opacity-20"
                >
                    <defs>
                        <linearGradient id="circuitGlow" x1="0" y1="0" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#7F00FF" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>

                    {/* Example glowing lines (simplified) */}
                    <path
                        d="M100 100 L400 100 L400 400"
                        stroke="url(#circuitGlow)"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M200 200 C300 100, 400 300, 500 200"
                        stroke="url(#circuitGlow)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Glowing stars overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[length:30px_30px] opacity-10 animate-pulse pointer-events-none" />

            {/* Content on top */}
            <div className="relative z-10 p-4 min-h-screen">
                {children}
            </div>
        </div>
    );
}
