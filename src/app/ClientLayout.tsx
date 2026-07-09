import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FileTreeSidebar from "../components/FileTreeSidebar";
import Background from "../components/Background";
import AtmosphereIndicator from "../components/AtmosphereIndicator";
import CommandPalette from "../components/CommandPalette";
import { TimeProvider } from "../context/TimeContext";
import { initEasterEggs } from "../utils/easterEggs";
import InitialLoader from "../components/InitialLoader";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768;
    }
    return true;
  });
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    initEasterEggs();
  }, []);

  // Command palette keyboard shortcut (Ctrl+K)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  }, [pathname, isMobile]);

  // Memoize loader completion callback to prevent timer reset loops
  const handleLoaderComplete = useCallback(() => {
    setIsAppLoaded(true);
  }, []);

  return (
    <TimeProvider>
      {!isAppLoaded && <InitialLoader onComplete={handleLoaderComplete} />}

      <div
        className={`h-screen h-[100dvh] flex flex-col overflow-hidden relative transition-opacity duration-1000 ${isAppLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <Background />
        <AtmosphereIndicator />
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 overflow-hidden relative isolate">
          {/* Mobile Sidebar Overlay */}
          <div
            className={`absolute inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isMobile && isSidebarOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <aside
            className={`
                          ${isMobile ? "absolute h-full z-50" : "relative"}
                          ${isMobile && isSidebarOpen ? "shadow-xl" : ""}
                          ${isSidebarOpen ? "w-64" : isMobile ? "w-0 pointer-events-none" : "w-20"}
                          ${isSidebarOpen || !isMobile ? "border-r border-border" : "border-r-0"}
                          bg-muted/80 backdrop-blur-sm transition-all duration-300 flex flex-col overflow-hidden
                      `}
          >
            <div className={isMobile ? "h-full w-64" : "h-full"}>
              <FileTreeSidebar isCollapsed={!isSidebarOpen && !isMobile} />
            </div>
          </aside>

          <main className="flex-1 p-0 overflow-y-auto bg-background/60 backdrop-blur-[3px] relative w-full scroll-smooth scrollbar-senja">
            <div className="w-full min-h-full pb-20">{children}</div>
          </main>
        </div>
        <Footer />

        {/* Command Palette */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />
      </div>
    </TimeProvider>
  );
}
