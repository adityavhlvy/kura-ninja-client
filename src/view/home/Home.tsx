import { Link } from "react-router-dom";
import { SlRocket, SlUser, SlStar, SlBriefcase, SlBadge } from "react-icons/sl";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../projects/Projects";

export default function Home() {
    // Get featured projects
    const featuredProjects = projectsData.filter(p => p.featured);

    return (
        <PageTransition className="space-y-20 pb-10">
            {/* Hero Section */}
            <section className="hero min-h-[80vh] bg-base-100 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
                </div>

                <div className="hero-content text-center z-10">
                    <div className="max-w-4xl">
                        <div className="badge badge-primary badge-outline mb-4 font-mono">Open to Work & Collaboration</div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Aditya Vahlevy <span className="text-primary">Nugraha</span>
                        </h1>
                        <p className="text-2xl md:text-3xl font-light text-base-content/80 mb-8">
                            Jr. Fullstack Developer <span className="text-base-content/30 mx-2">|</span> Data Science Enthusiast
                        </p>

                        <p className="py-6 text-lg leading-relaxed max-w-2xl mx-auto text-base-content/70">
                            Building the bridge between <span className="font-semibold text-base-content">complex data</span> and <span className="font-semibold text-base-content">intuitive user experiences</span>.
                            <br />
                            Currently engineering solutions at <span className="font-semibold text-primary">PT Pupuk Indonesia</span>.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link to="/projects" className="btn btn-primary btn-lg gap-3 shadow-lg hover:shadow-primary/50 transition-all">
                                <SlRocket />
                                View Projects
                            </Link>
                            <Link to="/about" className="btn btn-outline btn-lg gap-3">
                                <SlUser />
                                More About Me
                            </Link>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-base-content/10 pt-8">
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-primary">7+</span>
                                <span className="text-sm opacity-60 flex items-center gap-1"><SlRocket size={12} /> Projects</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-secondary">1 Yr</span>
                                <span className="text-sm opacity-60 flex items-center gap-1"><SlBriefcase size={12} /> Experience</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-accent">3.58</span>
                                <span className="text-sm opacity-60 flex items-center gap-1"><SlStar size={12} /> GPA (Cum Laude)</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-bold text-info">20+</span>
                                <span className="text-sm opacity-60 flex items-center gap-1"><SlBadge size={12} /> Certifications</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Projects */}
            <section className="container mx-auto max-w-6xl p-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2">
                            <SlStar className="text-yellow-500" />
                            Featured Projects
                        </h2>
                        <p className="text-base-content/60 mt-1">Some of my best work.</p>
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

            {/* Spotify Section */}
            {/* TODO */}
        </PageTransition>
    );
}
