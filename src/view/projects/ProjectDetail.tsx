import { useParams, useNavigate, Link } from "react-router-dom";
import { projectsData } from "../../data/projects";
import { SlArrowLeft, SlGlobe, SlLock, SlCheck, SlLayers, SlRocket, SlBulb, SlChart } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageTransition from "../../components/PageTransition";

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const project = projectsData.find((p) => p.slug === slug);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    if (!project) {
        navigate("/projects", { replace: true });
        return null;
    }

    const allImages = project.images && project.images.length > 0 
        ? project.images 
        : project.image ? [project.image] : [];

    const statusColors = {
        'completed': 'badge-success',
        'in-progress': 'badge-warning',
        'archived': 'badge-ghost',
        'active': 'badge-success'
    };

    const isPrivate = project.visibility === 'private';

    return (
        <PageTransition className="container mx-auto max-w-5xl pb-32">
            {/* Back Button */}
            <div className="mb-8 pt-4">
                <Link to="/projects" className="btn btn-ghost btn-sm gap-2 hover:bg-base-200">
                    <SlArrowLeft />
                    Back to Projects
                </Link>
            </div>

            {/* Header Section */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`badge ${statusColors[project.status]} badge-md uppercase font-bold tracking-wide`}>
                                {project.status}
                            </div>
                            <div className="badge badge-neutral badge-md gap-2">
                                {project.visibility === 'public' ? <SlGlobe size={14} /> : <SlLock size={14} />}
                                <span className="uppercase font-bold tracking-wide">{project.visibility}</span>
                            </div>
                            <span className="text-sm font-mono opacity-50">{project.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight bg-gradient-to-br from-base-content via-base-content to-base-content/50 bg-clip-text text-transparent text-wrap">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-base-content/70 leading-relaxed font-light max-w-3xl">
                            {project.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {allImages.length > 0 && (
                <div className="mb-16 space-y-4">
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-base-300 shadow-2xl border border-base-content/5">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImageIndex}
                                src={allImages[activeImageIndex]}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="w-full h-full object-cover"
                                alt={`${project.title} preview ${activeImageIndex + 1}`}
                            />
                        </AnimatePresence>
                    </div>
                    
                    {allImages.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                            {allImages.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImageIndex(idx)}
                                    className={`relative flex-shrink-0 w-32 aspect-video rounded-xl overflow-hidden transition-all duration-300 border-2 ${
                                        activeImageIndex === idx 
                                        ? "border-primary opacity-100 scale-105 shadow-lg" 
                                        : "border-transparent opacity-40 hover:opacity-70"
                                    }`}
                                >
                                    <img src={img} className="w-full h-full object-cover" alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Extensive Details */}
                <div className="lg:col-span-2 space-y-16">
                    
                    {/* Rationale Section */}
                    {project.rationale && (
                        <section>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 opacity-90">
                                <SlBulb className="text-primary" />
                                Project Rationale
                            </h2>
                            <div className="p-8 rounded-3xl bg-base-200/50 border border-base-content/5 leading-relaxed text-lg text-base-content/80">
                                {project.rationale}
                            </div>
                        </section>
                    )}

                    {/* Features / Highlights */}
                    {project.details && project.details.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 opacity-90">
                                <SlLayers className="text-primary" />
                                Core Features
                            </h2>
                            <div className="grid gap-4">
                                {project.details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="group flex gap-5 p-6 rounded-2xl bg-base-200/30 hover:bg-base-200/60 transition-all duration-300 border border-base-content/5"
                                    >
                                        <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <SlCheck className="text-primary" size={12} />
                                        </div>
                                        <p className="text-lg text-base-content/80 m-0">
                                            {detail}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Technical Challenges */}
                    {project.technicalChallenges && project.technicalChallenges.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 opacity-90">
                                <SlRocket className="text-primary" />
                                Technical Challenges
                            </h2>
                            <div className="space-y-6">
                                {project.technicalChallenges.map((challenge, index) => (
                                    <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                                        <p className="text-lg text-base-content/70 italic leading-relaxed">
                                            &quot;{challenge}&quot;
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column: Meta & Stats */}
                <div className="space-y-10">
                    {/* Readiness Stats */}
                    {project.readiness && (
                        <div className="card bg-base-200/50 border border-base-content/5 overflow-hidden">
                            <div className="card-body p-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6 flex items-center gap-2">
                                    <SlChart />
                                    Project Readiness
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: 'Test Coverage', value: project.readiness.tests },
                                        { label: 'Documentation', value: project.readiness.docs },
                                        { label: 'Performance / Quality', value: project.readiness.quality },
                                    ].map((stat, i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span>{stat.label}</span>
                                                <span className="text-primary">{stat.value}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-base-300 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${stat.value}%` }}
                                                    className="h-full bg-primary"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tech Stack */}
                    <div className="card bg-base-100 shadow-xl border border-base-200">
                        <div className="card-body p-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest opacity-50 mb-6">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <span key={index} className="badge badge-lg badge-ghost border border-base-content/10 font-mono text-sm py-4">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Competencies */}
                    {project.competencies && project.competencies.length > 0 && (
                        <div className="card bg-primary/5 border border-primary/10">
                            <div className="card-body p-8">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Key Competencies</h3>
                                <ul className="space-y-3">
                                    {project.competencies.map((comp, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                            {comp}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Links */}
                    {project.links.length > 0 && (
                        <div className="space-y-3">
                            {project.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={isPrivate ? undefined : link.url}
                                    target={isPrivate ? undefined : "_blank"}
                                    rel={isPrivate ? undefined : "noopener noreferrer"}
                                    className={`btn btn-lg w-full gap-3 ${isPrivate ? 'btn-disabled opacity-50' : 'btn-primary shadow-xl shadow-primary/20'}`}
                                >
                                    {link.icon || (link.url.includes('github') ? <VscGithub size={20} /> : <SlGlobe size={20} />)}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    )}

                    {isPrivate && (
                        <div className="p-6 rounded-2xl bg-warning/10 border border-warning/20 flex gap-4 text-warning">
                            <SlLock className="flex-shrink-0 mt-1" />
                            <p className="text-sm font-medium m-0">This is a private project. Some links and internal technical artifacts may be restricted.</p>
                        </div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
}
