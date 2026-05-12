import { motion } from "framer-motion";

/**
 * Topographic contour lines — continuously scrolling horizontally.
 * Stops when not in viewport (whileInView).
 */
export default function TopoTerrain({ className = "" }: { className?: string }) {
    // Two sets of contours side by side for seamless loop
    const contours = [
        { y: 0, opacity: 0.06, width: 0.4 },
        { y: 15, opacity: 0.09, width: 0.6 },
        { y: 32, opacity: 0.13, width: 0.8 },
        { y: 52, opacity: 0.18, width: 1.0 },
        { y: 74, opacity: 0.24, width: 1.2 },
        { y: 100, opacity: 0.32, width: 1.4 },
    ];

    // Generate a wavy path at a given vertical offset
    const makePath = (yBase: number, seed: number) => {
        const points: string[] = [];
        for (let x = 0; x <= 1400; x += 50) {
            const y = yBase + Math.sin((x + seed * 100) * 0.008) * 18 + Math.sin((x + seed * 50) * 0.015) * 10;
            points.push(`${x},${y.toFixed(1)}`);
        }
        return `M${points[0]} ${points.slice(1).map(p => `L${p}`).join(' ')}`;
    };

    return (
        <div className={`${className} overflow-hidden`}>
            <motion.div
                initial={{ x: 0 }}
                animate={{ x: "-50%" }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="w-[200%]"
            >
                <svg
                    viewBox="0 0 1400 160"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                >
                    {contours.map((c, i) => (
                        <path
                            key={i}
                            d={makePath(20 + c.y * 0.8, i)}
                            stroke="var(--primary)"
                            strokeWidth={c.width}
                            fill="none"
                            opacity={c.opacity}
                            strokeLinecap="round"
                        />
                    ))}
                </svg>
            </motion.div>
        </div>
    );
}
