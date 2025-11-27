import { useParams, Link, Navigate } from "react-router-dom";
import { projectsData } from "./Projects";
import { SlArrowLeft, SlGlobe, SlLock } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";

import PageTransition from "../../components/PageTransition";

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const statusColors = {
        'completed': 'badge-success',
        'in-progress': 'badge-warning',
        'archived': 'badge-ghost'
    };

    const isPrivate = project.visibility === 'private';

    return (
        <PageTransition className="container mx-auto max-w-4xl">
            {/* Back Button */}
            <Link to="/projects" className="btn btn-ghost btn-sm gap-2 mb-6">
                <SlArrowLeft />
                Back to Projects
            </Link>

            {/* Header */}
            <div className="mb-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        <div className={`badge ${statusColors[project.status]} badge-lg uppercase font-semibold`}>
                            {project.status}
                        </div>
                        <div className="badge badge-neutral badge-lg gap-2">
                            {project.visibility === 'public' ? <SlGlobe size={14} /> : <SlLock size={14} />}
                            <span className="uppercase font-semibold">{project.visibility}</span>
                        </div>
                    </div>
                </div>
                <p className="text-lg text-base-content/80">{project.description}</p>
            </div>

            {/* Image */}
            {project.image && (
                <figure className="rounded-lg overflow-hidden mb-8 border border-base-300">
                    <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                </figure>
            )}

            {/* Tech Stack */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
                <div className="flex flex-wrap gap-3">
                    {project.techStack.map((tech, index) => (
                        <span key={index} className="badge badge-outline badge-lg font-mono">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Links */}
            {project.links.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Links</h2>
                    <div className="flex flex-wrap gap-3">
                        {project.links.map((link, index) => (
                            <a
                                key={index}
                                href={isPrivate ? undefined : link.url}
                                target={isPrivate ? undefined : "_blank"}
                                rel={isPrivate ? undefined : "noopener noreferrer"}
                                className={`btn btn-primary gap-2 ${isPrivate ? 'btn-disabled opacity-50' : ''}`}
                                aria-disabled={isPrivate}
                            >
                                {link.icon || (link.url.includes('github') ? <VscGithub size={20} /> : null)}
                                {link.label}
                            </a>
                        ))}
                    </div>
                    {isPrivate && (
                        <p className="text-sm text-warning mt-3">
                            🔒 This is a private project. Links are disabled.
                        </p>
                    )}
                </div>
            )}

            {/* Additional Details Section */}
            {project.details && project.details.length > 0 && (
                <div className="card bg-base-200 shadow-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">Project Details</h2>
                    <ul className="list-disc list-inside space-y-2 text-base-content/70">
                        {project.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>
            )}
        </PageTransition>
    );
}
