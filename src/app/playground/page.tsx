import PlaygroundView from "@/view/playground/Playground";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Playground - Aditya Vahlevy Nugraha",
};

export default function PlaygroundPage() {
    return <PlaygroundView />;
}
