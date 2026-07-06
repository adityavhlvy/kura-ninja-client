import { useParams, useNavigate, Link } from "react-router-dom";
import { projectsData } from "../../data/projects";
import {
  SlArrowLeft,
  SlGlobe,
  SlLock,
  SlCheck,
  SlLayers,
  SlRocket,
  SlBulb,
  SlChart,
} from "react-icons/sl";
import { VscGithub } from "react-icons/vsc";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PageTransition from "../../components/PageTransition";
import BackgroundEffects from "../../components/BackgroundEffects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!project) {
    navigate("/projects", { replace: true });
    return null;
  }

  const allImages =
    project.images && project.images.length > 0
      ? project.images
      : project.image
        ? [project.image]
        : [];

  const statusColors = {
    completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "in-progress": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    archived: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const isPrivate = project.visibility === "private";

  return (
    <PageTransition className="container mx-auto max-w-5xl px-6 pb-32 relative">
      <BackgroundEffects />

      {/* Back Button */}
      <div className="mb-8 pt-4 relative z-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm hover:bg-muted text-xs font-mono text-muted-foreground hover:text-foreground transition-colors border border-border/50 bg-card/30"
        >
          <SlArrowLeft size={10} />
          Back to Projects
        </Link>
      </div>

      {/* Header Section */}
      <div className="mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span
                className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm border ${statusColors[project.status]}`}
              >
                {project.status}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm border border-border/50 bg-muted/30 text-muted-foreground">
                {project.visibility === "public" ? (
                  <SlGlobe size={10} />
                ) : (
                  <SlLock size={10} />
                )}
                {project.visibility}
              </span>
              <span className="text-xs font-mono text-muted-foreground/60">
                {project.date}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {project.logo && (
                <img
                  src={project.logo}
                  alt={`${project.title} logo`}
                  className="w-12 h-12 md:w-14 md:h-14 object-contain rounded-sm border border-border/30 p-1 bg-card/50"
                />
              )}
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-foreground m-0">
                {project.title}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-3xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      {allImages.length > 0 && (
        <div className="mb-16 space-y-4 relative z-10">
          <div className="relative aspect-video rounded-sm overflow-hidden bg-card/30 border border-border/50">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImageIndex}
                src={allImages[activeImageIndex]}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full h-full object-cover"
                alt={`${project.title} preview ${activeImageIndex + 1}`}
              />
            </AnimatePresence>
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-28 aspect-video rounded-sm overflow-hidden transition-all duration-300 border ${
                    activeImageIndex === idx
                      ? "border-primary opacity-100 scale-102"
                      : "border-transparent opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={img}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-10">
        {/* Left Column: Extensive Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Rationale Section */}
          {project.rationale && (
            <section className="space-y-4">
              <h2 className="text-lg font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-foreground/90">
                <SlBulb className="text-primary" />
                Project Rationale
              </h2>
              <div className="p-6 rounded-sm bg-card/40 border border-border/50 leading-relaxed text-sm text-muted-foreground">
                {project.rationale}
              </div>
            </section>
          )}

          {/* Features / Highlights */}
          {project.details && project.details.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-foreground/90">
                <SlLayers className="text-primary" />
                Core Features
              </h2>
              <div className="grid gap-3">
                {project.details.map((detail, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-sm bg-card/20 hover:bg-card/40 transition-colors border border-border/50"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-none bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <SlCheck className="text-primary" size={10} />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed m-0">
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technical Challenges */}
          {project.technicalChallenges &&
            project.technicalChallenges.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-lg font-mono font-bold uppercase tracking-wider flex items-center gap-2.5 text-foreground/90">
                  <SlRocket className="text-primary" />
                  Technical Challenges
                </h2>
                <div className="space-y-4">
                  {project.technicalChallenges.map((challenge, index) => (
                    <div
                      key={index}
                      className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-primary before:rounded-none"
                    >
                      <p className="text-sm text-muted-foreground italic leading-relaxed">
                        &quot;{challenge}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
        </div>

        {/* Right Column: Meta & Stats */}
        <div className="space-y-8">
          {/* Readiness Stats */}
          {project.readiness && (
            <div className="bg-card/40 border border-border/50 rounded-sm overflow-hidden p-6 space-y-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 text-muted-foreground/80">
                <SlChart />
                Project Readiness
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Test Coverage", value: project.readiness.tests },
                  { label: "Documentation", value: project.readiness.docs },
                  {
                    label: "Performance / Quality",
                    value: project.readiness.quality,
                  },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-muted-foreground/85">
                        {stat.label}
                      </span>
                      <span className="text-primary font-bold">
                        {stat.value}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-muted/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        className="h-full bg-primary"
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          <div className="bg-card/40 border border-border/50 rounded-sm p-6 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground/80">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 rounded-sm border border-border/50 bg-muted/30 font-mono text-[10px] text-muted-foreground uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Competencies */}
          {project.competencies && project.competencies.length > 0 && (
            <div className="bg-card/40 border border-border/50 rounded-sm p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Key Competencies
              </h3>
              <ul className="space-y-2">
                {project.competencies.map((comp, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2.5 text-xs text-muted-foreground"
                  >
                    <div className="w-1.5 h-1.5 bg-primary shrink-0" />
                    <span className="font-medium">{comp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          {project.links.length > 0 && (
            <div className="space-y-2">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={isPrivate ? undefined : link.url}
                  target={isPrivate ? undefined : "_blank"}
                  rel={isPrivate ? undefined : "noopener noreferrer"}
                  className={`flex items-center justify-center gap-2.5 w-full py-2.5 px-4 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-all border ${
                    isPrivate
                      ? "border-border bg-muted/20 text-muted-foreground/40 cursor-not-allowed pointer-events-none"
                      : "border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary hover:border-primary/40"
                  }`}
                >
                  {link.icon ||
                    (link.url.includes("github") ? (
                      <VscGithub size={14} />
                    ) : (
                      <SlGlobe size={14} />
                    ))}
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {isPrivate && (
            <div className="p-4 border border-warning/10 bg-warning/5 rounded-sm flex gap-3 text-warning/80">
              <SlLock className="flex-shrink-0 mt-0.5 text-xs" />
              <p className="text-[11px] font-mono leading-relaxed m-0">
                This is a private project. Some links and internal technical
                artifacts may be restricted.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
