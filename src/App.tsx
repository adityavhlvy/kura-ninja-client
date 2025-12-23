import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./view/home/Home";
import About from "./view/about/About";
import Projects from "./view/projects/Projects";
import ProjectDetail from "./view/projects/ProjectDetail";
import Certifications from "./view/certifications/Certifications";

import DesignSystem from "./view/design-system/DesignSystem";
// Changed to lazy imports
const Playground = lazy(() => import("./view/playground/Playground"));
const AntiUX = lazy(
  () => import("./view/playground/experiments/anti-ux/AntiUX")
);
const ScreamingVoid = lazy(
  () => import("./view/playground/experiments/screaming-void/ScreamingVoid")
); // Added lazy import for ScreamingVoid

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        {" "}
        {/* Added Suspense for lazy loaded components */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="certifications" element={<Certifications />} />
            <Route path="about" element={<About />} />
            <Route path="design-system" element={<DesignSystem />} />
            <Route path="playground" element={<Playground />} />
            <Route path="playground/anti-ux" element={<AntiUX />} />
            <Route path="playground/void" element={<ScreamingVoid />} />{" "}
            {/* Added new route */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
