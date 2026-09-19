import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ClientLayout from "./app/ClientLayout";

const HomeView = lazy(() => import("./view/home/Home"));
const AboutView = lazy(() => import("./view/about/About"));
const ProjectsView = lazy(() => import("./view/projects/Projects"));
const ProjectDetailView = lazy(() => import("./view/projects/ProjectDetail"));
const CertificationsView = lazy(
  () => import("./view/certifications/Certifications"),
);
const ContactView = lazy(() => import("./view/contact/Contact"));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center min-h-[50vh] font-mono text-xs text-muted-foreground">
      loading…
    </div>
  );
}

export default function App() {
  return (
    <ClientLayout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="/projects/:slug" element={<ProjectDetailView />} />
          <Route path="/certifications" element={<CertificationsView />} />
          <Route path="/contact" element={<ContactView />} />
        </Routes>
      </Suspense>
    </ClientLayout>
  );
}