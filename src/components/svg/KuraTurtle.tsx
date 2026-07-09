import { motion } from "framer-motion";

/**
 * Walking ninja turtle — visible walk cycle with body bounce.
 */
export default function KuraTurtle({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 80 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Whole body bounces up/down while walking */}
      <motion.g
        animate={{ y: [0, -2, 0, -2, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Shadow on ground */}
        <motion.ellipse
          cx="38"
          cy="48"
          fill="var(--foreground)"
          opacity="0.08"
          animate={{ rx: [16, 14, 16, 14, 16], ry: [3, 2.5, 3, 2.5, 3] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Back legs */}
        <motion.rect
          x="18"
          y="36"
          width="6"
          height="12"
          rx="3"
          fill="var(--foreground)"
          opacity="0.6"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "21px 36px" }}
        />
        <motion.rect
          x="26"
          y="36"
          width="6"
          height="12"
          rx="3"
          fill="var(--foreground)"
          opacity="0.5"
          animate={{ rotate: [20, -20, 20] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "29px 36px" }}
        />

        {/* Front legs */}
        <motion.rect
          x="44"
          y="36"
          width="6"
          height="12"
          rx="3"
          fill="var(--foreground)"
          opacity="0.6"
          animate={{ rotate: [20, -20, 20] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "47px 36px" }}
        />
        <motion.rect
          x="52"
          y="36"
          width="6"
          height="12"
          rx="3"
          fill="var(--foreground)"
          opacity="0.5"
          animate={{ rotate: [-20, 20, -20] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "55px 36px" }}
        />

        {/* Body */}
        <ellipse
          cx="38"
          cy="34"
          rx="18"
          ry="8"
          fill="var(--foreground)"
          opacity="0.7"
        />

        {/* Shell */}
        <motion.g
          animate={{ rotate: [-1, 1, -1] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "38px 28px" }}
        >
          <path
            d="M18 34 C18 18, 28 8, 38 6 C48 8, 58 18, 58 34 Z"
            fill="var(--primary)"
          />
          {/* Shell hex pattern */}
          <path
            d="M32 13 L38 10 L44 13 L44 19 L38 22 L32 19 Z"
            stroke="var(--background)"
            strokeWidth="0.8"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M23 22 L29 19 L35 22 L35 28 L29 31 L23 28 Z"
            stroke="var(--background)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.2"
          />
          <path
            d="M41 22 L47 19 L53 22 L53 28 L47 31 L41 28 Z"
            stroke="var(--background)"
            strokeWidth="0.6"
            fill="none"
            opacity="0.2"
          />
        </motion.g>

        {/* Head */}
        <motion.g
          animate={{ x: [0, 1.5, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse
            cx="62"
            cy="30"
            rx="8"
            ry="6.5"
            fill="var(--foreground)"
            opacity="0.75"
          />
          {/* Eye */}
          <circle cx="66" cy="28" r="2.5" fill="var(--background)" />
          <circle cx="67" cy="27.5" r="1.2" fill="var(--primary)" />
        </motion.g>

        {/* Headband */}
        <path
          d="M55 27 Q62 24, 70 27"
          stroke="#d03030"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Headband tails — dramatic wave */}
        <motion.path
          stroke="#d03030"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: [
              "M55 27 Q48 25, 43 28 Q39 31, 34 29",
              "M55 27 Q48 22, 42 23 Q38 26, 33 24",
              "M55 27 Q48 25, 43 28 Q39 31, 34 29",
            ],
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          stroke="#d03030"
          strokeWidth="1.3"
          fill="none"
          strokeLinecap="round"
          opacity={0.5}
          animate={{
            d: [
              "M55 28 Q47 28, 42 31 Q38 34, 32 32",
              "M55 28 Q47 25, 41 26 Q37 29, 31 27",
              "M55 28 Q47 28, 42 31 Q38 34, 32 32",
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15,
          }}
        />

        {/* Tail */}
        <motion.path
          stroke="var(--foreground)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity={0.4}
          animate={{
            d: [
              "M18 32 Q13 34, 10 31",
              "M18 32 Q13 30, 9 28",
              "M18 32 Q13 34, 10 31",
            ],
          }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}
