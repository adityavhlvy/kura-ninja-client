import { motion } from "framer-motion";
import { useState } from "react";
import { PiNavigationArrowLight } from "react-icons/pi";

export default function HeroPortrait() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center justify-center select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Decorative Outer Aura */}
      <div
        className="absolute -inset-4 rounded-[2.5rem] opacity-20 blur-xl transition-all duration-700 pointer-events-none"
        style={{
          backgroundColor: hovered ? "var(--primary)" : "transparent",
        }}
      />

      {/* Double Bezel Outer Enclosure */}
      <motion.div
        animate={{
          scale: hovered ? 1.01 : 1,
          rotateZ: hovered ? 0.5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative p-2 rounded-[2rem] bg-foreground/[0.04] border border-border/80 shadow-2xl backdrop-blur-md max-w-xs sm:max-w-sm w-full"
      >
        {/* Inner Core Container */}
        <div className="relative rounded-[calc(2rem-0.5rem)] overflow-hidden bg-card border border-border/60 aspect-[4/5] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <img
            src="/assets/profile-photos/professional-profile.png"
            alt="Aditya Vahlevy Nugraha"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />

          {/* Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent opacity-80" />

          {/* Coordinates HUD Overlay */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-foreground/80 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/60">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              JAKARTA, ID
            </span>
            <span className="text-muted-foreground/80 font-mono">
              -6.2088° S, 106.8456° E
            </span>
          </div>

          {/* Bottom Floating Telemetry Card */}
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-card/90 backdrop-blur-md border border-border/70 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                Affiliation
              </span>
              <span className="text-[9px] font-mono text-muted-foreground">
                Active Duty
              </span>
            </div>
            <p className="text-xs font-bold text-foreground leading-tight">
              PT Pupuk Indonesia (Persero)
            </p>
            <p className="text-[11px] text-muted-foreground truncate">
              Software & AI Engineer • AI & Geospatial
            </p>
          </div>
        </div>

        {/* Decorative Badge Pill */}
        <div className="absolute -bottom-3 -right-2 bg-primary text-primary-foreground text-[10px] font-mono font-black tracking-wider uppercase px-3 py-1 rounded-full shadow-lg border border-primary-foreground/20 flex items-center gap-1.5">
          <PiNavigationArrowLight size={12} className="rotate-45" />
          <span>Kura Ninja</span>
        </div>
      </motion.div>
    </div>
  );
}
