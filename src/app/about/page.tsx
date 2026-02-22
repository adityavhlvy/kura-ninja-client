import AboutView from "@/view/about/About";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About - Aditya Vahlevy Nugraha",
};

export default function AboutPage() {
    return <AboutView />;
}
