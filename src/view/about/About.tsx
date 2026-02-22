"use client";

import SEO from "../../components/SEO";
import { SlLayers, SlUser, SlRocket } from "react-icons/sl";
import {
    SiPython, SiGo, SiJavascript, SiTypescript,
    SiNextdotjs, SiVuedotjs, SiTailwindcss,
    SiNodedotjs, SiLaravel,
    SiPostgresql, SiDocker, SiFigma, SiGit
} from "react-icons/si";

import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import JourneyMap from "../../components/JourneyMap";
import type { ReactNode } from "react";


interface SkillCategory {
    category: string;
    items: { name: string; icon: ReactNode; color?: string }[];
}

const skillsData: SkillCategory[] = [
    {
        category: "Languages",
        items: [
            { name: "Python", icon: <SiPython /> },
            { name: "Go", icon: <SiGo /> },
            { name: "JavaScript", icon: <SiJavascript /> },
            { name: "TypeScript", icon: <SiTypescript /> }
        ]
    },
    {
        category: "Frontend",
        items: [
            { name: "Next.js", icon: <SiNextdotjs /> },
            { name: "Vue.js", icon: <SiVuedotjs /> },
            { name: "Tailwind", icon: <SiTailwindcss /> }
        ]
    },
    {
        category: "Backend",
        items: [
            { name: "Go Fiber", icon: <SiGo /> },
            { name: "Laravel", icon: <SiLaravel /> },
            { name: "Node.js", icon: <SiNodedotjs /> }
        ]
    },
    {
        category: "Data",
        items: [
            { name: "PostgreSQL", icon: <SiPostgresql /> },
            { name: "PostGIS", icon: <SiPostgresql /> }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Docker", icon: <SiDocker /> },
            { name: "Figma", icon: <SiFigma /> },
            { name: "Git", icon: <SiGit /> },
            { name: "Antigravity", icon: <SlRocket /> }
        ]
    }
];

export default function About() {
    return (
        <PageTransition className="container mx-auto max-w-5xl p-4 space-y-20 relative">
            <SEO
                title="About Aditya Vahlevy Nugraha | Software Engineer & Data Scientist"
                description="Learn more about Aditya Vahlevy Nugraha (Kura Ninja). A Fullstack Developer and Data Science enthusiast with experience in Machine Learning, Web Development, and Project Management."
                keywords="Aditya Vahlevy Nugraha, Kura Ninja, About Me, Software Engineer, Data Scientist, Resume, Experience, Education"
                url="https://kuraninja.vercel.app/about"
            />

            {/* Global Background Effects */}
            <BackgroundEffects />

            {/* Hero / About Me Section */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
            >
                <PageHeader
                    title="Who am I?"
                    description={
                        <div className="space-y-4">
                            <p>
                                Hey there! I'm <span className="font-bold text-primary">Aditya</span>.
                                Computer Science grad from Universitas Pertamina (yes, with Cum Laude, but who's counting?) and currently a <span className="font-bold text-primary">Fullstack Developer at PT Pupuk Indonesia (Persero)</span>.
                            </p>
                            <p>
                                Stuck somewhere in the fog between <span className="font-semibold text-secondary">Data Science</span> and <span className="font-semibold text-accent">Fullstack Dev</span>.
                                Still trying to figure out which direction is forward. I code things, break things, fix things—repeat.
                            </p>
                            <p>
                                When I'm not coding, I'm probably listening to music that's too loud, reading novels, or thinking about my next side project at 2am.
                            </p>

                            <div className="alert bg-base-200/50 border-l-4 border-primary rounded-r-lg mt-6 text-sm not-italic flex items-center gap-4 hover:bg-base-200 transition-colors">
                                <SlUser className="text-2xl text-primary opacity-50 shrink-0" />
                                <div>
                                    <h3 className="font-serif italic text-primary mb-0">"Not all those who wander are lost—but I definitely should've documented that function."</h3>
                                    <div className="text-xs opacity-50">A reminder I probably should've taken earlier.</div>
                                </div>
                            </div>
                        </div>
                    }
                />
            </motion.section>

            {/* Interactive Journey Map */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mt-12"
            >
                <div className="flex items-center gap-3 mb-6">
                    <SlRocket className="text-2xl text-primary" />
                    <h2 className="text-2xl font-bold">The Journey So Far</h2>
                </div>
                <JourneyMap />
            </motion.section>

            {/* Skills Section (Moved Up) */}
            <section className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 mb-10"
                >
                    <SlLayers className="text-3xl text-primary" />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillsData.map((category, index) => (
                        <SpotlightCard
                            key={index}
                            title={category.category}
                            badge={`${category.items.length} items`}
                            delay={index * 0.1}
                            className="h-full"
                        >
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((item, idx) => (
                                    <div key={idx} className="badge badge-lg gap-2 pl-2 pr-3 py-4 h-auto bg-base-100/50 border-base-content/10">
                                        <span className="text-lg">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </SpotlightCard>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
