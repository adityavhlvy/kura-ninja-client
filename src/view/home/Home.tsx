"use client";

import Link from "next/link";
import { SlRocket, SlStar } from "react-icons/sl";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import ThreeDCard from "../../components/ThreeDCard";
import { projectsData } from "../../data/projects";
import SpotifyNowPlaying from "../../components/SpotifyNowPlaying";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import WakaTimeStats from "../../components/WakaTimeStats";
import IdeWindow from "../../components/IdeWindow";
import { Button } from "@/components/ui/button";

export default function Home() {
    // Get featured projects
    const featuredProjects = projectsData.filter(p => p.featured);

    return (
        <PageTransition>
            {/* Global Background Effects */}
            <BackgroundEffects />

            {/* Premium IDE Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen pt-24 pb-12 w-full overflow-hidden">
                <div className="z-10 w-full max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left side: Bio as "Code" */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="order-2 lg:order-1 lg:translate-x-12 z-20"
                    >
                        <IdeWindow fileName="aditya.config.json" className="min-h-[400px]">
                            <div className="p-6 font-mono text-sm leading-relaxed">
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">01</span>
                                    <span className="text-[#f92672]">{`{`}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">02</span>
                                    <span className="ml-4 text-primary">"name"</span>: <span className="text-secondary">"Aditya Vahlevy Nugraha"</span>,
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">03</span>
                                    <span className="ml-4 text-primary">"role"</span>: <span className="text-secondary">"Fullstack Developer"</span>,
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">04</span>
                                    <span className="ml-4 text-primary">"specialization"</span>: <span className="text-secondary">"Software Engineering"</span>,
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">05</span>
                                    <span className="ml-4 text-primary">"traits"</span>: <span className="text-[#a6e22e]">[</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">06</span>
                                    <span className="ml-8 text-secondary">"Curious"</span>, <span className="text-secondary">"Lazy (Efficient)"</span>, <span className="text-secondary">"Sleepy"</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">07</span>
                                    <span className="ml-4 text-[#a6e22e]">]</span>,
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">08</span>
                                    <span className="ml-4 text-primary">"status"</span>: <span className="text-warning">"Building things that (mostly) work"</span>,
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">09</span>
                                    <span className="ml-4 text-primary">"current_quest"</span>: <span className="text-success">"Teaching machines to see rice fields"</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="opacity-20 select-none">10</span>
                                    <span className="text-[#f92672]">{`}`}</span>
                                </div>

                                {/* CTA Buttons within IDE */}
                                <div className="mt-8 flex flex-wrap gap-4">
                                    <Link href="/projects" className="px-6 py-2 bg-primary/10 border border-primary/30 rounded-md text-primary hover:bg-primary hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                                        Execute Projects.exe
                                    </Link>
                                    <Link href="/about" className="px-6 py-2 border border-ide-border rounded-md text-ide-comment hover:border-secondary/40 hover:text-secondary transition-all text-xs font-bold uppercase tracking-widest">
                                        Read_Bio.md
                                    </Link>
                                </div>
                            </div>
                        </IdeWindow>
                    </motion.div>

                    {/* Right side: Visual */}
                    <motion.div
                        initial={{ scale: 0.98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="order-1 lg:order-2 flex justify-center lg:justify-end lg:-translate-x-12"
                    >
                        <div className="relative group">
                            {/* Intentional Glow Offset */}
                            <div className="absolute -inset-8 bg-primary/10 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-1000" />
                            <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-pulse" />

                            <IdeWindow fileName="aditya.png" className="w-64 md:w-72 lg:w-80 shadow-2xl border-primary/20 backdrop-blur-3xl">
                                <div className="aspect-[4/5] bg-ide-bg overflow-hidden relative">
                                    <img
                                        src="/assets/profile.png"
                                        alt="Aditya"
                                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ide-bg via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-4 left-4 bg-primary text-black px-3 py-1 rounded-sm text-[10px] font-mono font-bold">
                                        <span className="opacity-70">Lv. 99</span> KURA NINJA
                                    </div>
                                </div>
                            </IdeWindow>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Music & Stats Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-7xl px-6 lg:px-8 mt-8 mb-20 mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">
                    {/* Left: Music */}
                    <div className="lg:col-span-6 xl:col-span-4 w-full flex flex-col gap-4 h-full">
                        <SpotlightCard title="Vibe Check" className="h-full border-primary/10">
                            <SpotifyNowPlaying />
                        </SpotlightCard>
                    </div>

                    {/* Center: WakaTime Stats */}
                    <div className="lg:col-span-6 xl:col-span-4 w-full h-full">
                        <WakaTimeStats />
                    </div>

                    {/* Right: Quick Highlights */}
                    <div className="lg:col-span-12 xl:col-span-4 w-full h-full">
                        <SpotlightCard title="At a Glance" className="h-full border-primary/10">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-zinc-900/40 rounded-sm border border-white/5 hover:border-primary/40 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-primary mb-1 group-hover:scale-105 origin-center transition-transform">
                                        {projectsData.length}+
                                    </div>
                                    <div className="text-[10px] uppercase tracking-tighter font-bold text-muted-foreground">Quests Done</div>
                                </div>
                                <div className="p-4 bg-zinc-900/40 rounded-sm border border-white/5 hover:border-primary/40 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-primary mb-1 group-hover:scale-105 origin-center transition-transform font-mono">NaN</div>
                                    <div className="text-[10px] uppercase tracking-tighter font-bold text-muted-foreground">Sleep Hours</div>
                                </div>
                                <div className="p-4 bg-zinc-900/40 rounded-sm border border-white/5 hover:border-primary/40 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-primary mb-1 group-hover:scale-105 origin-center transition-transform">20+</div>
                                    <div className="text-[10px] uppercase tracking-tighter font-bold text-muted-foreground">Badges</div>
                                </div>
                                <div className="p-4 bg-zinc-900/40 rounded-sm border border-white/5 flex items-center justify-center text-center">
                                    <span className="text-[10px] font-mono text-muted-foreground/50 uppercase">CTRL+K</span>
                                </div>
                            </div>
                        </SpotlightCard>
                    </div>
                </div>
            </motion.div>

            {/* Featured Projects */}
            <section className="container mx-auto max-w-6xl p-6 lg:p-8 mb-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-4xl md:text-5xl font-black flex items-center gap-4"
                        >
                            <SlStar className="text-primary animate-spin-slow" />
                            Featured Projects
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-muted-foreground mt-4 text-xl max-w-lg leading-relaxed"
                        >
                            Handcrafted with humility and mild confusion.
                        </motion.p>
                    </div>
                    <Button variant="ghost" asChild className="gap-2 group hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20">
                        <Link href="/projects">
                            View All <SlRocket size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="h-full"
                        >
                            <ThreeDCard className="h-full">
                                <ProjectCard {...project} />
                            </ThreeDCard>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
