"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ThemeDock() {
  const [currentTheme, setCurrentTheme] = useState("senja");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "senja";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setCurrentTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const next = currentTheme === "senja" ? "fajar" : "senja";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    setCurrentTheme(next);
  };

  const isSenja = currentTheme === "senja";

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
      {/* Outer Bezel: Perfectly proportioned with uniform padding around the capsule */}
      <button
        onClick={toggleTheme}
        className="pointer-events-auto relative flex items-center justify-center p-3 w-14 h-24 cursor-pointer bg-card/90 backdrop-blur-md border border-r-0 border-border hover:border-primary/45 rounded-l-2xl shadow-2xl transition-all duration-300 ease-out translate-x-2 hover:translate-x-0 group"
        aria-label={`Switch to ${isSenja ? "Fajar" : "Senja"} theme`}
        title={
          isSenja ? "Switch to Fajar (Dawn)" : "Switch to Senja (Twilight)"
        }
      >
        {/* Sky portal inside */}
        <div className="relative w-8 h-18 rounded-full overflow-hidden border border-border/80 bg-black/10 shadow-inner group-hover:scale-[1.02] transition-transform duration-300">
          {/* Fajar Sky Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#38bdf8] via-[#fdba74] to-[#f97316]"
            animate={{ opacity: isSenja ? 0 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeInOut" }}
          />

          {/* Senja Sky Layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#090918] via-[#150d2a] to-[#2e1136]"
            animate={{ opacity: isSenja ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: "easeInOut" }}
          />

          {/* Static Stars (Senja mode only) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isSenja ? 1 : 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
          >
            <div className="absolute top-2.5 left-2.5 w-0.5 h-0.5 bg-white/80 rounded-full" />
            <div className="absolute top-4.5 right-2.5 w-0.5 h-0.5 bg-white/90 rounded-full" />
            <div className="absolute top-9 left-3.5 w-0.5 h-0.5 bg-white/70 rounded-full" />
            <div className="absolute top-11 right-2 w-0.5 h-0.5 bg-white/60 rounded-full" />
          </motion.div>

          {/* Rising/Setting Sun */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-100 border border-amber-200/30 shadow-[0_0_8px_#f59e0b]"
            animate={
              shouldReduceMotion
                ? { y: isSenja ? 76 : 10, opacity: isSenja ? 0 : 1 }
                : {
                    y: isSenja ? 76 : 10,
                    opacity: isSenja ? 0 : 1,
                    scale: isSenja ? 0.7 : 1,
                  }
            }
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          />

          {/* Rising/Setting Moon */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5"
            animate={
              shouldReduceMotion
                ? { y: isSenja ? 11 : -20, opacity: isSenja ? 1 : 0 }
                : {
                    y: isSenja ? 11 : -20,
                    opacity: isSenja ? 1 : 0,
                    scale: isSenja ? 1 : 0.7,
                  }
            }
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <svg
              className="w-full h-full text-blue-100 drop-shadow-[0_0_4px_#3b82f6]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.3 22h-.1c-5.5-.1-10-4.6-10-10.1C2.2 6.4 6.7 1.9 12.2 2c.3 0 .6.1.9.2-1.5.8-2.4 2.5-2.4 4.3 0 2.9 2.4 5.2 5.3 5.2 1.5 0 2.9-.6 3.8-1.7.3.7.4 1.5.4 2.3-.1 5.4-4.6 9.7-9.9 9.7z" />
            </svg>
          </motion.div>

          {/* Mountains Silhouette */}
          <svg
            className="absolute bottom-0 left-0 right-0 h-4.5 w-full text-border fill-current z-10"
            viewBox="0 0 100 20"
            preserveAspectRatio="none"
          >
            <path d="M0,20 L100,20 L100,8 L75,13 L50,5 L25,12 L0,8 Z" />
          </svg>
        </div>
      </button>
    </div>
  );
}
