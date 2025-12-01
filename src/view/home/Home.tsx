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

                        <div className="flex flex-col items-center gap-3 mb-6">
                            <div className="badge badge-primary badge-outline font-mono">Open to Collaboration</div>
                            <div className="flex gap-4">
                                <a href="https://www.linkedin.com/in/adityavahlevynugraha/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-primary hover:bg-primary/10">
                                    <SlSocialLinkedin size={20} />
                                </a>
                                <a href="https://www.instagram.com/adityavhlvy/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-pink-500 hover:bg-pink-500/10">
                                    <SlSocialInstagram size={20} />
                                </a>
                                <a href="https://open.spotify.com/user/xu97h5ah78wnivg1ra7etg2wu" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-circle btn-sm text-[#1DB954] hover:bg-[#1DB954]/10">
                                    <SlSocialSpotify size={20} />
                                </a>
                                <a href="mailto:adityavhlvy1003@gmail.com" className="btn btn-ghost btn-circle btn-sm text-red-500 hover:bg-red-500/10">
                                    <SlEnvolope size={20} />
                                </a>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
                            <span className="text-primary">Aditya</span> Vahlevy Nugraha
                        </h1>

                        <div className="mb-8 space-y-2">
                            <p className="text-3xl md:text-4xl font-bold text-base-content">
                                Jr. Fullstack Developer
                            </p>
                            <p className="text-xl md:text-2xl font-light text-base-content/60">
                                Project Management <span className="text-base-content/30 mx-2">|</span> Data Science Enthusiast
                            </p>
                        </div>

                        {/* Music Section */}
                        <section className="container mx-auto max-w-6xl p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-4xl mx-auto">
                                <div className="w-full h-full">
                                    <SpotifyNowPlaying />
                                </div>
                                <div className="w-full h-full">
                                    <SpotifyTopTracks />
                                </div>
                            </div>
                        </section>

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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-base-content/10 pt-8 w-full">
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

        </PageTransition>
    );
}
