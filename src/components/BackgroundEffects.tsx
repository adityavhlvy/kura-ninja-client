export default function BackgroundEffects() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Ambient Glow (Single Source, not a symmetric orb) */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />

            {/* Structured Dot Grid */}
            <div 
                className="absolute inset-0 bg-[radial-gradient(#e5e7eb05_1px,transparent_1px)] [background-size:32px_32px]"
                style={{ 
                    maskImage: 'radial-gradient(ellipse at center, black, transparent 80%)',
                    WebkitMaskImage: 'radial-gradient(ellipse at center, black, transparent 80%)'
                }}
            ></div>
            
            {/* Sub-grid lines (Very subtle) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:128px_128px]"></div>
        </div>
    );
}
