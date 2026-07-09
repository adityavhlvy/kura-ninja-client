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
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4 max-w-3xl">
                <div className="relative">
                    {subtitle && (
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`h-[1px] w-6 bg-${accentColor}/30`} />
                            <span className={`text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-${accentColor}/60`}>
                                {subtitle}
                            </span>
                        </div>
                    )}
                    <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] relative z-10">
                        {title}
                    </h1>
                </div>

                {description && (
                    <div className="text-md md:text-lg text-muted-foreground leading-relaxed max-w-4xl">
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
