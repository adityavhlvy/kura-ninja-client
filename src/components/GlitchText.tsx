import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string; // For passing text size/weight/gradient
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
    // We expect className to contain the gradient login: "text-transparent bg-clip-text bg-gradient..."
    return (
        <div className="relative inline-block group">
            {/* Main Text */}
            <span className={`relative z-10 ${className} cyber-flicker`}>
                {text}
            </span>

            {/* Glitch Layer 1 (Cyan/Red or offset) */}
            <span 
                className={`absolute top-0 left-0 -z-10 w-full h-full cyber-glitch-1 ${className} opacity-50`} 
                aria-hidden="true"
            >
                {text}
            </span>

            {/* Glitch Layer 2 */}
            <span 
                className={`absolute top-0 left-0 -z-20 w-full h-full cyber-glitch-2 ${className} opacity-50`} 
                aria-hidden="true"
            >
                {text}
            </span>
            
            {/* Optional: Random noise or scanline overlay could technically go here but CSS is cleaner */}
        </div>
    );
};

export default GlitchText;
