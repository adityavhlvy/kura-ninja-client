import DesignSystemView from "@/view/design-system/DesignSystem";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Design System - Aditya Vahlevy Nugraha",
};

export default function DesignSystemPage() {
    return <DesignSystemView />;
}
