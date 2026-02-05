import { VscSourceControl, VscCheck, VscBell } from "react-icons/vsc";
import { useState, useEffect } from "react";
import FooterSpotify from "../components/FooterSpotify";
import LiveClock from "../components/LiveClock";

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="w-full bg-[#007acc] text-white text-xs flex items-center justify-between px-3 py-1 select-none z-50 shadow-lg font-mono">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscSourceControl className="text-sm" />
          <span>main*</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscCheck className="text-sm" />
          <span>0 errors</span>
        </div>
        <div className="hidden md:flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors border-l border-white/20 pl-4 ml-2">
          <FooterSpotify />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>
            Ln {mousePos.y}, Col {mousePos.x}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>UTF-8</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <span>TypeScript React</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors border-l border-white/20 pl-4 ml-2">
          <LiveClock />
        </div>
        <div className="flex items-center gap-1 hover:bg-white/10 cursor-pointer px-2 py-0.5 rounded transition-colors">
          <VscBell className="text-sm" />
        </div>
      </div>
    </footer>
  );
}
