import { memo } from "react";

const Background = () => (
  <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background select-none">
    {/* Fine tactile paper/film grain */}
    <div
      className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />

    {/* Subtle topographic / radial ambient warmth */}
    <div
      className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full opacity-[0.035] blur-[120px] pointer-events-none"
      style={{ backgroundColor: "var(--primary)" }}
    />
  </div>
);

export default memo(Background);
