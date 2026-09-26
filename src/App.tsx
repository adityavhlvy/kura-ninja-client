import { lazy, Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { CommandMenu } from "./components/CommandMenu";
import { ease } from "./components/Reveal";
import Home from "./pages/Home";

const Work = lazy(() => import("./pages/Work"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const About = lazy(() => import("./pages/About"));
const Credentials = lazy(() => import("./pages/Credentials"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed top-2 left-2 z-[60] -translate-y-20 bg-sea px-4 py-2 text-sm text-on-sea focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header onOpenCommand={() => setCommandOpen(true)} />
      <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />

      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease }}
          className="min-h-dvh"
        >
          <Suspense fallback={<div className="min-h-dvh" aria-busy="true" />}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Work />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Credentials />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />
    </MotionConfig>
  );
}
