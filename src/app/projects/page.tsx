import ProjectsView from "@/view/projects/Projects";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects - Aditya Vahlevy Nugraha",
};

export default function ProjectsPage() {
    return <ProjectsView />;
}
