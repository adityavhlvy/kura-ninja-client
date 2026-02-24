import ProjectDetailView from "@/view/projects/ProjectDetail";
import { Metadata } from 'next';
import { projectsData } from "@/data/projects";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const project = projectsData.find((p) => p.slug === params.slug);
    if (!project) return { title: 'Project Not Found' };

    return {
        title: `${project.title} | Projects by Aditya Vahlevy Nugraha`,
        description: project.description,
        keywords: `Aditya Vahlevy Nugraha, Project, ${project.title}, ${project.techStack.join(', ')}`,
        openGraph: {
            title: `${project.title} | Projects by Aditya Vahlevy Nugraha`,
            description: project.description,
            url: `https://kuraninja.vercel.app/projects/${project.slug}`,
            images: project.image ? [{ url: project.image.startsWith('http') ? project.image : `https://kuraninja.vercel.app${project.image}` }] : [],
        }
    };
}

export default function ProjectPage() {
    return <ProjectDetailView />;
}
