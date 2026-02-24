import ProjectsView from "@/view/projects/Projects";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Projects by Aditya Vahlevy Nugraha | Web Dev, AI & ML Portfolio",
    description: "Explore the portfolio of Aditya Vahlevy Nugraha. Featuring projects in Fullstack Web Development (Next.js, Go, React) and Machine Learning (Deep Learning, NLP).",
    keywords: "Aditya Vahlevy Nugraha Projects, Portfolio, Web Development, Machine Learning, AI, Software Engineering, Case Studies",
    alternates: {
        canonical: "https://kuraninja.vercel.app/projects",
    },
};

export default function ProjectsPage() {
    return <ProjectsView />;
}
