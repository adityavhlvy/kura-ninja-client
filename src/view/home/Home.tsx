import { Link } from "react-router-dom";
import { SlRocket, SlUser, SlStar, SlSocialLinkedin, SlSocialInstagram, SlEnvolope, SlSocialSpotify } from "react-icons/sl";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import ThreeDCard from "../../components/ThreeDCard";
import { projectsData } from "../projects/Projects";
import SEO from "../../components/SEO";
import SpotifyNowPlaying from "../../components/SpotifyNowPlaying";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import StatusBar from "../../components/StatusBar";

export default function Home() {
    // Get featured projects
    const featuredProjects = projectsData.filter(p => p.featured);

    // Stagger Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <PageTransition>
            <SEO
                title="Aditya Vahlevy Nugraha - Fullstack Developer"
                description="Aditya Vahlevy Nugraha is a Fullstack Developer, Software Engineer, and Data Science Enthusiast based in Indonesia. Explore his projects and learn more about his work."
                keywords="Aditya Vahlevy Nugraha, Fullstack Developer, Software Engineer, Data Science, Project Manager, Project Management, Beasiswa APERTI BUMN 2021, Jakarta, Dumai, Riau, Indonesia, SMAN PLUS Provinsi Riau, Golang, Go Fiber, Fiber, React, Next.js, Python, Portfolio"
            />

            {/* Global Background Effects */}
            <BackgroundEffects />

            {/* V6 Hero Section - Enhanced Motion */}
            <section className="relative flex flex-col items-center justify-center min-h-[90vh] lg:min-h-screen pt-20 pb-8 lg:pt-0 lg:pb-40 w-full overflow-hidden">

                {/* Content Container */}
                <div className="z-10 w-full max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 mx-auto">

                    {/* Visual/Image Column (Right on Desktop) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="order-1 lg:order-2 flex-1 flex justify-center lg:justify-end relative"
                    >
                        <div className="relative group perspective-1000">
                            {/* Decorative Corners */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-2xl group-hover:border-primary/60 transition-colors duration-500"></div>
                            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-secondary/30 rounded-br-2xl group-hover:border-secondary/60 transition-colors duration-500"></div>

                            {/* Cyber Frame */}
                            <ThreeDCard className="w-64 md:w-72 lg:w-96 xl:w-104 max-h-[50vh] lg:max-h-[60vh] aspect-4/5 cursor-pointer">
                                <div className="h-full w-full rounded-2xl overflow-hidden border border-base-content/10 bg-base-200/40 backdrop-blur-md shadow-2xl relative group-hover:shadow-[0_0_50px_-10px_rgba(var(--p),0.4)] transition-all duration-500">
                                    <div className="bg-base-300 relative h-full w-full overflow-hidden group-hover:brightness-110 transition-all">
                                        {/* Subtle gradient overlay */}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10"></div>

                                        <img
                                            src="/assets/profile.png"
                                            alt="Aditya Vahlevy Nugraha"
                                            className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />

                                        {/* Subtle status indicator */}
                                        <div className="absolute bottom-5 left-5 z-40 flex flex-col items-start gap-1 text-white/90">
                                            <div className="flex items-center gap-2">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                                </span>
                                                <span className="text-[10px] font-mono tracking-widest opacity-60 pl-1">// aktif jam 2 pagi</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ThreeDCard>

                            {/* Floating Badge */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="absolute -bottom-4 -left-8 z-40"
                            >
                                <div className="badge badge-lg bg-base-100 text-primary border-primary/30 p-4 shadow-lg font-medium tracking-tight text-sm hover:scale-105 transition-transform">
                                    🐢 Kura Ninja
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text Column (Left on Desktop) */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="order-2 lg:order-1 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl"
                    >
                        <motion.div variants={itemVariants} className="space-y-2">
                            <p className="font-mono text-[10px] md:text-xs font-bold text-base-content/40 tracking-[0.25em] uppercase mb-1">
                                Aditya Vahlevy Nugraha
                            </p>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-base-content">
                                Hi, I'm <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-info to-secondary">Aditya.</span>
                            </h1>

                            <p className="text-lg md:text-xl lg:text-2xl font-bold text-base-content/80 mt-6 flex flex-wrap justify-center lg:justify-start items-center gap-2">
                                <span className="line-through decoration-error decoration-2 opacity-40 text-base-content/60">Full-stuck</span>
                                <span className="text-primary font-mono">&lt;</span> Fullstack Developer <span className="text-primary font-mono">/&gt;</span>
                            </p>

                            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-base-content/50 flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
                                <span>Software Engineer</span>
                                <span className="opacity-30">/</span>
                                <span>Project Manager</span>
                                <span className="opacity-30">/</span>
                                <span>Data Science</span>
                            </p>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-base md:text-lg leading-relaxed text-base-content/70 max-w-lg text-balance opacity-80">
                            I build things that <span className="font-bold text-base-content">(mostly) work</span>.
                            Currently teaching machines to understand <span className="font-bold text-primary">rice fields from space</span>.
                            It's going... interestingly.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                            <Link to="/projects" className="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all group">
                                View Projects
                                <SlRocket className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="/about" className="btn btn-ghost btn-lg border border-base-content/10 rounded-full px-8 hover:bg-base-200 hover:-translate-y-1 transition-all">
                                <SlUser className="w-4 h-4 mr-2" />
                                About Me
                            </Link>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4 opacity-60">
                            <a href="https://www.linkedin.com/in/adityavahlevynugraha/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-125 transform"><SlSocialLinkedin size={24} /></a>
                            <a href="https://www.instagram.com/adityavhlvy/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors hover:scale-125 transform"><SlSocialInstagram size={24} /></a>
                            <a href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors hover:scale-125 transform"><SlSocialSpotify size={24} /></a>
                            <a href="mailto:adityavhlvy1003@gmail.com" className="hover:text-red-500 transition-colors hover:scale-125 transform"><SlEnvolope size={24} /></a>
                        </motion.div>
                    </motion.div>

                </div>
            </section>

            {/* Music & Stats Grid */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-7xl px-6 lg:px-8 mt-8 mb-20 mx-auto"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">

                    {/* Left: Music (Spotlight Effect) */}
                    <div className="lg:col-span-6 xl:col-span-4 w-full flex flex-col gap-4 h-full">
                        <SpotlightCard title="Vibe Check" className="h-full">
                            <SpotifyNowPlaying />
                        </SpotlightCard>
                    </div>

                    {/* Center: Status Bar (RPG Stats) */}
                    <div className="lg:col-span-6 xl:col-span-4 w-full h-full">
                        <StatusBar />
                    </div>

                    {/* Right: Quick Highlights (Spotlight Effect) */}
                    <div className="lg:col-span-12 xl:col-span-4 w-full h-full">
                        <SpotlightCard title="At a Glance" className="h-full">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-base-100/50 rounded-xl border border-base-content/5 hover:border-primary/20 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-primary mb-1 group-hover:scale-110 origin-left transition-transform">
                                        {projectsData.length}+
                                    </div>
                                    <div className="text-sm font-semibold opacity-70">Quests Done</div>
                                </div>
                                <div className="p-4 bg-base-100/50 rounded-xl border border-base-content/5 hover:border-secondary/20 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-secondary mb-1 group-hover:scale-110 origin-left transition-transform font-mono">NaN</div>
                                    <div className="text-sm font-semibold opacity-70">Sleep Hours</div>
                                </div>
                                <div className="p-4 bg-base-100/50 rounded-xl border border-base-content/5 hover:border-accent/20 transition-colors group justify-center text-center">
                                    <div className="text-3xl font-black text-accent mb-1 group-hover:scale-110 origin-left transition-transform">20+</div>
                                    <div className="text-sm font-semibold opacity-70">Badges</div>
                                </div>
                                <div className="p-4 bg-base-100/50 rounded-xl border border-base-content/5 flex items-center justify-center text-center">
                                    <span className="text-[10px] font-mono opacity-60">Press Ctrl+K</span>
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
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-4xl font-bold flex items-center gap-3"
                        >
                            <SlStar className="text-yellow-500 animate-spin-slow" />
                            Featured Projects
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-base-content/60 mt-2 text-lg"
                        >
                            Handcrafted with humility and mild confusion.
                        </motion.p>
                    </div>
                    <Link to="/projects" className="btn btn-ghost gap-2 group">
                        View All <SlRocket size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Link>
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
