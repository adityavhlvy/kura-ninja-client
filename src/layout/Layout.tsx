import { useLocation, useOutlet } from "react-router-dom";
import { useState, cloneElement, useEffect, useCallback } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FileTreeSidebar from "../components/FileTreeSidebar";
import Background from "../components/Background";
import { AnimatePresence } from "framer-motion";
import AtmosphereIndicator from "../components/AtmosphereIndicator";
import ParticleField from "../components/ParticleField";
import CommandPalette from "../components/CommandPalette";
import FeatureHints from "../components/FeatureHints";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const location = useLocation();
  const element = useOutlet();

  // Command palette keyboard shortcut (Ctrl+K)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768; // md breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar on route change if on mobile
  useEffect(() => {
    if (isMobile && isSidebarOpen) {
      const timer = setTimeout(() => setIsSidebarOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile, isSidebarOpen]);

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">
      <Background />
      <ParticleField />
      <AtmosphereIndicator />
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden relative isolate">
        {/* Mobile Sidebar Overlay */}
        {isMobile && isSidebarOpen && (
          <div
            className="absolute inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
                        ${isMobile
              ? "absolute h-full z-50 shadow-xl"
              : "relative"
            }
                        ${isSidebarOpen ? "w-64" : isMobile ? "w-0" : "w-20"} 
                        border-r bg-base-200/80 backdrop-blur-sm transition-all duration-300 flex flex-col overflow-hidden
                    `}
        >
          <div className={isMobile ? "h-full w-64" : "h-full"}>
            {" "}
            {/* Inner container to prevent content squishing on mobile */}
            <FileTreeSidebar isCollapsed={!isSidebarOpen && !isMobile} />
          </div>
        </aside>

        <main className="flex-1 p-0 overflow-y-auto bg-base-100/60 backdrop-blur-[3px] relative w-full scroll-smooth scrollbar-senja">
          <AnimatePresence mode="wait">
            {element && cloneElement(element, { key: location.pathname })}
          </AnimatePresence>
        </main>
      </div>
      <Footer />

      {/* Command Palette */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />

      {/* Feature Hints */}
      <FeatureHints />
    </div>
  );
}
