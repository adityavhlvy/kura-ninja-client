import { useState, useEffect, useCallback, ReactNode } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Background from "../components/Background";
import CommandPalette from "../components/CommandPalette";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Command palette keyboard shortcut (Ctrl+K or Meta+K)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-[100dvh] flex flex-col relative w-full overflow-x-hidden selection:bg-primary/20 selection:text-primary">
      <Background />
      <Header onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />

      {/* Main content area with top offset for floating header */}
      <main className="flex-1 pt-20 md:pt-24 pb-16 w-full relative z-10">
        {children}
      </main>

      <Footer />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
}
