import { motion } from 'framer-motion';
import { SlStar, SlBadge, SlClock, SlArrowRight } from 'react-icons/sl';

// Project type from the main Projects data
interface QuestProject {
    title: string;
    description: string;
    tech: string[];
    isActive?: boolean;
    featured?: boolean;
    image?: string;
    demoUrl?: string;
    repoUrl?: string;
}

interface QuestCardProps {
    project: QuestProject;
    index: number;
    category: 'main' | 'side' | 'archived';
}

function getStarRating(tech: string[]): number {
    // More tech = more complexity = more stars
    const complexity = tech.length;
    if (complexity >= 5) return 5;
    if (complexity >= 4) return 4;
    if (complexity >= 3) return 3;
    if (complexity >= 2) return 2;
    return 1;
}

function getStatusBadge(isActive?: boolean) {
    if (isActive) {
        return { text: 'IN PROGRESS', color: 'badge-warning', icon: <SlClock className="w-3 h-3" /> };
    }
    return { text: 'COMPLETED', color: 'badge-success', icon: <SlBadge className="w-3 h-3" /> };
}

export default function QuestCard({ project, index, category }: QuestCardProps) {
    const starRating = getStarRating(project.tech);
    const status = getStatusBadge(project.isActive);
    const isMainQuest = category === 'main';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className="group"
        >
            <div className={`
        relative p-4 rounded-xl border
        bg-base-200/50 backdrop-blur-sm
        border-base-content/10 hover:border-primary/30
        transition-all duration-300
        hover:shadow-lg hover:shadow-primary/5
        ${isMainQuest ? 'hover:scale-[1.02]' : ''}
      `}>
                {/* Quest identifier */}
                <div className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-base-300 border border-base-content/10 flex items-center justify-center text-xs font-bold text-base-content/50">
                    {isMainQuest ? '⚔️' : '📋'}
                </div>

                {/* Star Rating */}
                <div className="absolute -top-2 right-2 flex items-center gap-0.5 bg-base-300 px-2 py-0.5 rounded-full border border-base-content/10">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <SlStar
                            key={i}
                            className={`w-3 h-3 ${i < starRating ? 'text-amber-400' : 'text-base-content/20'}`}
                        />
                    ))}
                </div>

                {/* Content */}
                <div className="mt-4">
                    <h3 className="font-bold text-base-content group-hover:text-primary transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-sm text-base-content/60 mt-1 line-clamp-2">
                        {project.description}
                    </p>

                    {/* Status & Tech */}
                    <div className="mt-3 flex items-center justify-between">
                        <div className={`badge ${status.color} badge-sm gap-1`}>
                            {status.icon}
                            {status.text}
                        </div>

                        <div className="flex items-center gap-1">
                            {project.tech.slice(0, 3).map((t, i) => (
                                <span key={i} className="badge badge-ghost badge-xs">{t}</span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="text-xs text-base-content/40">+{project.tech.length - 3}</span>
                            )}
                        </div>
                    </div>

                    {/* Rewards (skills unlocked) */}
                    {isMainQuest && (
                        <div className="mt-3 pt-3 border-t border-base-content/5">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-base-content/40 mb-1">
                                Skills Unlocked
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {project.tech.map((t, i) => (
                                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                                        +{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* View arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <SlArrowRight className="text-primary" />
                </div>
            </div>
        </motion.div>
    );
}

// Quest Log Header Component
export function QuestLogHeader({
    activeTab,
    onTabChange,
    counts
}: {
    activeTab: 'main' | 'side' | 'all';
    onTabChange: (tab: 'main' | 'side' | 'all') => void;
    counts: { main: number; side: number; all: number };
}) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                    <span className="text-2xl">📜</span>
                    Quest Log
                </h1>
                <p className="text-base-content/60 mt-1">
                    Adventures completed and in progress
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onTabChange('all')}
                    className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-ghost'}`}
                >
                    All ({counts.all})
                </button>
                <button
                    onClick={() => onTabChange('main')}
                    className={`btn btn-sm ${activeTab === 'main' ? 'btn-primary' : 'btn-ghost'}`}
                >
                    ⚔️ Main ({counts.main})
                </button>
                <button
                    onClick={() => onTabChange('side')}
                    className={`btn btn-sm ${activeTab === 'side' ? 'btn-primary' : 'btn-ghost'}`}
                >
                    📋 Side ({counts.side})
                </button>
            </div>
        </div>
    );
}
