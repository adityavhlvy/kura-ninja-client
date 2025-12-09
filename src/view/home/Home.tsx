import { Link } from "react-router-dom";
import { SlRocket, SlUser, SlStar, SlSocialLinkedin, SlSocialInstagram, SlEnvolope, SlSocialSpotify } from "react-icons/sl";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../projects/Projects";
import SEO from "../../components/SEO";
import SpotifyNowPlaying from "../../components/SpotifyNowPlaying";

export default function Home() {
    // Get featured projects
    const featuredProjects = projectsData.filter(p => p.featured);

    return (
        <PageTransition>
            <SEO
                title="Aditya Vahlevi Nugraha - Fullstack Developer"
                description="Aditya Vahlevi Nugraha is a Fullstack Developer, Software Engineer, and Data Science Enthusiast based in Indonesia. Explore his projects and learn more about his work."
                keywords="Aditya Vahlevi Nugraha, Fullstack Developer, Software Engineer, Data Science, Indonesia, React, Node.js, Python, Portfolio"
            />
            {/* V5 Fluid Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-[90vh] lg:min-h-screen pt-20 pb-8 lg:pt-0 lg:pb-40 w-full overflow-hidden">
                {/* Background Decoration - Ambient Glow */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-base-100/50 to-base-100 opacity-60"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                    <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] opacity-30"></div>
                    {/* Tech Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
                </div>

                {/* Content Container - Fluid & Tight */}
                <div className="z-10 w-full max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14 mx-auto">

                    {/* Visual/Image Column (Right on Desktop) - Responsive Constraints */}
                    <div className="order-1 lg:order-2 flex-1 flex justify-center lg:justify-end relative">
                        <div className="relative group">
                            {/* Decorative Corners */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-lg group-hover:border-primary/60 transition-colors"></div>
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-secondary/30 rounded-br-lg group-hover:border-secondary/60 transition-colors"></div>

                            {/* Cyber Frame - Fluid Sizing (Max Height Constraint) */}
                            <div className="mockup-window border border-base-content/10 bg-base-200/40 backdrop-blur-md shadow-2xl hover:shadow-[0_0_30px_-5px_rgba(var(--p),0.3)] transition-all duration-500 w-64 md:w-72 lg:w-96 xl:w-104 max-h-[50vh] lg:max-h-[60vh] aspect-4/5">
                                <div className="bg-base-300 relative h-full w-full overflow-hidden group-hover:brightness-110 transition-all">
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,var(--base-300)_2px)] bg-size-[100%_4px] opacity-20 pointer-events-none z-20"></div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent z-10"></div>

                                    <img
                                        src="/assets/profile.png"
                                        alt="Aditya Vahlevi Nugraha"
                                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />

                                    {/* Tech Badge Overlay */}
                                    <div className="absolute bottom-3 left-3 z-30 flex flex-col items-start gap-1 text-white/90">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-success animate-ping"></div>
                                            <span className="text-[10px] font-mono tracking-widest opacity-80">NET.STATUS: ONLINE</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badge - Scaled Down */}
                            <div className="absolute -bottom-4 -left-4 z-40 transform -rotate-3 group-hover:rotate-0 transition-transform duration-300">
                                <div className="badge badge-lg bg-base-100 text-primary border-primary p-3 shadow-[3px_3px_0px_0px_rgba(var(--p),1)] font-black tracking-tight text-sm">
                                    <SlRocket className="mr-2 animate-bounce w-3 h-3" /> SIDE QUESTS?
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Text Column (Left on Desktop) - Compact & Fluid */}
                    <div className="order-2 lg:order-1 flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 max-w-2xl">

                        <div className="space-y-2">
                            {/* Full Name - Tech Spec Look */}
                            <p className="font-mono text-[10px] md:text-xs font-bold text-base-content/40 tracking-[0.25em] uppercase mb-1">
                                Aditya Vahlevi Nugraha
                            </p>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[0.9] text-base-content">
                                Hi, I'm <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary animate-gradient-x">Aditya.</span>
                            </h1>

                            {/* Role with Twist */}
                            <p className="text-lg md:text-xl lg:text-2xl font-bold text-base-content/80 mt-1">
                                <span className="line-through decoration-error decoration-2 opacity-40 mr-2 text-base-content/60">Full-stuck</span>
                                <span className="text-primary font-mono">&lt;</span> Fullstack Developer <span className="text-primary font-mono">/&gt;</span>
                            </p>

                            {/* Sub-roles - Small & Techy */}
                            <p className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-base-content/50 flex flex-wrap justify-center lg:justify-start gap-2 pt-1">
                                <span>Software Engineer</span>
                                <span className="opacity-30">/</span>
                                <span>Project Manager</span>
                                <span className="opacity-30">/</span>
                                <span>Data Science</span>
                            </p>
                        </div>

                        <p className="text-base md:text-lg leading-relaxed text-base-content/70 max-w-lg text-balance opacity-80">
                            I craft <span className="font-bold text-base-content">digital experiences</span> that just work.
                            Currently engineering the future of agritech at <span className="font-bold text-primary">Pupuk Indonesia</span>.
                        </p>

                        <div className="flex flex-wrap gap-3 pt-3">
                            <Link to="/projects" className="btn btn-primary btn-md rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                                View Projects
                                <SlRocket className="w-4 h-4 ml-2" />
                            </Link>
                            <Link to="/about" className="btn btn-ghost btn-md border border-base-content/10 rounded-full px-6 hover:bg-base-200 hover:-translate-y-1 transition-all">
                                <SlUser className="w-4 h-4 mr-2" />
                                About Me
                            </Link>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 pt-3 opacity-60">
                            <a href="https://www.linkedin.com/in/adityavahlevynugraha/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:scale-110"><SlSocialLinkedin size={20} /></a>
                            <a href="https://www.instagram.com/adityavhlvy/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors hover:scale-110"><SlSocialInstagram size={20} /></a>
                            <a href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu" target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors hover:scale-110"><SlSocialSpotify size={20} /></a>
                            <a href="mailto:adityavhlvy1003@gmail.com" className="hover:text-red-500 transition-colors hover:scale-110"><SlEnvolope size={20} /></a>
                        </div>
                    </div>

                </div>
            </section>

            {/* Music & Stats Grid */}
            <div className="z-10 w-full max-w-7xl px-6 lg:px-8 mt-8 mb-20 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-stretch">

                    {/* Left: Music (Vibe check) */}
                    <div className="lg:col-span-12 xl:col-span-5 w-full flex flex-col gap-4 h-full">
                        <div className="bg-base-200/50 p-6 rounded-3xl backdrop-blur-sm border border-base-content/5 h-full flex flex-col justify-center">
                            <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-3 ml-1">Vibe Check</h3>
                            <SpotifyNowPlaying />
                        </div>
                    </div>

                    {/* Right: Quick Highlights (Insightful) */}
                    <div className="lg:col-span-12 xl:col-span-7 w-full h-full">
                        <div className="bg-base-200/30 p-6 rounded-3xl border border-base-content/5 backdrop-blur-sm h-full flex flex-col justify-center">
                            <h3 className="text-sm font-bold uppercase tracking-wider opacity-50 mb-4">At a Glance</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-base-100 rounded-xl hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-black text-primary mb-1">9+</div>
                                    <div className="text-sm font-semibold opacity-70">Shipped Projects</div>
                                </div>
                                <div className="p-4 bg-base-100 rounded-xl hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-black text-secondary mb-1">3.58</div>
                                    <div className="text-sm font-semibold opacity-70">GPA (Cum Laude)</div>
                                </div>
                                <div className="p-4 bg-base-100 rounded-xl hover:shadow-md transition-shadow">
                                    <div className="text-3xl font-black text-accent mb-1">20+</div>
                                    <div className="text-sm font-semibold opacity-70">Certifications</div>
                                </div>
                                <div className="p-4 bg-base-100 rounded-xl hover:shadow-md transition-shadow flex items-center justify-center text-center">
                                    <span className="text-sm font-mono opacity-60">"always learning, always sleeping."</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Projects */}
            <section className="container mx-auto max-w-6xl p-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <SlStar className="text-yellow-500" />
                            Featured Projects
                        </h2>
                        <p className="text-base-content/60 mt-1">Handcrafted with humility and mild confusion.</p>
                    </div>
                    <Link to="/projects" className="btn btn-ghost btn-sm gap-2">
                        View All <SlRocket size={12} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </section>

        </PageTransition>
    );
}
