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
const DesignSystemView = lazy(
  () => import("./view/design-system/DesignSystem"),
);
const ProductSpecView = lazy(() => import("./view/product-spec/ProductSpec"));

function TerminalBufferLoader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 font-mono select-none">
      <span className="text-xs text-muted-foreground tracking-widest animate-pulse">
        &gt; buffer loading...
      </span>
      <div className="w-24 h-[1px] bg-border relative overflow-hidden">
        <div className="w-full h-full bg-primary animate-pulse" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ClientLayout>
      <Suspense fallback={<TerminalBufferLoader />}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/about" element={<AboutView />} />
          <Route path="/projects" element={<ProjectsView />} />
          <Route path="/projects/:slug" element={<ProjectDetailView />} />
          <Route path="/certifications" element={<CertificationsView />} />
          <Route path="/contact" element={<ContactView />} />
          <Route path="/design-system" element={<DesignSystemView />} />
          <Route path="/product-spec" element={<ProductSpecView />} />
        </Routes>
      </Suspense>
    </ClientLayout>
  );
}
