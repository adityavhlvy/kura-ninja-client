import { memo } from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-base-300">
      {/* 
        1. Gradient Mesh Layer 
        Uses multiple blobs with blurred edges moving around to create a "lava lamp" or "aurora" effect.
      */}
      <div className="absolute inset-0 opacity-60 dark:opacity-50">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/40 blur-[100px] animate-blob-bounce" />
        <div className="absolute top-[20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-secondary/40 blur-[100px] animate-blob-bounce animation-delay-2000" />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-accent/40 blur-[100px] animate-blob-bounce animation-delay-4000" />
      </div>

      {/* 
        2. Cyber Grid Layer 
        A perspective grid or simple pattern to add "tech" feel. 
        We use a repeating radial gradient or linear gradient pattern.
      */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 dark:opacity-20" />

      {/* 
         3. Noise Overlay (Optional for texture) 
         Adds a subtle grain to prevent banding and add realism.
      */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default memo(Background);
