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

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <footer className="bg-primary text-primary-content text-xs flex items-center justify-between px-2 py-1 select-none z-50 relative">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors">
                    <VscSourceControl />
                    <span>main*</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors">
                    <VscCheck />
                    <span>0 errors</span>
                </div>
                <div className="hidden md:flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors border-l border-primary-content/10 pl-4">
                    <FooterSpotify />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors min-w-[80px] justify-end">
                    <span>Ln {mousePos.y}, Col {mousePos.x}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors">
                    <span>UTF-8</span>
                </div>
                <div className="hidden sm:flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors">
                    <span>TypeScript React</span>
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors border-l border-primary-content/10 pl-4">
                    <LiveClock />
                </div>
                <div className="flex items-center gap-1 hover:bg-primary-focus cursor-pointer px-1 rounded transition-colors">
                    <VscBell />
                </div>
            </div>
        </footer>
    );
}
