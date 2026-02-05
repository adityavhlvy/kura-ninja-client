import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTime } from '../context/TimeContext';
import { projectsData } from '../view/projects/Projects';

// Calculate "stats" based on real data
function useCharacterStats() {
    const { hour } = useTime();

    // Coffee level based on time of day
    const coffeeLevel =
        hour >= 6 && hour < 10 ? 95 :  // Morning coffee
            hour >= 10 && hour < 14 ? 70 : // Post-morning
                hour >= 14 && hour < 17 ? 45 : // Afternoon slump
                    hour >= 17 && hour < 21 ? 30 : // Evening
                        hour >= 21 || hour < 2 ? 60 :  // Night owl fuel
                            20;                             // Dead zone

    // Sleep debt based on time
    const sleepLevel =
        hour >= 6 && hour < 12 ? 80 :   // Morning fresh
            hour >= 12 && hour < 18 ? 60 :  // Afternoon
                hour >= 18 && hour < 23 ? 40 :  // Evening tired
                    hour >= 23 || hour < 3 ? 15 :   // Should be sleeping
                        10;                              // Why are you awake

    // XP from projects (using 'status' field)
    const completedProjects = projectsData.filter(p => p.status === 'completed' || p.status === 'active').length;
    const totalProjects = projectsData.length;
    const xpLevel = Math.floor((completedProjects / totalProjects) * 100);

    // Current quests (plural)
    const activeQuests = projectsData.filter(p => p.status === 'in-progress');
    const currentQuests = activeQuests.length > 0
        ? activeQuests.map(p => p.title)
        : [projectsData[0]?.title || 'No Active Quest'];

    return {
        coffeeLevel,
        sleepLevel,
        xpLevel,
        totalProjects,
        currentQuests,
    };
}

interface StatBarProps {
    label: string;
    value: number;
    color: string;
    icon: string;
}

function StatBar({ label, value, color, icon }: StatBarProps) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">{icon}</span>
            <div className="flex flex-col gap-0.5">
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">{label}</span>
                    <span className="text-[10px] font-mono opacity-40">{value}%</span>
                </div>
                <div className="w-20 h-1.5 bg-base-content/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${value}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full rounded-full ${color}`}
                    />
                </div>
            </div>
        </div>
    );
}

interface QuestDisplayProps {
    quests: string[];
}

function QuestDisplay({ quests }: QuestDisplayProps) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (quests.length <= 1) return;
        const interval = setInterval(() => {
            setIndex(prev => (prev + 1) % quests.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [quests.length]);

    return (
        <div className="h-4 relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 text-xs font-medium truncate text-primary"
                >
                    {quests[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function StatusBar() {
    const stats = useCharacterStats();
    const { theme } = useTime();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
        >
            <div className="bg-base-200/60 backdrop-blur-md border border-base-content/10 rounded-xl p-4 shadow-lg">
                {/* Header */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-base-content/5">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">🐢</span>
                        <div>
                            <div className="font-bold text-sm text-base-content">Kura Ninja</div>
                            <div className="text-[10px] font-mono text-base-content/50">LVL 23 • Fullstack Dev</div>
                        </div>
                    </div>
                    <div className={`badge badge-sm ${theme.primaryColor} bg-base-300 border-0`}>
                        {theme.emoji} {theme.label}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <StatBar
                        label="Coffee"
                        value={stats.coffeeLevel}
                        color="bg-amber-500"
                        icon="☕"
                    />
                    <StatBar
                        label="Sleep"
                        value={stats.sleepLevel}
                        color="bg-indigo-500"
                        icon="💤"
                    />
                </div>

                {/* Current Quest */}
                <div className="mt-3 pt-2 border-t border-base-content/5">
                    <div className="flex items-center gap-2">
                        <span className="text-xs">⚔️</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-0.5">
                                <div className="text-[10px] font-mono uppercase tracking-wider opacity-40">Current Quest</div>
                                {stats.currentQuests.length > 1 && (
                                    <span className="text-[9px] opacity-30 font-mono">{stats.currentQuests.length} ACTIVE</span>
                                )}
                            </div>
                            <QuestDisplay quests={stats.currentQuests} />
                        </div>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="mt-2">
                    <div className="flex items-center justify-between text-[10px] font-mono opacity-40 mb-1">
                        <span>PROJECTS COMPLETED</span>
                        <span>{stats.xpLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-base-content/10 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.xpLevel}%` }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                            className="h-full bg-linear-to-r from-primary to-secondary rounded-full"
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
