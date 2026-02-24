import CertificationsView from "@/view/certifications/Certifications";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Certifications & Awards | Aditya Vahlevy Nugraha",
    description: "View the professional certifications and awards achieved by Aditya Vahlevy Nugraha in Project Management, AI, Data Science, and Software Engineering.",
    keywords: "Aditya Vahlevy Nugraha Certifications, Google Project Management, AI Essentials, Scrum, ITIL, Awards",
    alternates: {
        canonical: "https://kuraninja.vercel.app/certifications",
    },
};

export default function CertificationsPage() {
    return <CertificationsView />;
}
