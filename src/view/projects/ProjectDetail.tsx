"use client";

import { useParams, redirect } from "next/navigation";
import Link from "next/link";
import { projectsData } from "./Projects";
import { SlArrowLeft, SlGlobe, SlLock, SlCheck } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";

import PageTransition from "../../components/PageTransition";
import SEO from "../../components/SEO";

export default function ProjectDetail() {
    const { slug } = useParams<{ slug: string }>();
    const project = projectsData.find((p) => p.slug === slug);

    if (!project) {
        redirect("/projects");
        return null;
    }

    const statusColors = {
        'completed': 'badge-success',
        'in-progress': 'badge-warning',
        'archived': 'badge-ghost',
        'active': 'badge-success'
    };

    const isPrivate = project.visibility === 'private';

    return (
        <PageTransition className="container mx-auto max-w-5xl pb-32"> {/* Increased max-width and added pb-32 */}
            <SEO
                title={`${project.title} | Projects by Aditya Vahlevy Nugraha`}
                description={project.description}
                keywords={`Aditya Vahlevy Nugraha, Project, ${project.title}, ${project.techStack.join(', ')}`}
                url={`https://kuraninja.vercel.app/projects/${project.slug}`}
                image={project.image && !project.image.startsWith('http') ? `https://kuraninja.vercel.app${project.image}` : project.image}
            />
            {/* Back Button */}
            <div className="mb-8 pt-4">
                <Link href="/projects" className="btn btn-ghost btn-sm gap-2 hover:bg-base-200">
                    <SlArrowLeft />
                    Back to Projects
                </Link>
            </div>

            {/* Header Section */}
            <div className="mb-12">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight leading-tight bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-base-content/80 leading-relaxed font-light">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 md:justify-end min-w-fit">
                        <div className={`badge ${statusColors[project.status]} badge-lg uppercase font-bold tracking-wide py-4 px-4`}>
                            {project.status}
                        </div>
                        <div className="badge badge-neutral badge-lg gap-2 py-4 px-4">
                            {project.visibility === 'public' ? <SlGlobe size={16} /> : <SlLock size={16} />}
                            <span className="uppercase font-bold tracking-wide">{project.visibility}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Image */}
            {project.image && (
                <figure className="rounded-2xl overflow-hidden mb-12 shadow-2xl ring-1 ring-base-content/10 bg-base-200 aspect-video relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100/20 to-transparent pointer-events-none" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </figure>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-10">
                    {/* Project Details */}
                    {project.details && project.details.length > 0 && (
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full"></span>
                                Project Highlights
                            </h2>
                            <div className="grid gap-4">
                                {project.details.map((detail, index) => (
                                    <div
                                        key={index}
                                        className="card bg-base-200/50 hover:bg-base-200 transition-colors border-l-4 border-l-primary/20 hover:border-l-primary duration-300"
                                    >
                                        <div className="card-body p-5 flex flex-row gap-4 items-start">
                                            <div className="mt-1 text-primary">
                                                <SlCheck size={20} className="stroke-[20px]" />
                                            </div>
                                            <p className="text-base-content/80 text-lg leading-relaxed m-0 font-medium">
                                                {detail}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Meta Info */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Tech Stack */}
                    <div className="card bg-base-100 shadow-lg border border-base-200">
                        <div className="card-body p-6">
                            <h3 className="card-title text-xl font-bold mb-4 opacity-90">Tech Stack</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech, index) => (
                                    <span key={index} className="badge badge-primary badge-outline badge-lg py-3 hover:bg-primary hover:text-primary-content transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {project.links.length > 0 && (
                        <div className="card bg-base-100 shadow-lg border border-base-200">
                            <div className="card-body p-6">
                                <h3 className="card-title text-xl font-bold mb-4 opacity-90">Links</h3>
                                <div className="flex flex-col gap-3">
                                    {project.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={isPrivate ? undefined : link.url}
                                            target={isPrivate ? undefined : "_blank"}
                                            rel={isPrivate ? undefined : "noopener noreferrer"}
                                            className={`btn btn-primary w-full shadow-md ${isPrivate ? 'btn-disabled opacity-50' : ''}`}
                                            aria-disabled={isPrivate}
                                        >
                                            {link.icon || (link.url.includes('github') ? <VscGithub size={22} /> : <SlGlobe size={22} />)}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {isPrivate && (
                        <div className="alert alert-warning shadow-lg">
                            <SlLock />
                            <span className="text-sm font-medium">This is a private project. Some details and links might be restricted.</span>
                        </div>
                    )}
                </div>
            </div>

        </PageTransition>
    );
}
