import HomeView from "@/view/home/Home";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Aditya Vahlevy Nugraha - Kura Ninja | Portfolio & Projects",
};

export default function HomePage() {
  return <HomeView />;
}
