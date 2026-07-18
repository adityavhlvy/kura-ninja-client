import { Link } from "react-router-dom";
import { SlRocket } from "react-icons/sl";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import PageTransition from "../../components/PageTransition";
import ProjectCard from "../../components/ProjectCard";
import { projectsData } from "../../data/projects";
import SpotifyNowPlaying from "../../components/SpotifyNowPlaying";
import BackgroundEffects from "../../components/BackgroundEffects";
import SpotlightCard from "../../components/SpotlightCard";
import SystemTelemetry from "../../components/SystemTelemetry";
import { Button } from "@/components/ui/button";
import { FiTerminal } from "react-icons/fi";
import profileJson from "../../data/profile.json";

export default function Home() {
  const featuredProjects = projectsData.filter((p) => p.featured);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Parallax: IDE window drifts up slightly as you scroll
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
      <BackgroundEffects />

      {/* Hero Section: scroll-aware parallax */}
      <section
        ref={heroRef}
        className="relative flex flex-col items-center justify-center min-h-[90vh] pt-20 pb-16 w-full overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="z-10 w-full max-w-7xl px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mx-auto"
        >
          {/* Left: Intro text: editorial style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="order-2 lg:order-1 lg:col-span-7 z-20"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[11px] font-mono font-bold uppercase tracking-[0.3em] text-primary/60 mb-4"
            >
              Fullstack Developer · PT Pupuk Indonesia (Persero)
            </motion.p>

            {/* Name: large, distinctive */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] leading-[0.9] mb-6"
            >
              <span className="block text-foreground">Aditya</span>
              <span className="block text-primary">Vahlevy N.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 text-pretty"
            >
              {profileJson.tagline}{" "}
              <span
                className="italic text-primary font-mono text-[0.9em] font-semibold cursor-help"
                title={profileJson.tagline_tooltip}
              >
                {profileJson.tagline_highlight}
              </span>{" "}
              {profileJson.tagline_suffix}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="px-5 py-2.5 bg-primary text-black rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
              >
                View Projects
              </Link>
              <Link
                to="/about"
                className="px-5 py-2.5 border border-border rounded-sm text-xs font-bold uppercase tracking-widest text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                About Me
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Photo as design element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Photo: editorial crop, diagonal mask */}
              <motion.div
                initial={{
                  opacity: 0,
                  clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                }}
                animate={{
                  opacity: 1,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
                transition={{
                  delay: 0.6,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-56 h-72 md:w-64 md:h-80 lg:w-72 lg:h-[24rem] overflow-hidden"
                style={{
                  clipPath: "polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/assets/profile.png"
                  alt="Aditya Vahlevy Nugraha"
                  className="w-full h-full object-cover object-top transition-all duration-1000 group-hover:scale-[1.03]"
                />
                {/* Gradient overlay: bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />
                {/* Subtle color tint */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>

              {/* Decorative frame lines */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Caption */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 left-0 right-0 text-center"
              >
                <span className="text-[9px] font-mono text-muted-foreground/40 tracking-[0.3em] uppercase">
                  Jakarta, ID
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>


      </section>

      {/* Music & Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-7xl px-6 lg:px-8 mb-24 mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-[1px] w-8 bg-primary/30" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">
            Live Status
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full items-stretch">
          {/* System Telemetry: dominant card */}
          <div className="lg:col-span-7 w-full h-full">
            <SystemTelemetry />
          </div>

          {/* Right column: Spotify + Quick Stats stacked */}
          <div className="lg:col-span-5 w-full flex flex-col gap-5 h-full">
            <SpotlightCard
              title="Now Playing"
              className="flex-1 border-primary/10"
            >
              <SpotifyNowPlaying />
            </SpotlightCard>

            {/* Compact stats row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="p-2.5 sm:p-4 bg-card/50 rounded-sm border border-border/50 hover:border-primary/30 transition-colors text-center group">
                <div className="text-xl sm:text-2xl font-black text-primary mb-0.5 group-hover:scale-105 transition-transform">
                  {projectsData.length}+
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-muted-foreground">
                  Projects
                </div>
              </div>
              <div className="p-2.5 sm:p-4 bg-card/50 rounded-sm border border-border/50 hover:border-primary/30 transition-colors text-center group">
                <div className="text-xl sm:text-2xl font-black text-primary mb-0.5 font-mono group-hover:scale-105 transition-transform">
                  20+
                </div>
                <div className="text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-muted-foreground">
                  Badges
                </div>
              </div>
              <div className="p-2.5 sm:p-4 bg-card/50 rounded-sm border border-border/50 flex items-center justify-center text-center">
                <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground/40 uppercase">
                  ⌘K
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Projects */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-3"
            >
              <div className="h-[1px] w-8 bg-primary/30" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-muted-foreground">
                Selected Work
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black tracking-[-0.03em]"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-3 text-lg max-w-md leading-relaxed"
            >
              Handcrafted with humility and mild confusion.
            </motion.p>
          </div>
          <Button
            variant="ghost"
            asChild
            className="gap-2 group hover:bg-primary/10 hover:text-primary transition-colors border border-transparent hover:border-primary/20"
          >
            <Link to="/projects">
              View All{" "}
              <SlRocket
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </Button>
        </div>

        {/* Featured project: first one large, rest in grid */}
        {featuredProjects.length > 0 && (
          <div className="space-y-8">
            {/* Hero project: full width */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <FeaturedHeroCard project={featuredProjects[0]} />
            </motion.div>

            {/* Remaining projects in grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.slice(1).map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Collab CTA Section */}
      <section className="container mx-auto max-w-6xl px-6 lg:px-8 pb-24">
        <div className="bg-card/30 border border-border rounded-sm p-8 md:p-12 text-center space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-[1px] w-8 bg-primary/30" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary/70">
                Quest Inquiries
              </span>
              <div className="h-[1px] w-8 bg-primary/30" />
            </div>

            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.03em] leading-tight">
              Ready to initialize a new collaboration?
            </h2>

            <p className="text-muted-foreground text-md md:text-lg leading-relaxed text-pretty">
              Whether you want to recruit full-time talent, consult on a
              geospatial GIS module, or wire up stateful multi-agent canvases:
              dispatch a quest spec today.
            </p>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-primary/90 transition-all hover:shadow-[0_0_15px_rgba(240,160,48,0.35)]"
              >
                <FiTerminal className="text-sm" />
                <span>Initialize Quest Compiler</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

/* ─── Featured Hero Card (full-width variant) ─── */

function FeaturedHeroCard({ project }: { project: (typeof projectsData)[0] }) {
  const displayImage =
    project.image ||
    (project.images && project.images.length > 0
      ? project.images[0]
      : undefined);

  return (
    <Link to={`/projects/${project.slug}`} className="block group">
      <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/40 rounded-sm overflow-hidden transition-all duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          {displayImage && (
            <div className="h-64 lg:h-80 overflow-hidden relative">
              <img
                src={displayImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/80 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent lg:hidden" />
            </div>
          )}

          {/* Content */}
          <div className="p-8 lg:p-10 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-primary/60">
                {project.date}
              </span>
              <span className="text-muted-foreground/30">·</span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                {project.status}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-black tracking-tight mb-3 group-hover:text-primary transition-colors">
              {project.title}
            </h3>

            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.slice(0, 6).map((tech, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono uppercase px-2 py-0.5 bg-muted/50 border border-border/50 text-muted-foreground group-hover:text-primary/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 6 && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  +{project.techStack.length - 6}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
