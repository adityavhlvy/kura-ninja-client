import AboutView from "@/view/about/About";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Aditya Vahlevy Nugraha | Software Engineer & Data Scientist",
    description: "Learn more about Aditya Vahlevy Nugraha (Kura Ninja). A Fullstack Developer and Data Science enthusiast with experience in Machine Learning, Web Development, and Project Management.",
    keywords: "Aditya Vahlevy Nugraha, Kura Ninja, About Me, Software Engineer, Data Scientist, Resume, Experience, Education",
    alternates: {
        canonical: "https://kuraninja.vercel.app/about",
    },
};

export default function AboutPage() {
    return <AboutView />;
}
