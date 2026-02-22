import CertificationsView from "@/view/certifications/Certifications";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Certifications - Aditya Vahlevy Nugraha",
};

export default function CertificationsPage() {
    return <CertificationsView />;
}
