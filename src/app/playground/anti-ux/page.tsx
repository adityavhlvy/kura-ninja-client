import AntiUXView from "@/view/playground/experiments/anti-ux/AntiUX";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Anti-UX Experiment",
};

export default function AntiUXPage() {
    return <AntiUXView />;
}
