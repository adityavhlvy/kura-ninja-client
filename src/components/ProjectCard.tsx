import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SlGlobe, SlLock, SlLink } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";

export interface ProjectLink {
    label: string;
    url: string;
    icon?: ReactNode;
}

export interface ProjectCardProps {
    slug: string;
    title: string;
    description: string;
    techStack: string[];
    links: ProjectLink[];
    image?: string;
    status: 'completed' | 'in-progress' | 'archived';
    visibility: 'public' | 'private';
}

export default function ProjectCard({
    slug,
    title,
    description,
    techStack,
    links,
    image,
    status,
    visibility
}: ProjectCardProps) {
    const statusColors = {
        'completed': 'badge-success',
        'in-progress': 'badge-warning',
        'archived': 'badge-ghost'
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card bg-base-200 shadow-xl overflow-hidden border border-base-300 hover:border-primary transition-colors duration-300"
        >
            <Link to={`/projects/${slug}`} className="block">
                {image && (
                    <figure className="h-48 w-full overflow-hidden">
                        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                    </figure>
                )}
                <div className="card-body p-5">
                    <div className="flex justify-between items-start gap-2">
                        <h2 className="card-title text-xl font-bold">
                            {title}
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
                            <div className={`badge ${statusColors[status]} badge-sm uppercase font-semibold text-xs whitespace-nowrap`}>
                                {status}
                            </div>
                            <div className="badge badge-neutral badge-sm gap-1 whitespace-nowrap">
                                {visibility === 'public' ? <SlGlobe size={10} /> : <SlLock size={10} />}
                                <span className="uppercase font-semibold text-xs">{visibility}</span>
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-base-content/70 my-3 line-clamp-3">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {techStack.map((tech, index) => (
                            <span key={index} className="badge badge-outline badge-sm font-mono">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>

            <div className="card-body p-5 pt-0">
                <div className="card-actions justify-end">
                    {links.map((link, index) => {
                        const isPrivate = visibility === 'private';
                        return (
                            <a
                                key={index}
                                href={isPrivate ? undefined : link.url}
                                target={isPrivate ? undefined : "_blank"}
                                rel={isPrivate ? undefined : "noopener noreferrer"}
                                className={`btn btn-sm btn-ghost gap-2 ${isPrivate ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
                                aria-disabled={isPrivate}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {link.icon || (link.url.includes('github') ? <VscGithub /> : <SlLink />)}
                                {link.label}
                            </a>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
