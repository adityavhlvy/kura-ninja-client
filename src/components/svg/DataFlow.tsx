import { motion } from "framer-motion";

/**
 * Data flow visualization — visible paths with glowing dots traveling along them.
 * More "data-like" with dashed lines and brighter particles.
 */
export default function DataFlow({ className = "" }: { className?: string }) {
  const paths = [
    "M0 25 C80 10, 160 40, 240 20 C320 0, 400 35, 480 15 C560 -5, 640 30, 720 20",
    "M0 55 C60 70, 140 40, 240 60 C340 80, 420 45, 520 65 C600 85, 660 50, 720 60",
    "M0 90 C100 80, 180 100, 280 85 C380 70, 440 95, 540 80 C620 65, 680 90, 720 85",
    "M0 115 C80 125, 180 105, 280 120 C360 135, 440 110, 540 125 C620 140, 680 115, 720 120",
  ];

  const durations = [3.2, 4.0, 3.6, 4.4];
  const delays = [0, 0.8, 0.4, 1.2];

  return (
    <div className={className}>
      <svg
        viewBox="0 0 720 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Visible dashed path lines */}
        {paths.map((d, i) => (
          <motion.path
            key={`line-${i}`}
            d={d}
            stroke="var(--primary)"
            strokeWidth="1"
            strokeDasharray="4 6"
            fill="none"
            opacity="0.15"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}

        {/* Node dots at intersections */}
        {[60, 180, 300, 420, 540, 660].map((x, i) => (
          <motion.circle
            key={`node-${i}`}
            cx={x}
            cy={paths.length > 0 ? 25 + (i % 4) * 30 : 50}
            r="2"
            fill="var(--primary)"
            opacity="0.2"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Traveling data packets — glowing dots */}
        {paths.map((path, i) => (
          <g key={`flow-${i}`}>
            {/* Main packet */}
            <motion.circle
              r="3"
              fill="var(--primary)"
              style={{ offsetPath: `path("${path}")` }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: durations[i],
                delay: delays[i],
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Glow */}
            <motion.circle
              r="6"
              fill="var(--primary)"
              opacity="0.15"
              style={{ offsetPath: `path("${path}")` }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: durations[i],
                delay: delays[i],
                repeat: Infinity,
                ease: "linear",
              }}
            />
            {/* Trail packet */}
            <motion.circle
              r="2"
              fill="var(--primary)"
              opacity="0.3"
              style={{ offsetPath: `path("${path}")` }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{
                duration: durations[i],
                delay: delays[i] + 0.4,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
