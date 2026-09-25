import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiArrowUpRightBold,
  PiTerminalWindowLight,
  PiSparkleLight,
  PiStackLight,
  PiEnvelopeLight,
} from "react-icons/pi";
import HeroPortrait from "../../components/home/HeroPortrait";
import FlagshipShowcase from "../../components/home/FlagshipShowcase";
import InteractiveTerminal from "../../components/home/InteractiveTerminal";
import ProjectCard from "../../components/ProjectCard";
import PageTransition from "../../components/PageTransition";
import { projectsData } from "../../data/projects";
import profileJson from "../../data/profile.json";
import { playTick, playPop } from "@/lib/sound";

export default function Home() {
  const [philosophyMode, setPhilosophyMode] = useState<"reality" | "ninja">("reality");

  // Secondary projects for preview grid
  const supportingProjects = projectsData.filter(
    (p) => !["pinter", "aegis-atlas", "nexus"].includes(p.slug)
  ).slice(0, 3);

  const togglePhilosophy = () => {
    playPop();
    setPhilosophyMode((prev) => (prev === "reality" ? "ninja" : "reality"));
  };

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">
        {/* ===================================================================
            HERO SECTION
            =================================================================== */}
        <section className="min-h-[82dvh] flex flex-col justify-center pt-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>Software & AI Engineer @ PT Pupuk Indonesia</span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[0.95]">
                  <span>Aditya</span>{" "}
                  <span className="text-primary block sm:inline">Vahlevy Nugraha</span>
                </h1>
                <p className="font-mono text-xs text-muted-foreground/80 tracking-wide uppercase">
                  Alias: <span className="text-foreground font-semibold">Kura Ninja</span> • AI Orchestration & Geospatial Systems
                </p>
              </div>

              {/* Interactive Philosophy vs Reality Box */}
              <div className="p-4 rounded-2xl bg-card border border-border/70 space-y-2 relative overflow-hidden shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                    {philosophyMode === "reality" ? "Engineering Focus" : "Kura Ninja Motto"}
                  </span>
                  <button
                    type="button"
                    onClick={togglePhilosophy}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-primary hover:underline cursor-pointer"
                  >
                    <PiSparkleLight size={12} />
                    <span>Switch to {philosophyMode === "reality" ? "Vibe" : "Reality"}</span>
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  {philosophyMode === "reality" ? (
                    <motion.p
                      key="reality"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm md:text-base text-foreground/90 leading-relaxed font-sans"
                    >
                      Architecting enterprise multi-agent AI platforms with Google ADK, high-density geospatial dashboards across 34 Indonesian provinces, and graph-based logistics pathfinding systems.
                    </motion.p>
                  ) : (
                    <motion.p
                      key="ninja"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="text-sm md:text-base font-serif-accent text-primary leading-relaxed"
                    >
                      &quot;{profileJson.philosophy.quote}&quot; {profileJson.philosophy.vibe_quote}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#flagship-showcase"
                  onClick={() => playTick()}
                  className="btn-pill bg-primary text-primary-foreground hover:opacity-95"
                >
                  <span>Explore Flagship Systems</span>
                  <span className="btn-pill-icon">
                    <PiArrowUpRightBold size={12} />
                  </span>
                </a>

                <Link
                  to="/about"
                  onClick={() => playTick()}
                  className="btn-pill bg-card border border-border/80 text-foreground hover:border-primary/50"
                >
                  <span>Career Journey & Skills</span>
                </Link>
              </div>
            </div>

            {/* Right: Portrait Presentation */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <HeroPortrait />
            </div>
          </div>

          {/* Telemetry Matrix Strip */}
          <div className="mt-16 pt-8 border-t border-border/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-3.5 rounded-xl bg-card/60 border border-border/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                AeGIS Coverage
              </span>
              <span className="text-xl font-mono font-black text-foreground block">
                34 Provinces
              </span>
              <span className="text-[11px] text-muted-foreground/80 block truncate">
                National demand maps
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card/60 border border-border/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                NEXUS Arca Hub
              </span>
              <span className="text-xl font-mono font-black text-foreground block">
                122 Warehouses
              </span>
              <span className="text-[11px] text-muted-foreground/80 block truncate">
                Fertilizer inventory balance
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card/60 border border-border/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                PINTER Jev Router
              </span>
              <span className="text-xl font-mono font-black text-primary block">
                ~150ms
              </span>
              <span className="text-[11px] text-muted-foreground/80 block truncate">
                Query intent classification
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card/60 border border-border/50">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                Formula Engine
              </span>
              <span className="text-xl font-mono font-black text-foreground block">
                52 Unit Tests
              </span>
              <span className="text-[11px] text-muted-foreground/80 block truncate">
                FDM calculation validation
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-card/60 border border-border/50 col-span-2 sm:col-span-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block">
                Deep Learning Model
              </span>
              <span className="text-xl font-mono font-black text-foreground block">
                R² = 0.8337
              </span>
              <span className="text-[11px] text-muted-foreground/80 block truncate">
                Sentinel-2 yield prediction
              </span>
            </div>
          </div>
        </section>

        {/* ===================================================================
            FLAGSHIP ENTERPRISE SHOWCASE SECTION
            =================================================================== */}
        <section id="flagship-showcase" className="space-y-8 scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase font-bold tracking-widest text-primary">
                <PiStackLight size={14} />
                <span>Enterprise Engineering Portfolio</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Flagship Systems & Architecture
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Explore the mission-critical platforms engineered for PT Pupuk Indonesia (Persero) with live simulation sandboxes and architectural telemetry.
              </p>
            </div>

            <Link
              to="/projects"
              onClick={() => playTick()}
              className="inline-flex items-center gap-1.5 text-xs font-mono text-primary font-bold hover:underline"
            >
              <span>View All Projects</span>
              <PiArrowUpRightBold size={11} />
            </Link>
          </div>

          <FlagshipShowcase />
        </section>

        {/* ===================================================================
            SUPPORTING INNOVATIONS / PROJECTS GRID
            =================================================================== */}
        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-primary block">
                Specialized Creations
              </span>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                Other Engineering Deliveries
              </h2>
            </div>
            <Link
              to="/projects"
              onClick={() => playTick()}
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              Catalog ({projectsData.length}) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingProjects.map((p) => (
              <ProjectCard key={p.slug} {...p} />
            ))}
          </div>
        </section>

        {/* ===================================================================
            DEVELOPER TERMINAL CONSOLE
            =================================================================== */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-left">
            <PiTerminalWindowLight size={16} className="text-primary" />
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-foreground">
              Developer Shell & Interactive CLI
            </h2>
          </div>
          <InteractiveTerminal />
        </section>

        {/* ===================================================================
            BOTTOM COLLABORATION CTA
            =================================================================== */}
        <section className="double-bezel">
          <div className="double-bezel-inner p-8 md:p-12 text-center space-y-6">
            <div className="max-w-xl mx-auto space-y-3">
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                Ready for High-Impact Engineering
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Let&apos;s Build Resilient Systems Together
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Available for enterprise systems architecture, multi-agent AI orchestration, and geospatial software engineering inquiries.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/contact"
                onClick={() => playTick()}
                className="btn-pill bg-primary text-primary-foreground hover:opacity-95"
              >
                <PiEnvelopeLight size={15} />
                <span>Initiate Contact</span>
                <span className="btn-pill-icon">
                  <PiArrowUpRightBold size={12} />
                </span>
              </Link>
              <a
                href={`mailto:${profileJson.contact.email}`}
                onClick={() => playTick()}
                className="btn-pill bg-card border border-border/80 text-foreground hover:border-primary/50"
              >
                <span>{profileJson.contact.email}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
