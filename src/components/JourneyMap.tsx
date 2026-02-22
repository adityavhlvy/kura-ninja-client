"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface JourneyNode {
    id: string;
    label: string;
    type: 'education' | 'work' | 'org' | 'achievement';
    year: string;
    x: number; // Percentage 0-100
    y: number; // Percentage 0-100
    details: {
        role: string;
        description: string;
        skills: string[];
        date: string;
    };
}

// Complete Data Graph Configuration
const nodes: JourneyNode[] = [
    // 2018-2021
    {
        id: 'sma',
        label: 'SMA Plus Riau',
        type: 'education',
        year: '2018',
        x: 5, y: 80,
        details: {
            role: 'Science Major',
            date: '2018 - 2021',
            description: 'High School Diploma with focus on Science and Technology.',
            skills: ['Physics', 'Math', 'Basic Programming']
        }
    },
    {
        id: 'hm_it_hs',
        label: 'Head of IT (OSIS)',
        type: 'org',
        year: '2019',
        x: 10, y: 65,
        details: {
            role: 'Head of IT Dept',
            date: '2019 - 2020',
            description: 'Managed and created numerous digital projects and visuals for the student council.',
            skills: ['Leadership', 'Design', 'Management']
        }
    },

    // 2021-2023
    {
        id: 'uni',
        label: 'Univ. Pertamina',
        type: 'education',
        year: '2021',
        x: 25, y: 50,
        details: {
            role: 'Computer Science',
            date: '2021 - 2025',
            description: 'Bachelor Degree (Cum Laude, GPA 3.58). Focused on AI/ML and Full-stack.',
            skills: ['CS Fundamentals', 'Data Science', 'Web Dev']
        }
    },
    {
        id: 'hm_creative',
        label: 'Head Creative',
        type: 'org',
        year: '2023',
        x: 35, y: 30,
        details: {
            role: 'Head of Media Creative',
            date: 'Feb - Nov 2023',
            description: 'Directed a 5-person creative team in designing all visual communications.',
            skills: ['Leadership', 'Creative Direction', 'Team Management']
        }
    },
    {
        id: 'asst_algo',
        label: 'Algo Assistant',
        type: 'work',
        year: '2023',
        x: 40, y: 70,
        details: {
            role: 'Lab Assistant',
            date: 'Oct 23 - Mar 24',
            description: 'Led practicum sessions for 40 students on core algorithms and data structures.',
            skills: ['Teaching', 'Algorithms', 'Data Structures']
        }
    },

    // 2024
    {
        id: 'samsung',
        label: 'Samsung Campus',
        type: 'achievement',
        year: '2024',
        x: 50, y: 20,
        details: {
            role: 'Innovation Program',
            date: 'Jan - Jul 2024',
            description: 'Samsung Innovation Campus Batch 5 (Machine Learning & IoT).',
            skills: ['IoT', 'Machine Learning', 'Python']
        }
    },
    {
        id: 'hm_vp',
        label: 'VP HM CS',
        type: 'org',
        year: '2024',
        x: 55, y: 40,
        details: {
            role: 'Vice President',
            date: 'Jan - Dec 2024',
            description: 'Co-led 100+ member student association. Supervised 10+ events.',
            skills: ['Strategic Planning', 'Leadership', 'Event Management']
        }
    },
    {
        id: 'astra',
        label: 'Astra Otoparts',
        type: 'work',
        year: '2024',
        x: 65, y: 65,
        details: {
            role: 'IT Intern',
            date: 'Sep - Dec 2024',
            description: 'Developed 3 full-stack operational dashboards for PPC division (.NET/Oracle).',
            skills: ['C#', '.NET', 'Oracle', 'Dashboarding']
        }
    },

    // 2025
    {
        id: 'ml_asst',
        label: 'ML Assistant',
        type: 'work',
        year: '2025',
        x: 75, y: 30,
        details: {
            role: 'ML Lab Assistant',
            date: 'Feb - Jul 2025',
            description: 'Developed ML workshop curriculum and mentored 40 participants.',
            skills: ['Machine Learning', 'Curriculum Dev', 'Mentoring']
        }
    },
    {
        id: 'research',
        label: 'Research Asst',
        type: 'work',
        year: '2025',
        x: 85, y: 50,
        details: {
            role: 'Research Assistant',
            date: 'Jul - Oct 2025',
            description: 'Engineered rice yield predictive model using Satellite Imagery (Sentinel-2).',
            skills: ['Google Earth Engine', 'Deep Learning', 'Research']
        }
    },
    {
        id: 'pupuk',
        label: 'Pupuk Indonesia',
        type: 'work',
        year: '2025',
        x: 95, y: 75,
        details: {
            role: 'Fullstack Developer',
            date: 'Oct 2025 - Present',
            description: 'Building agricultural tech: Land Delineation & Geomap Dashboard.',
            skills: ['Go', 'React', 'FastAPI', 'Geospatial', 'PyTorch']
        }
    }
];

// Connections (Source ID -> Target ID)
const links = [
    ['sma', 'hm_it_hs'],
    ['sma', 'uni'],
    ['uni', 'hm_creative'],
    ['uni', 'asst_algo'],
    ['asst_algo', 'samsung'],
    ['uni', 'hm_vp'],
    ['uni', 'astra'],
    ['hm_vp', 'ml_asst'],
    ['astra', 'research'], // Sequential flow roughly by time
    ['ml_asst', 'research'],
    ['research', 'pupuk']
];

const typeColors = {
    education: 'text-primary border-primary shadow-primary/50',
    work: 'text-secondary border-secondary shadow-secondary/50',
    org: 'text-accent border-accent shadow-accent/50',
    achievement: 'text-warning border-warning shadow-warning/50'
};

const typeBg = {
    education: 'bg-primary',
    work: 'bg-secondary',
    org: 'bg-accent',
    achievement: 'bg-warning'
};

export default function JourneyMap() {
    const [selectedId, setSelectedId] = useState<string>('pupuk');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedNode = nodes.find(n => n.id === selectedId);

    return (
        <div className="w-full select-none" ref={containerRef}>
            <div className="text-center mb-6 opacity-60 text-xs tracking-widest uppercase animate-pulse">
                Click nodes to decrypt data
            </div>

            {/* Graph Container */}
            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-base-300/30 rounded-3xl border border-white/5 overflow-hidden group">

                {/* Grid Background */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {links.map(([sourceId, targetId], i) => {
                        const source = nodes.find(n => n.id === sourceId);
                        const target = nodes.find(n => n.id === targetId);
                        if (!source || !target) return null;

                        return (
                            <motion.line
                                key={`${sourceId}-${targetId}`}
                                x1={`${source.x}%`}
                                y1={`${source.y}%`}
                                x2={`${target.x}%`}
                                y2={`${target.y}%`}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                className="text-base-content/10"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                            />
                        );
                    })}
                </svg>

                {/* Nodes Layer */}
                {nodes.map((node) => {
                    const isSelected = selectedId === node.id;
                    return (
                        <motion.div
                            key={node.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                            style={{ left: `${node.x}%`, top: `${node.y}%` }}
                            onClick={() => setSelectedId(node.id)}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            whileHover={{ scale: 1.2 }}
                        >
                            {/* Node Circle */}
                            <div className={`
                 w-3 h-3 md:w-5 md:h-5 rounded-full border-2 
                 transition-all duration-300
                 ${isSelected
                                    ? `${typeColors[node.type]} bg-base-100 scale-150 shadow-[0_0_20px_currentColor]`
                                    : 'border-base-content/20 bg-base-300 hover:border-base-content/50'}
              `}>
                                <div className={`w-full h-full rounded-full opacity-50 ${isSelected ? typeBg[node.type] : ''}`} />
                            </div>

                            {/* Label - Only show on hover or selected */}
                            <motion.div
                                className={`
                  absolute top-full left-1/2 -translate-x-1/2 mt-2 
                  whitespace-nowrap text-[9px] md:text-[10px] font-bold tracking-wide
                  px-2 py-1 rounded bg-base-100/90 backdrop-blur-md border border-white/5
                  transition-all duration-300
                  ${isSelected ? 'opacity-100 translate-y-0 text-primary' : 'opacity-0 -translate-y-2 group-hover/node:opacity-100'}
                `}
                            >
                                {node.label}
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Detail Panel */}
            <AnimatePresence mode="wait">
                {selectedNode && (
                    <motion.div
                        key={selectedNode.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="mt-6 bg-base-200/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className={`absolute -right-20 -top-20 w-64 h-64 ${typeBg[selectedNode.type]} opacity-5 blur-3xl rounded-full pointer-events-none`} />

                        <div className="flex flex-col md:flex-row gap-6 relative z-10">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`badge badge-sm ${typeBg[selectedNode.type]} bg-opacity-20 border-0 text-current`}>
                                        {selectedNode.type.toUpperCase()}
                                    </span>
                                    <span className="text-xs font-mono opacity-50">{selectedNode.details.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold mb-1">{selectedNode.label}</h3>
                                <div className="text-lg text-primary mb-4">{selectedNode.details.role}</div>

                                <p className="opacity-80 leading-relaxed max-w-2xl mb-6">
                                    {selectedNode.details.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {selectedNode.details.skills.map((skill) => (
                                        <span key={skill} className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 font-mono">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
