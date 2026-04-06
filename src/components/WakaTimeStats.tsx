"use client";

import { useEffect, useState } from 'react';
import { getWakaTimeStats } from '../lib/wakatime';
import { SiWakatime } from 'react-icons/si';
import { motion } from 'framer-motion';

export default function WakaTimeStats() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        getWakaTimeStats().then((data) => {
            setStats(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="bg-card shadow-xl border border-border/50 rounded-2xl h-full animate-pulse">
                <div className="p-6">
                    <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
                    <div className="space-y-3">
                        <div className="h-4 bg-muted rounded w-full"></div>
                        <div className="h-4 bg-muted rounded w-5/6"></div>
                        <div className="h-4 bg-muted rounded w-4/6"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="bg-zinc-900/20 backdrop-blur-md border border-white/5 rounded-sm h-full hover:border-primary/20 transition-all duration-500 group/stats">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <SiWakatime className="text-primary text-xl group-hover:scale-110 transition-transform" />
                    <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-white/50 group-hover:text-primary transition-colors">Coding Activities</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1.5">Last 7 Days</span>
                        <span className="text-3xl font-mono font-black text-primary tabular-nums">{stats.formatted_total || stats.total_seconds}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-4">Top Tech</span>
                        <div className="space-y-5">
                            {stats.languages.slice(0, 4).map((lang: any) => (
                                <div key={lang.name} className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-mono tracking-tighter uppercase font-bold">
                                        <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{lang.name}</span>
                                        <span className="text-primary/70">{lang.percent}%</span>
                                    </div>
                                    <div className="w-full bg-white/5 h-1 rounded-none overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${lang.percent}%` }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="h-full bg-primary/40 group-hover:bg-primary transition-colors"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
