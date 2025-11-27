import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SlGlobe, SlLock, SlLink } from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";
import {
    SiPython, SiPandas, SiHuggingface, SiVuedotjs, SiTailwindcss,
    SiNodedotjs, SiExpress, SiLaravel, SiMysql, SiPhp, SiBootstrap,
    SiFigma, SiTensorflow, SiStreamlit, SiGoogleearth, SiScikitlearn,
    SiKeras, SiOpencv, SiPlotly, SiDaisyui,
    SiPytorch, SiNextdotjs, SiChartdotjs, SiGo, SiPostgresql, SiDocker, SiBun, SiMapbox
} from "react-icons/si";
import { FaDatabase, FaRobot, FaBrain, FaChartBar, FaCode, FaLeaf, FaCloudSun, FaPencilRuler } from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";

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
    date: string;
    details?: string[];
    featured?: boolean;
}

const getTechIcon = (tech: string) => {
    const lowerTech = tech.toLowerCase();

    if (lowerTech.includes('python')) return <SiPython />;
    if (lowerTech.includes('pandas')) return <SiPandas />;
    if (lowerTech.includes('hugging face')) return <SiHuggingface />;
    if (lowerTech.includes('vue')) return <SiVuedotjs />;
    if (lowerTech.includes('tailwind')) return <SiTailwindcss />;
    if (lowerTech.includes('daisy')) return <SiDaisyui />;
    if (lowerTech.includes('node')) return <SiNodedotjs />;
    if (lowerTech.includes('express')) return <SiExpress />;
    if (lowerTech.includes('laravel')) return <SiLaravel />;
    if (lowerTech.includes('mysql')) return <SiMysql />;
    if (lowerTech.includes('php')) return <SiPhp />;
    if (lowerTech.includes('bootstrap')) return <SiBootstrap />;
    if (lowerTech.includes('figma')) return <SiFigma />;
    if (lowerTech.includes('tensorflow')) return <SiTensorflow />;
    if (lowerTech.includes('pytorch')) return <SiPytorch />;
    if (lowerTech.includes('streamlit')) return <SiStreamlit />;
    if (lowerTech.includes('google earth')) return <SiGoogleearth />;
    if (lowerTech.includes('scikit')) return <SiScikitlearn />;
    if (lowerTech.includes('keras')) return <SiKeras />;
    if (lowerTech.includes('opencv') || lowerTech.includes('computer vision')) return <SiOpencv />;
    if (lowerTech.includes('plotly') || lowerTech.includes('visualization')) return <SiPlotly />;
    if (lowerTech.includes('next')) return <SiNextdotjs />;
    if (lowerTech.includes('chart')) return <SiChartdotjs />;
    if (lowerTech.includes('go') && !lowerTech.includes('google')) return <SiGo />;
    if (lowerTech.includes('postgres')) return <SiPostgresql />;
    if (lowerTech.includes('docker')) return <SiDocker />;
    if (lowerTech.includes('bun')) return <SiBun />;
    if (lowerTech.includes('deck') || lowerTech.includes('map')) return <SiMapbox />;

    // Generic/Other mappings
    if (lowerTech.includes('nlp') || lowerTech.includes('language')) return <MdOutlineTranslate />;
    if (lowerTech.includes('cnn') || lowerTech.includes('lstm') || lowerTech.includes('gru') || lowerTech.includes('deep learning')) return <FaBrain />;
    if (lowerTech.includes('rag') || lowerTech.includes('llm') || lowerTech.includes('gpt') || lowerTech.includes('bot')) return <FaRobot />;
    if (lowerTech.includes('data') || lowerTech.includes('chroma')) return <FaDatabase />;
    if (lowerTech.includes('analysis') || lowerTech.includes('forecasting')) return <FaChartBar />;
    if (lowerTech.includes('ui/ux') || lowerTech.includes('design')) return <FaPencilRuler />;
    if (lowerTech.includes('weather') || lowerTech.includes('climate')) return <FaCloudSun />;
    if (lowerTech.includes('yield') || lowerTech.includes('crop')) return <FaLeaf />;

    return <FaCode />;
};

export default function ProjectCard({
    slug,
    title,
    description,
    techStack,
    links,
    image,
    status,
    visibility,
    date
}: ProjectCardProps) {
    const statusColors = {
        'completed': 'badge-success',
        'in-progress': 'badge-warning',
        'archived': 'badge-ghost'
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="card bg-base-200 shadow-xl overflow-hidden border border-base-300 hover:border-primary transition-all duration-300 flex flex-col h-full"
        >
            <Link to={`/projects/${slug}`} className="block flex-grow">
                {image && (
                    <figure className="h-48 w-full overflow-hidden relative group">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                            <div className={`badge ${statusColors[status]} badge-sm uppercase font-semibold text-[10px] shadow-md`}>
                                {status}
                            </div>
                            <div className="badge badge-neutral badge-sm gap-1 uppercase font-semibold text-[10px] shadow-md">
                                {visibility === 'public' ? <SlGlobe size={10} /> : <SlLock size={10} />}
                                {visibility}
                            </div>
                        </div>
                    </figure>
                )}
                <div className="card-body p-5">
                    <div className="flex justify-between items-baseline gap-2 mb-2">
                        <h2 className="card-title text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                            {title}
                        </h2>
                        <span className="text-xs font-mono text-base-content/50 shrink-0">{date}</span>
                    </div>

                    <p className="text-sm text-base-content/70 mb-4 line-clamp-3">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {techStack.slice(0, 5).map((tech, index) => (
                            <span key={index} className="badge badge-outline badge-sm font-mono opacity-80 gap-1.5 pl-1.5 pr-2 py-2.5">
                                <span className="text-base-content/70 text-xs">
                                    {getTechIcon(tech)}
                                </span>
                                {tech}
                            </span>
                        ))}
                        {techStack.length > 5 && (
                            <span className="badge badge-outline badge-sm font-mono opacity-60 py-2.5">+{techStack.length - 5}</span>
                        )}
                    </div>
                </div>
            </Link>

            {links.length > 0 && (
                <div className="p-4 pt-0 mt-auto border-t border-base-300/50 bg-base-200/50">
                    <div className="flex justify-end gap-2 pt-3">
                        {links.map((link, index) => {
                            const isPrivate = visibility === 'private';
                            return (
                                <a
                                    key={index}
                                    href={isPrivate ? undefined : link.url}
                                    target={isPrivate ? undefined : "_blank"}
                                    rel={isPrivate ? undefined : "noopener noreferrer"}
                                    className={`btn btn-xs btn-ghost gap-2 ${isPrivate ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
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
            )}
        </motion.div>
    );
}
