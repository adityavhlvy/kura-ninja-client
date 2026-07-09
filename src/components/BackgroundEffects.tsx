export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Asymmetric ambient glows — use theme colors */}
      <div className="absolute top-[-15%] right-[-8%] w-[35%] h-[35%] rounded-full bg-primary/[0.04] blur-[100px]" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-secondary/[0.03] blur-[80px]" />

      {/* Dot grid — uses foreground color so it adapts */}
      <div
        className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />
    </div>
  );
}
