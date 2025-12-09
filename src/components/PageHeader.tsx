import React from "react";

interface PageHeaderProps {
    title: React.ReactNode;
    subtitle?: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
    accentColor?: "primary" | "secondary" | "accent";
}

export default function PageHeader({
    title,
    subtitle,
    description,
    children,
    accentColor = "primary",
}: PageHeaderProps) {
    const accentGradient = {
        primary: "from-primary/50",
        secondary: "from-secondary/50",
        accent: "from-accent/50",
    }[accentColor];

    return (
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4 max-w-3xl">
                <div className="relative">
                    {subtitle && (
                        <span className={`text-xs font-mono font-bold tracking-wider uppercase opacity-60 mb-2 block text-${accentColor}`}>
                            {subtitle}
                        </span>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight relative z-10">
                        {title}
                    </h1>
                    {/* New "Attractive" Underline - Gradient Fade */}
                    <div className={`h-1.5 w-32 md:w-48 bg-linear-to-r ${accentGradient} to-transparent rounded-full mt-4`}></div>
                </div>

                {description && (
                    <div className="text-md md:text-lg text-base-content/70 leading-relaxed max-w-4xl">
                        {description}
                    </div>
                )}
            </div>

            {children && (
                <div className="flex flex-col items-end gap-2 shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
