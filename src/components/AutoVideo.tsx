import { useEffect, useRef, type VideoHTMLAttributes } from "react";

/** Muted looping video that plays only while on screen, and never for readers who asked for less motion. */
export function AutoVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), {
      threshold: 0.25,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} preload="metadata" loop muted playsInline {...props} />;
}
