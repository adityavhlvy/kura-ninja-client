"use client";

interface IdeWindowProps {
    children: React.ReactNode;
    fileName?: string;
    className?: string;
}

export default function IdeWindow({ children, fileName = "profile.ts", className = "" }: IdeWindowProps) {
    return (
        <div className={`ide-window flex flex-col h-full w-full border border-white/5 bg-zinc-950/80 backdrop-blur-xl group/window ${className}`}>
            {/* Window Header */}
            <div className="h-10 border-b border-white/5 flex items-center px-4 gap-4 bg-zinc-900/20">
                <div className="flex gap-1.5 grayscale opacity-40 group-hover/window:grayscale-0 group-hover/window:opacity-100 transition-all duration-500">
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#ff5f56]/80" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#ffbd2e]/80" />
                    <div className="w-2.5 h-2.5 rounded-sm bg-[#27c93f]/80" />
                </div>

                <div className="flex-1 flex justify-start items-center gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-primary/50 uppercase">FILE:</span>
                    <span className="text-[11px] font-mono text-zinc-400 group-hover/window:text-primary transition-colors">{fileName}</span>
                </div>

                <div className="flex gap-4">
                    <div className="w-3 h-[1px] bg-white/10" />
                    <div className="w-3 h-3 border border-white/10" />
                    <div className="w-3 h-3 relative">
                        <div className="absolute inset-0 border border-white/10 rotate-45" />
                    </div>
                </div>
            </div>

            {/* Window Content */}
            <div className="flex-1 overflow-auto relative">
                {children}
                {/* Subtle Scanline Effect Container (Optional but very "Anti-AI") */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_2px,3px_100%] z-50 opacity-20"></div>
            </div>
        </div>
    );
}
