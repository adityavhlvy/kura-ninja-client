import ProjectCard, { type ProjectCardProps } from "../../components/ProjectCard";
import { motion } from "framer-motion";

export const projectsData: ProjectCardProps[] = [
    {
        slug: "kura-ninja-client",
        title: "Kura Ninja Client",
        description: "A modern web client for Kura Ninja, built with React, Vite, and TailwindCSS. Features a VS Code-inspired interface with dynamic theming and file tree navigation.",
        techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "DaisyUI"],
        links: [
            { label: "GitHub", url: "https://github.com/username/kura-ninja-client" },
            { label: "Live Demo", url: "https://kura-ninja.com" }
        ],
        status: "in-progress",
        visibility: "public",
        image: "https://placehold.co/600x400/1e1e1e/ffffff?text=Kura+Ninja"
    },
    {
        slug: "geomap-dashboard",
        title: "Geomap Dashboard",
        description: "Interactive dashboard for visualizing geographical data. Includes region filtering, data aggregation, and dynamic map rendering.",
        techStack: ["Vue.js", "Leaflet", "Node.js", "PostgreSQL"],
        links: [
            { label: "Repository", url: "#" }
        ],
        status: "completed",
        visibility: "private",
        image: "https://placehold.co/600x400/2563eb/ffffff?text=Geomap"
    },
    {
        slug: "spotify-profile",
        title: "Spotify Profile",
        description: "GitHub profile README generator that integrates with Spotify to show currently playing music. Anime-themed design.",
        techStack: ["Python", "GitHub Actions", "Spotify API"],
        links: [
            { label: "GitHub", url: "https://github.com/username/spotify-profile" }
        ],
        status: "completed",
        visibility: "public",
        image: "https://placehold.co/600x400/1db954/ffffff?text=Spotify+Profile"
    },
    {
        slug: "legacy-system-migration",
        title: "Legacy System Migration",
        description: "Internal tool for migrating legacy database records to a new microservices architecture. Handled millions of records with zero downtime.",
        techStack: ["Go", "gRPC", "Docker", "Kubernetes"],
        links: [],
        status: "archived",
        visibility: "private",
        image: "https://placehold.co/600x400/dc2626/ffffff?text=Legacy+Migration"
    }
];

export default function Projects() {
    return (
        <div className="container mx-auto max-w-6xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Projects</h1>
                <p className="text-base-content/70">A collection of my work, experiments, and open source contributions.</p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
            >
                {projectsData.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </motion.div>
        </div>
    );
}
