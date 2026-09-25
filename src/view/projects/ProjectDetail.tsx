import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiArrowLeftLight,
  PiGlobeSimpleLight,
  PiLockKeyLight,
  PiCheckCircleFill,
  PiStackLight,
  PiLightbulbLight,
  PiArrowsClockwiseLight,
  PiGitCommitLight,
  PiChartBarLight,
  PiFileTextLight,
} from "react-icons/pi";
import { SiGithub } from "react-icons/si";
import { projectsData } from "../../data/projects";
import PageTransition from "../../components/PageTransition";
import LightboxModal from "../../components/motion/LightboxModal";
import { playTick } from "@/lib/sound";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState<"overview" | "problemDiff" | "benchmarks" | "decisions">("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

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

  const statusBadge =
    project.status === "completed" || project.status === "active"
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
      : "bg-primary/10 text-primary border-primary/30";

  const isPrivate = project.visibility === "private";

  // Data casting for extended fields in projects.yml
  const extProject = project as unknown as {
    fiveWOneH?: Record<string, string>;
    problemChangeResult?: Array<{ problem: string; change: string; result: string }>;
    beforeAfter?: Array<{ measure: string; before: string; after: string; evidence?: string }>;
    keyDecisions?: Array<{ decision: string; explanation: string }>;
    evidenceCommits?: string[];
    caseStudy?: string;
  };

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        {/* Top Back Navigation */}
        <div className="pt-2">
          <Link
            to="/projects"
            onClick={() => playTick()}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border/70 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
          >
            <PiArrowLeftLight size={13} />
            <span>Back to Projects Catalog</span>
          </Link>
        </div>

        {/* Hero Title & Metadata Header */}
        <div className="space-y-4 pb-6 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${statusBadge}`}
            >
              {project.status}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-card border border-border/70 text-muted-foreground flex items-center gap-1">
              {isPrivate ? <PiLockKeyLight size={10} /> : <PiGlobeSimpleLight size={10} />}
              <span>{project.visibility}</span>
            </span>
            <span className="text-xs font-mono text-muted-foreground/70">
              {project.date}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {project.logo && (
              <img
                src={project.logo}
                alt=""
                className="w-12 h-12 object-contain rounded-2xl p-1 bg-card border border-border/70 shrink-0 shadow-sm"
              />
            )}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
                {project.title}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl">
            {project.description}
          </p>
        </div>

        {/* Gallery Carousel & Lightbox Preview */}
        {allImages.length > 0 && (
          <div className="space-y-3">
            <div
              onClick={() => {
                playTick();
                setIsLightboxOpen(true);
              }}
              role="button"
              tabIndex={0}
              className="double-bezel aspect-[16/9] w-full cursor-pointer group"
            >
              <div className="double-bezel-inner h-full w-full overflow-hidden relative bg-muted/40">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={allImages[activeImageIndex]}
                    alt={`${project.title} preview`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </AnimatePresence>

                <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-md">
                  <PiArrowsClockwiseLight size={13} />
                  <span>Click to Inspect Screenshot ({activeImageIndex + 1}/{allImages.length})</span>
                </div>
              </div>
            </div>

            {/* Thumbnail Row */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      playTick();
                      setActiveImageIndex(idx);
                    }}
                    className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-primary opacity-100 scale-102 shadow-xs"
                        : "border-border/60 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Structure: Tabs + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Case Study Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Tab navigation pills */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-card border border-border/70">
              <button
                type="button"
                onClick={() => {
                  playTick();
                  setActiveTab("overview");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <PiFileTextLight size={14} />
                <span>Overview & 5W1H</span>
              </button>

              {extProject.problemChangeResult && extProject.problemChangeResult.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playTick();
                    setActiveTab("problemDiff");
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "problemDiff"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PiLightbulbLight size={14} />
                  <span>Problem - Result Diffs</span>
                </button>
              )}

              {extProject.beforeAfter && extProject.beforeAfter.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playTick();
                    setActiveTab("benchmarks");
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "benchmarks"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PiChartBarLight size={14} />
                  <span>Before & After</span>
                </button>
              )}

              {extProject.keyDecisions && extProject.keyDecisions.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    playTick();
                    setActiveTab("decisions");
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "decisions"
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <PiStackLight size={14} />
                  <span>Key Decisions</span>
                </button>
              )}
            </div>

            {/* Tab 1: Overview & 5W1H */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Executive Case Study */}
                {extProject.caseStudy && (
                  <div className="double-bezel">
                    <div className="double-bezel-inner p-6 space-y-3">
                      <h2 className="text-base font-mono uppercase tracking-wider font-bold text-foreground">
                        Executive Case Study
                      </h2>
                      <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                        {extProject.caseStudy}
                      </p>
                    </div>
                  </div>
                )}

                {/* 5W1H Matrix */}
                {extProject.fiveWOneH && (
                  <div className="double-bezel">
                    <div className="double-bezel-inner p-6 space-y-4">
                      <h2 className="text-base font-mono uppercase tracking-wider font-bold text-foreground">
                        5W1H Architectural Profile
                      </h2>
                      <div className="grid gap-3 font-mono text-xs">
                        {Object.entries(extProject.fiveWOneH).map(([key, val]) => (
                          <div key={key} className="p-3 rounded-xl bg-card border border-border/50 space-y-1">
                            <span className="text-[10px] font-bold uppercase text-primary tracking-widest block">
                              {key}:
                            </span>
                            <span className="text-foreground/90 font-sans leading-relaxed block">
                              {val}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Core Features & Highlights */}
                {project.details && project.details.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-base font-mono uppercase tracking-wider font-bold text-foreground">
                      Core Implementation Highlights
                    </h2>
                    <div className="space-y-2.5">
                      {project.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-card border border-border/60"
                        >
                          <PiCheckCircleFill className="text-primary mt-0.5 shrink-0" size={15} />
                          <p className="text-xs text-foreground/80 leading-relaxed font-sans">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Problem - Change - Result */}
            {activeTab === "problemDiff" && extProject.problemChangeResult && (
              <div className="space-y-4">
                {extProject.problemChangeResult.map((item, idx) => (
                  <div key={idx} className="double-bezel">
                    <div className="double-bezel-inner p-6 space-y-3 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          Problem:
                        </span>
                        <p className="font-sans leading-relaxed text-foreground/90">
                          {item.problem}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          Architectural Change:
                        </span>
                        <p className="font-sans leading-relaxed text-foreground/90">
                          {item.change}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider block">
                          Measured Result:
                        </span>
                        <p className="font-sans leading-relaxed text-foreground/90">
                          {item.result}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Before & After Benchmarks */}
            {activeTab === "benchmarks" && extProject.beforeAfter && (
              <div className="double-bezel">
                <div className="double-bezel-inner p-6 space-y-4 font-mono text-xs">
                  <h2 className="text-base uppercase tracking-wider font-bold text-foreground">
                    Empirical Before & After Metrics
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-border/80 text-[10px] text-muted-foreground uppercase">
                          <th className="py-2.5 pr-4">Measure</th>
                          <th className="py-2.5 px-4 text-destructive/80">Before</th>
                          <th className="py-2.5 px-4 text-emerald-500">After</th>
                          <th className="py-2.5 pl-4 text-muted-foreground/70">Evidence Ref</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {extProject.beforeAfter.map((row, idx) => (
                          <tr key={idx} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3 pr-4 font-bold text-foreground">{row.measure}</td>
                            <td className="py-3 px-4 text-muted-foreground">{row.before}</td>
                            <td className="py-3 px-4 font-bold text-emerald-500">{row.after}</td>
                            <td className="py-3 pl-4 text-[11px] text-muted-foreground/60 truncate max-w-[160px]">
                              {row.evidence || "Verified in code"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Key Decisions */}
            {activeTab === "decisions" && extProject.keyDecisions && (
              <div className="space-y-4">
                {extProject.keyDecisions.map((d, idx) => (
                  <div key={idx} className="double-bezel">
                    <div className="double-bezel-inner p-6 space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                        Decision #{idx + 1}
                      </span>
                      <h3 className="text-base font-bold text-foreground">
                        {d.decision}
                      </h3>
                      <p className="text-sm text-foreground/80 leading-relaxed font-sans">
                        {d.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Meta Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack Box */}
            <div className="double-bezel">
              <div className="double-bezel-inner p-5 space-y-3 font-mono">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                  Tech Stack Arsenal
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2.5 py-1 rounded-md bg-muted/70 border border-border/60 text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Competencies Box */}
            {project.competencies && project.competencies.length > 0 && (
              <div className="double-bezel">
                <div className="double-bezel-inner p-5 space-y-3 font-mono">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-primary block">
                    Engineering Competencies
                  </span>
                  <div className="space-y-2">
                    {project.competencies.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-foreground/85">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{comp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Git Evidence Commits */}
            {extProject.evidenceCommits && extProject.evidenceCommits.length > 0 && (
              <div className="double-bezel">
                <div className="double-bezel-inner p-5 space-y-3 font-mono">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
                    <PiGitCommitLight size={14} className="text-primary" />
                    <span>Evidence Commits</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {extProject.evidenceCommits.map((cmt, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/50"
                      >
                        {cmt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* External Links */}
            {project.links && project.links.length > 0 && (
              <div className="space-y-2">
                {project.links.map((link, idx) => (
                  <a
                    key={idx}
                    href={isPrivate ? undefined : link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playTick()}
                    className="btn-pill w-full justify-center bg-card border border-border/70 hover:border-primary text-foreground text-xs"
                  >
                    <SiGithub size={14} />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            )}

            {isPrivate && (
              <div className="p-4 rounded-xl border border-warning/20 bg-warning/5 text-warning/90 space-y-1 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 font-bold">
                  <PiLockKeyLight size={13} />
                  <span>Enterprise Private System</span>
                </div>
                <p className="text-muted-foreground text-[10px] leading-relaxed">
                  Source code and internal endpoints are restricted under enterprise governance at PT Pupuk Indonesia (Persero).
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        <LightboxModal
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={allImages}
          initialIndex={activeImageIndex}
          title={project.title}
        />
      </div>
    </PageTransition>
  );
}
