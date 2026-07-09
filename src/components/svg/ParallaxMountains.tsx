import { motion } from "framer-motion";

/**
 * Parallax mountain landscape — smooth rolling hills, not jagged peaks.
 * Placed as decorative element within content flow, not fixed.
 */
export default function ParallaxMountains({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`${className} overflow-hidden`}>
      <svg
        viewBox="0 0 800 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* Sun/Moon */}
        <motion.circle
          r="10"
          fill="var(--primary)"
          opacity="0.15"
          animate={{ cx: [150, 400, 650], cy: [80, 30, 80] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Back layer — gentle rolling hills */}
        <motion.path
          d="M0 140 C80 120, 140 100, 200 110 C280 125, 320 95, 400 105 C480 115, 540 90, 620 100 C700 110, 750 95, 800 108 L800 180 L0 180 Z"
          fill="var(--primary)"
          opacity="0.04"
          animate={{ x: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mid layer — rounder mountains */}
        <motion.path
          d="M0 155 C60 140, 120 125, 180 135 C260 148, 300 120, 380 130 C440 138, 500 115, 560 128 C640 142, 700 122, 800 135 L800 180 L0 180 Z"
          fill="var(--primary)"
          opacity="0.08"
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Front layer — closest hills */}
        <motion.path
          d="M0 165 C50 155, 100 145, 160 152 C240 162, 280 142, 360 150 C420 156, 480 138, 560 148 C620 155, 700 140, 800 152 L800 180 L0 180 Z"
          fill="var(--primary)"
          opacity="0.14"
          animate={{ x: [0, -60, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Foreground — soft rolling ground */}
        <motion.path
          d="M0 172 C100 167, 200 170, 300 168 C400 166, 500 170, 600 167 C700 165, 750 169, 800 168 L800 180 L0 180 Z"
          fill="var(--primary)"
          opacity="0.2"
          animate={{ x: [0, -80, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
