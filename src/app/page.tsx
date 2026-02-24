import HomeView from "@/view/home/Home";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Aditya Vahlevy Nugraha - Fullstack Developer",
  description: "Aditya Vahlevy Nugraha is a Fullstack Developer, Software Engineer, and Data Science Enthusiast based in Indonesia. Explore his projects and learn more about his work.",
  keywords: "Aditya Vahlevy Nugraha, Fullstack Developer, Software Engineer, Data Science, Project Manager, Project Management, Beasiswa APERTI BUMN 2021, Jakarta, Dumai, Riau, Indonesia, SMAN PLUS Provinsi Riau, Golang, Go Fiber, Fiber, React, Next.js, Python, Portfolio",
};

export default function HomePage() {
  return <HomeView />;
}
