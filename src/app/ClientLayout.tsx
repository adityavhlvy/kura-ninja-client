import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback, useRef, ReactNode } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import FileTreeSidebar from "../components/FileTreeSidebar";
import Background from "../components/Background";
import CommandPalette from "../components/CommandPalette";

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
  const { pathname } = useLocation();

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

  // Track mobile breakpoint and collapse the sidebar accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar on route change when on mobile
  const lastPathname = useRef(pathname);
  useEffect(() => {
    if (pathname !== lastPathname.current) {
      lastPathname.current = pathname;
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  }, [pathname, isMobile]);

  return (
    <div className="app-shell flex flex-col overflow-hidden relative">
      <Background />
      <Header
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />
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

        {/* Explorer */}
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

        <main className="flex-1 overflow-y-auto bg-background/60 backdrop-blur-[2px] relative w-full">
          <div className="w-full min-h-full pb-20">{children}</div>
        </main>
      </div>
      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}