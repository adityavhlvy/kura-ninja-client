import ScreamingVoidView from "@/view/playground/experiments/screaming-void/ScreamingVoid";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Screaming Void Experiment",
};

export default function ScreamingVoidPage() {
    return <ScreamingVoidView />;
}
