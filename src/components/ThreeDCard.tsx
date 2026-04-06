"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDCardProps {
    children: React.ReactNode;
    className?: string;
}

export default function ThreeDCard({ children, className = "" }: ThreeDCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for rotation
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
        stiffness: 150,
        damping: 20,
    });

    // Glare/Shine effect position
    const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), {
        stiffness: 150,
        damping: 20,
    });
    const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), {
        stiffness: 150,
        damping: 20,
    });
    const glareOpacity = useSpring(0, { stiffness: 200, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate normalized position (-0.5 to 0.5)
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
        glareOpacity.set(1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        glareOpacity.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
            }}
            className={`relative inline-block ${className}`}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-full h-full transition-shadow duration-200"
            >
                {/* Content */}
                <div style={{ transform: "translateZ(50px)" }} className="relative z-10 w-full h-full">
                    {children}
                </div>

                {/* Glare Effect */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.4) 0%, transparent 80%)`,
                        opacity: glareOpacity,
                        rotateX, // Match card rotation
                        rotateY, // Match card rotation
                        zIndex: 20,
                    }}
                    className="absolute inset-0 w-full h-full pointer-events-none rounded-xl mix-blend-overlay"
                />
            </motion.div>
        </motion.div>
    );
}
