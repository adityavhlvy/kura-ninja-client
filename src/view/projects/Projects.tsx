import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscSearch, VscClose } from "react-icons/vsc";
import ProjectCard, {
  type ProjectCardProps,
} from "../../components/ProjectCard";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { projectsData } from "../../data/projects";

const CATEGORIES = [
  "All",
  "Geospatial & GIS",
  "AI & Agents",
  "Fullstack Web",
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
    case "Fullstack Web":
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

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    inputRef.current?.focus();
  };

  return (
    <PageTransition className="container mx-auto max-w-6xl p-6 relative min-h-screen">
      <div className="relative z-10">
        <PageHeader
          title="Projects & Systems"
          subtitle="work"
          description={
            <>
              Geospatial platforms, autonomous multi-agent canvases, and
              fullstack architectures — with the reasoning and tradeoffs behind
              each one.
            </>
          }
          accentColor="secondary"
        />

        {/* Search & category filters */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Search input */}
            <div className="relative flex-1 flex items-center bg-card/40 backdrop-blur-md border border-border/60 hover:border-border focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/20 rounded-xs px-3.5 py-2.5 transition-all">
              <VscSearch className="w-4 h-4 text-muted-foreground/60 mr-2.5 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech stack…"
                className="w-full bg-transparent text-sm font-mono text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
                spellCheck={false}
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    inputRef.current?.focus();
                  }}
                  className="p-1 text-muted-foreground/60 hover:text-foreground transition-colors cursor-pointer shrink-0"
                  aria-label="Clear search"
                >
                  <VscClose className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground/50 bg-muted/40 border border-border/50 rounded pointer-events-none select-none shrink-0">
                  /
                </kbd>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "font-mono text-xs px-3 py-1.5 rounded-xs border transition-colors cursor-pointer select-none",
                      isSelected
                        ? "bg-primary/15 text-primary border-primary/50 font-semibold"
                        : "bg-card/40 text-muted-foreground/80 border-border/40 hover:text-foreground hover:border-border/80 hover:bg-muted/30",
                    )}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="text-xs font-mono text-muted-foreground/70">
            {filteredProjects.length} of {projectsData.length} projects
          </p>
        </div>

        {/* Grid / empty state */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xs border border-border/60 bg-card/40 backdrop-blur-md p-8 font-mono max-w-xl mx-auto my-16 text-center space-y-4"
          >
            <p className="text-sm text-muted-foreground">
              No projects match {"\u201c"}
              {searchQuery.trim() || selectedCategory}{"\u201d"}.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="font-mono text-xs border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-xs cursor-pointer"
            >
              Reset filters
            </Button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.slug}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
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
