import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscSearch, VscClose } from "react-icons/vsc";
import ProjectCard, {
  type ProjectCardProps,
} from "../../components/ProjectCard";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";
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
      {/* Extended Background */}
      <BackgroundEffects />

      <div className="relative z-10">
        <PageHeader
          title="Projects & Systems"
          subtitle="projects.json"
          description={
            <>
              Production-grade geospatial platforms, autonomous multi-agent
              canvases, and fullstack architectures engineered with precision
              and verifiable telemetry.
            </>
          }
          accentColor="secondary"
        />

        {/* Command Center Toolbar */}
        <div className="mt-8 space-y-4">
          {/* Search Bar & Category Controls */}
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
            {/* Terminal Search Input */}
            <div className="relative flex-1 flex items-center bg-card/40 backdrop-blur-md border border-border/60 hover:border-border focus-within:border-primary/60 focus-within:ring-1 focus-within:ring-primary/20 rounded-xs px-3.5 py-2.5 transition-all shadow-xs">
              <VscSearch className="w-4 h-4 text-muted-foreground/60 mr-2.5 shrink-0" />
              <span className="text-primary/70 font-mono text-xs font-bold mr-2 select-none shrink-0">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='grep -i "project or tech stack..."'
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

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "font-mono text-xs px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 select-none",
                      isSelected
                        ? "bg-primary/15 text-primary border-primary/50 shadow-xs font-semibold"
                        : "bg-card/40 text-muted-foreground/80 border-border/40 hover:text-foreground hover:border-border/80 hover:bg-muted/30",
                    )}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Counter & Diagnostics Status Line */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono py-2 px-3 rounded-xs border border-border/40 bg-muted/20 text-muted-foreground/70">
            <div className="flex flex-wrap items-center gap-2">
              <span>
                status:{" "}
                <span className="text-emerald-400 font-semibold">
                  {filteredProjects.length > 0 ? "ready" : "idle"}
                </span>
              </span>
              <span className="text-muted-foreground/30">//</span>
              <span>
                matched:{" "}
                <span className="text-foreground font-semibold">
                  {filteredProjects.length}/{projectsData.length}
                </span>{" "}
                projects
              </span>
              <span className="text-muted-foreground/30">//</span>
              <span>
                filter:{" "}
                <span className="text-primary font-semibold">
                  [{selectedCategory}]
                </span>
              </span>
              {searchQuery.trim() && (
                <>
                  <span className="text-muted-foreground/30">//</span>
                  <span>
                    query:{" "}
                    <span className="text-primary font-semibold">
                      &quot;{searchQuery.trim()}&quot;
                    </span>
                  </span>
                </>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground/40 hidden md:inline">
              press{" "}
              <kbd className="px-1 py-0.5 rounded border border-border/50 bg-muted/40 text-foreground/70">
                /
              </kbd>{" "}
              to grep
            </span>
          </div>
        </div>

        {/* Projects Grid / Empty State */}
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-xs border border-border/60 bg-card/40 backdrop-blur-md p-6 md:p-8 font-mono max-w-xl mx-auto my-16 shadow-sm"
          >
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-border/40 text-xs text-muted-foreground/50">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="ml-2 font-mono text-[11px]">
                terminal &mdash; grep error: exit 1
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground font-mono">
                <span className="text-primary font-bold">$</span> grep -r &quot;
                {searchQuery.trim() || selectedCategory}&quot; ./projects
              </p>
              <p className="text-muted-foreground/80 font-mono text-xs md:text-sm">
                &gt; 0 matches found. Try refining search keywords or resetting
                filters.
              </p>
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="font-mono text-xs border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-xs cursor-pointer"
                >
                  [Reset Filters]
                </Button>
              </div>
            </div>
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
