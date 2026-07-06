import { Routes, Route } from "react-router-dom";
import ClientLayout from "./app/ClientLayout";
import HomeView from "./view/home/Home";
import AboutView from "./view/about/About";
import ProjectsView from "./view/projects/Projects";
import ProjectDetailView from "./view/projects/ProjectDetail";
import CertificationsView from "./view/certifications/Certifications";
import ContactView from "./view/contact/Contact";

export default function App() {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/projects/:slug" element={<ProjectDetailView />} />
        <Route path="/certifications" element={<CertificationsView />} />
        <Route path="/contact" element={<ContactView />} />
      </Routes>
    </ClientLayout>
  );
}
