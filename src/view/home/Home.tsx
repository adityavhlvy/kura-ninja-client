import { Link } from "react-router-dom";
import { SlRocket, SlUser, SlStar, SlBriefcase, SlBadge, SlSocialLinkedin, SlSocialInstagram, SlEnvolope, SlSocialSpotify } from "react-icons/sl";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../projects/Projects";
import SEO from "../../components/SEO";
import SpotifyNowPlaying from "../../components/SpotifyNowPlaying";
import SpotifyTopTracks from "../../components/SpotifyTopTracks";

export default function Home() {
    // Get featured projects
    const featuredProjects = projectsData.filter(p => p.featured);

    return (
        <PageTransition className="space-y-20 pb-10">
            <SEO
                title="Aditya Vahlevy Nugraha - Kura Ninja | Home"
                description="Welcome to the official portfolio of Aditya Vahlevy Nugraha (Kura Ninja). Explore innovative web projects and software engineering skills."
            />
            {/* Hero Section */}
            <section className="hero min-h-[80vh] bg-base-100 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
                </div>

                <div className="hero-content text-center z-10 flex-col w-full">
                    <div className="max-w-4xl w-full flex flex-col items-center">

                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            <span className="text-primary">Aditya</span> Vahlevy Nugraha
                        </h1>

                        <div className="mb-8 space-y-4 flex flex-col items-center">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                                <p className="text-3xl md:text-4xl font-bold text-base-content text-center md:text-left">
                                    Jr. Fullstack Developer
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="badge badge-success gap-2 animate-pulse shadow-lg shadow-success/20 whitespace-nowrap">
                                        <div className="w-2 h-2 bg-current rounded-full"></div>
                                        Open to collaboration
                                    </div>
                                    <div className="flex gap-2">
                                        <a href="https://www.linkedin.com/in/adityavahlevynugraha/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                                            <SlSocialLinkedin size={18} />
                                        </a>
                                        <a href="https://www.instagram.com/adityavhlvy/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-pink-500 hover:bg-pink-500/10">
                                            <SlSocialInstagram size={18} />
                                        </a>
                                        <a href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-[#1DB954] hover:bg-[#1DB954]/10">
                                            <SlSocialSpotify size={18} />
                                        </a>
                                        <a href="mailto:adityavhlvy1003@gmail.com" className="btn btn-ghost btn-circle btn-sm text-red-500 hover:bg-red-500/10">
                                            <SlEnvolope size={18} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xl md:text-2xl font-light text-base-content/60 text-center">
                                Project Management <span className="text-base-content/30 mx-2">|</span> Data Science Enthusiast
                            </p>
                        </div>

                        {/* Music Section */}
                        <section className="container mx-auto max-w-6xl p-4 mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                <div className="w-full h-full">
                                    <SpotifyNowPlaying />
                                </div>
                                <div className="w-full h-full">
                                    <SpotifyTopTracks />
                                </div>
                            </div>
                        </section>

                        <p className="pb-6 text-lg leading-relaxed max-w-3xl mx-auto text-base-content/70">
                            Fullstack Developer & Software Engineer. I turn coffee into code and <span className="line-through opacity-50 decoration-red-500">bugs</span> features.
                            I also dabble in <span className="font-semibold text-base-content">Data Science</span> and <span className="font-semibold text-base-content">Project Management</span>, mostly to confuse myself in new ways.
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-base-content/10 pt-8 w-full">
                            <div className="flex flex-col items-center group cursor-default">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-primary to-primary-focus group-hover:scale-110 transition-transform duration-300">9+</span>
                                <span className="text-sm font-medium opacity-70 flex items-center gap-1.5 mt-2"><SlRocket size={14} className="text-primary" /> Projects</span>
                            </div>
                            <div className="flex flex-col items-center group cursor-default">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-secondary to-secondary-focus group-hover:scale-110 transition-transform duration-300">1 Yr</span>
                                <span className="text-sm font-medium opacity-70 flex items-center gap-1.5 mt-2"><SlBriefcase size={14} className="text-secondary" /> Experience</span>
                            </div>
                            <div className="flex flex-col items-center group cursor-default">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-accent to-accent-focus group-hover:scale-110 transition-transform duration-300">3.58</span>
                                <span className="text-sm font-medium opacity-70 flex items-center gap-1.5 mt-2"><SlStar size={14} className="text-accent" /> GPA (Cum Laude)</span>
                            </div>
                            <div className="flex flex-col items-center group cursor-default">
                                <span className="text-4xl font-black text-transparent bg-clip-text bg-linear-to-br from-info to-info-focus group-hover:scale-110 transition-transform duration-300">20+</span>
                                <span className="text-sm font-medium opacity-70 flex items-center gap-1.5 mt-2"><SlBadge size={14} className="text-info" /> Certifications</span>
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
