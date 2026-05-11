import { Routes, Route } from "react-router-dom";
import ClientLayout from "./app/ClientLayout";
import HomeView from "./view/home/Home";
import AboutView from "./view/about/About";
import ProjectsView from "./view/projects/Projects";
import ProjectDetailView from "./view/projects/ProjectDetail";
import CertificationsView from "./view/certifications/Certifications";
import PlaygroundView from "./view/playground/Playground";
import AntiUXView from "./view/playground/experiments/anti-ux/AntiUX";
import ScreamingVoidView from "./view/playground/experiments/screaming-void/ScreamingVoid";
import DesignSystemView from "./view/design-system/DesignSystem";

export default function App() {
  return (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/about" element={<AboutView />} />
        <Route path="/projects" element={<ProjectsView />} />
        <Route path="/projects/:slug" element={<ProjectDetailView />} />
        <Route path="/certifications" element={<CertificationsView />} />
        <Route path="/playground" element={<PlaygroundView />} />
        <Route path="/playground/anti-ux" element={<AntiUXView />} />
        <Route path="/playground/void" element={<ScreamingVoidView />} />
        <Route path="/design-system" element={<DesignSystemView />} />
      </Routes>
    </ClientLayout>
  );
}
