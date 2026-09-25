import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiMagnifyingGlassLight,
  PiXLight,
  PiFolderOpenLight,
  PiFadersHorizontalLight,
} from "react-icons/pi";
import ProjectCard, {
  type ProjectCardProps,
} from "../../components/ProjectCard";
import PageTransition from "../../components/PageTransition";
import { projectsData } from "../../data/projects";
import { playTick } from "@/lib/sound";

const CATEGORIES = [
  "All",
  "Geospatial & GIS",
  "AI & Agents",
  "Enterprise Fullstack",
  "ML & Analytics",
] as const;

type Category = (typeof CATEGORIES)[number];

function matchesCategory(
  project: ProjectCardProps,
  category: Category,
): boolean {
  if (category === "All") return true;

  const targetText = [
    project.title,
    project.description,
    ...(project.techStack || []),
    ...(project.competencies || []),
  ]
    .join(" ")
    .toLowerCase();

  switch (category) {
    case "Geospatial & GIS":
      return /\b(geospatial|gis|spatial|postgis|openlayers|satellite|geotiff|gdal|earth engine|sentinel|cartographic|vector tile)\b/i.test(
        targetText,
      );
    case "AI & Agents":
      return /\b(agent|agents|llm|mcp|ai|adk|sam3|gpt|qdrant|litellm|geomind|rag)\b/i.test(
        targetText,
      );
    case "Enterprise Fullstack":
      return /\b(react|vue|next\.?js|vite|fastapi|fiber|express|fullstack|full-stack|web|frontend|backend|api|dashboard|router|tailwind)\b/i.test(
        targetText,
      );
    case "ML & Analytics":
      return /\b(ml|machine learning|analytics|analysis|forecast|forecasting|prediction|predict|pytorch|tensorflow|scikit|lightgbm|xgboost|lstm|gru|tensorboard|opencv|segmentation)\b/i.test(
        targetText,
      );
    default:
      return true;
  }
}

function matchesSearch(project: ProjectCardProps, query: string): boolean {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return true;

  const searchableText = [
    project.title,
    project.description,
    project.slug,
    ...(project.techStack || []),
    ...(project.competencies || []),
    ...(project.details || []),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedQuery);
}

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        const activeTag = document.activeElement?.tagName.toLowerCase();
        if (
          activeTag === "input" ||
          activeTag === "textarea" ||
          (document.activeElement as HTMLElement)?.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      } else if (
        e.key === "Escape" &&
        document.activeElement === inputRef.current
      ) {
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(
      (project) =>
        matchesCategory(project, selectedCategory) &&
        matchesSearch(project, searchQuery),
    );
  }, [selectedCategory, searchQuery]);

  return (
    <PageTransition>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
            <PiFolderOpenLight size={14} />
            <span>Systems Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Projects & Systems Architecture
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Production-grade geospatial intelligence platforms, visual AI agent orchestration graphs, and resilient fullstack backends with architectural rationales.
          </p>
        </div>

        {/* Controls: Search and Categories */}
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 flex items-center bg-card border border-border/80 rounded-2xl px-4 py-2.5 shadow-xs focus-within:border-primary/60 transition-colors">
              <PiMagnifyingGlassLight size={16} className="text-muted-foreground mr-2.5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search platforms, tech stack, or problem statements..."
                className="w-full bg-transparent text-xs sm:text-sm font-mono text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
                spellCheck={false}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                  aria-label="Clear search"
                >
                  <PiXLight size={14} />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/60 bg-muted/60 border border-border/60 rounded">
                  /
                </kbd>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      playTick();
                      setSelectedCategory(cat);
                    }}
                    className={`font-mono text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary text-primary-foreground font-bold border-primary shadow-xs"
                        : "bg-card/70 text-muted-foreground border-border/70 hover:text-foreground hover:border-primary/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
            <span>
              Showing {filteredProjects.length} of {projectsData.length} systems
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="text-primary hover:underline cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="double-bezel max-w-md mx-auto my-12">
            <div className="double-bezel-inner p-8 text-center space-y-4">
              <PiFadersHorizontalLight size={32} className="mx-auto text-muted-foreground/60" />
              <p className="text-sm font-mono text-muted-foreground">
                No systems match your filter criteria.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="btn-pill bg-primary text-primary-foreground text-xs"
              >
                Reset Search Filters
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <ProjectCard {...project} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
