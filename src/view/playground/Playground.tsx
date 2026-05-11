import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { PLAYGROUND_ITEMS } from "./playground.config";
import { useState, useEffect, useRef } from "react";

const Playground = () => {
  const [glitchText, setGlitchText] = useState("THE PLAYGROUND");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Glitch title effect
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    const original = "THE PLAYGROUND";
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      if (frame > 20) {
        setGlitchText(original);
        clearInterval(interval);
        return;
      }
      setGlitchText(
        original
          .split("")
          .map((char, i) =>
            i < frame ? char : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  // Terminal boot sequence
  useEffect(() => {
    const lines = [
      "> SYSTEM BOOT...",
      "> LOADING EXPERIMENTS...",
      `> ${PLAYGROUND_ITEMS.length} SPECIMENS FOUND`,
      "> WARNING: CONTAINMENT LEVEL 3",
      "> ACCESS GRANTED_",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setTerminalLines((prev) => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  // Track mouse for ambient effect
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] relative overflow-hidden selection:bg-red-500/30 selection:text-white">
      {/* CRT Scanline overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
        }}
      />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-40 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.7)_100%)]" />

      {/* Mouse-following ambient glow */}
      <div
        className="fixed pointer-events-none z-0 w-[600px] h-[600px] rounded-full opacity-[0.04] blur-[100px] transition-all duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, #ff3333, transparent 70%)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
        }}
      />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,50,50,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,50,50,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header Section */}
        <header className="mb-20">
          {/* Terminal boot log */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-8 font-mono text-[11px] text-[#444] space-y-0.5 max-w-sm"
          >
            {terminalLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4, duration: 0.2 }}
                className={i === terminalLines.length - 1 ? "text-red-500/60" : ""}
              >
                {line}
              </motion.div>
            ))}
          </motion.div>

          {/* Title — glitch effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black tracking-[-0.06em] leading-[0.85] relative"
          >
            <span className="relative inline-block">
              {/* Glitch layers */}
              <span className="absolute inset-0 text-red-500/20 translate-x-[2px] translate-y-[1px] select-none" aria-hidden="true">
                {glitchText}
              </span>
              <span className="absolute inset-0 text-cyan-500/20 -translate-x-[2px] -translate-y-[1px] select-none" aria-hidden="true">
                {glitchText}
              </span>
              <span className="relative">{glitchText}</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-[#555] max-w-lg leading-relaxed font-light"
          >
            Weird experiments, absurd interfaces, and code that probably shouldn't exist.{" "}
            <span className="text-red-500/50 font-mono text-sm">Proceed with curiosity.</span>
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 2.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-[1px] w-full max-w-xs bg-gradient-to-r from-red-500/40 via-red-500/10 to-transparent origin-left"
          />
        </header>

        {/* Experiment Cards */}
        <div className="space-y-6">
          {PLAYGROUND_ITEMS.map((item, index) => (
            <ExperimentCard key={item.id} item={item} index={index} />
          ))}

          {PLAYGROUND_ITEMS.length === 0 && (
            <div className="py-20 text-center border border-dashed border-red-500/10 rounded-sm">
              <p className="text-[#333] font-mono text-sm">
                {">"} NO EXPERIMENTS ONLINE. LAB IS BOOTING...
              </p>
            </div>
          )}
        </div>

        {/* Footer warning */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="mt-24 pt-8 border-t border-white/[0.03] flex items-center justify-between"
        >
          <span className="text-[10px] font-mono text-[#333] uppercase tracking-[0.3em]">
            KURA-LABS // EXPERIMENTAL DIVISION
          </span>
          <span className="text-[10px] font-mono text-red-500/30 animate-pulse">
            ● LIVE
          </span>
        </motion.footer>
      </div>
    </div>
  );
};

/* ─── Experiment Card ─── */

function ExperimentCard({ item, index }: { item: typeof PLAYGROUND_ITEMS[0]; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [2, -2]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-2, 2]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containmentLevel = index + 1;
  const statusColors = ["text-emerald-500", "text-amber-500", "text-red-500"];
  const statusLabels = ["STABLE", "VOLATILE", "CRITICAL"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5 + index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        ref={ref}
        to={item.path}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group block"
      >
        <motion.div
          style={{ rotateX, rotateY, transformPerspective: 1200 }}
          className="relative border border-white/[0.04] bg-[#0d0d0d] hover:bg-[#111] rounded-sm overflow-hidden transition-colors duration-500 hover:border-red-500/20"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            {/* Left: Specimen number */}
            <div className="shrink-0 flex flex-col items-center md:items-start gap-1">
              <span className="text-[10px] font-mono text-[#333] uppercase tracking-[0.2em]">Specimen</span>
              <span className="text-4xl md:text-5xl font-black text-white/[0.06] group-hover:text-red-500/20 transition-colors duration-500 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Center: Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <item.icon className="text-lg text-[#444] group-hover:text-red-400 transition-colors duration-300" />
                <h3 className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-[#555] leading-relaxed max-w-md group-hover:text-[#777] transition-colors">
                {item.description}
              </p>
            </div>

            {/* Right: Status & metadata */}
            <div className="shrink-0 flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${statusColors[index % 3]} animate-pulse`} />
                <span className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] ${statusColors[index % 3]}`}>
                  {statusLabels[index % 3]}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#333]">
                CONTAINMENT: LV.{containmentLevel}
              </span>

              {/* Arrow */}
              <motion.span
                className="text-[#333] group-hover:text-red-400 transition-colors mt-2"
                whileHover={{ x: 4 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.span>
            </div>
          </div>

          {/* Bottom metadata bar */}
          <div className="px-6 md:px-8 py-3 border-t border-white/[0.03] flex items-center justify-between bg-white/[0.01]">
            <span className="text-[9px] font-mono text-[#2a2a2a] uppercase tracking-[0.2em]">
              EXP-{String(index + 1).padStart(3, "0")} // {item.id.toUpperCase().replace("-", "_")}
            </span>
            <span className="text-[9px] font-mono text-[#2a2a2a] group-hover:text-red-500/40 transition-colors">
              OPEN →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default Playground;
