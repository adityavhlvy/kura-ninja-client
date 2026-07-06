"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface JourneyNode {
  id: string;
  label: string;
  type: "education" | "work" | "org" | "achievement";
  year: string;
  emoji: string;
  details: {
    role: string;
    company?: string;
    date: string;
    description: string;
    skills: string[];
    highlight?: string;
    impact?: string;
  };
}

const nodesData: JourneyNode[] = [
  {
    id: "sma",
    label: "SMA Plus Riau",
    type: "education",
    year: "2018",
    emoji: "🎓",
    details: {
      role: "Science Major",
      date: "2018 – 2021",
      description:
        "High School Diploma, Science & Technology focus. GPA 85.60/100. First encounter with programming and computational thinking.",
      skills: ["Physics", "Mathematics", "Logic", "Basic Programming"],
      highlight: "First code written",
      impact: "Foundation",
    },
  },
  {
    id: "it_mpk",
    label: "Head of IT",
    type: "org",
    year: "2019",
    emoji: "💻",
    details: {
      role: "Head of Technology & Information",
      company: "MPK SMA Plus Riau",
      date: "Jul 2019 – Jul 2020",
      description:
        "Managed student council digital assets. Directed tech initiatives and created digital visuals for school events.",
      skills: ["Leadership", "Event Management", "Design", "Team Coordination"],
      highlight: "First tech leadership",
      impact: "Led digital transformation",
    },
  },
  {
    id: "uni",
    label: "Univ. Pertamina",
    type: "education",
    year: "2021",
    emoji: "🏫",
    details: {
      role: "Computer Science",
      company: "Universitas Pertamina",
      date: "2021 – 2025",
      description:
        "Bachelor of CS, GPA 3.58 (Cum Laude). APERTI BUMN Scholarship awardee. Thesis: LLM-driven microservices migration analysis.",
      skills: [
        "Algorithms",
        "Software Architecture",
        "AI/ML",
        "Clean Code",
        "Research",
      ],
      highlight: "Cum Laude · Scholarship",
      impact: "4 years of grinding",
    },
  },
  {
    id: "creative",
    label: "Head Creative",
    type: "org",
    year: "2023",
    emoji: "🎨",
    details: {
      role: "Head of Media Creative",
      company: "Hima-IF UP",
      date: "Feb – Nov 2023",
      description:
        "Directed creative team designing visual identity for CS student association. Oversaw 50+ design projects across events and campaigns.",
      skills: [
        "Creative Direction",
        "Adobe Suite",
        "Visual Identity",
        "Brand Design",
      ],
      highlight: "50+ projects shipped",
      impact: "Built design culture",
    },
  },
  {
    id: "samsung",
    label: "Samsung Campus",
    type: "achievement",
    year: "2023",
    emoji: "🏆",
    details: {
      role: "SIC Batch 5",
      company: "Samsung Innovation Campus",
      date: "Mar – Sep 2023",
      description:
        "Intensive program covering Machine Learning and IoT. Built innovative project combining sensor data with predictive models.",
      skills: [
        "IoT",
        "Machine Learning",
        "Python",
        "Sensors",
        "Edge Computing",
      ],
      highlight: "ML × IoT convergence",
      impact: "Industry exposure",
    },
  },
  {
    id: "vp_hima",
    label: "Vice President",
    type: "org",
    year: "2024",
    emoji: "👥",
    details: {
      role: "Vice President",
      company: "Hima-IF UP",
      date: "Jan – Dec 2024",
      description:
        "Co-led 100+ member CS Student Association. Managed organizational strategy, event pipelines, and inter-org relations.",
      skills: [
        "Strategic Planning",
        "Conflict Resolution",
        "Project Management",
        "Public Speaking",
      ],
      highlight: "Led 100+ members",
      impact: "Organizational scale",
    },
  },
  {
    id: "astra",
    label: "Astra Otoparts",
    type: "work",
    year: "2024",
    emoji: "🏭",
    details: {
      role: "IT Intern (PPC)",
      company: "PT Astra Otoparts Tbk",
      date: "Sep – Dec 2024",
      description:
        "Engineered 3 full-stack dashboards for Production Planning & Control. Digitized rejection tracking system, reducing manual data errors by 95%.",
      skills: [
        "ASP.NET",
        "VB.NET",
        "Oracle DB",
        "Fullstack",
        "Manufacturing IT",
      ],
      highlight: "95% error reduction",
      impact: "Real production impact",
    },
  },
  {
    id: "research",
    label: "Research Asst",
    type: "work",
    year: "2025",
    emoji: "🛰️",
    details: {
      role: "Research Assistant",
      company: "Universitas Pertamina",
      date: "Jul – Oct 2025",
      description:
        "Built predictive model for rice yields using Sentinel-2 satellite imagery and temporal BPS data. Achieved R² = 0.8337 with LightGBM + Optuna.",
      skills: [
        "Google Earth Engine",
        "Sentinel-2",
        "LightGBM",
        "Deep Learning",
        "Geospatial",
      ],
      highlight: "R² = 0.8337",
      impact: "Published research",
    },
  },
  {
    id: "pupuk",
    label: "Pupuk Indonesia",
    type: "work",
    year: "Now",
    emoji: "🚀",
    details: {
      role: "Fullstack Developer",
      company: "PT Pupuk Indonesia (Persero)",
      date: "Oct 2025 – Present",
      description:
        "Engineering AeGIS (Module Atlas) geospatial dashboard, PINTER AI agent orchestration platform with visual canvas, and NEXUS (Module Delta & Vista) logistics & pathfinding platform.",
      skills: [
        "React 19",
        "Go Fiber",
        "FastAPI",
        "Google ADK",
        "React Flow",
        "OpenLayers",
        "PostGIS",
        "Docker",
      ],
      highlight: "Current quest",
      impact: "Enterprise scale",
    },
  },
];

const typeColors = {
  education: {
    dot: "bg-sky-500",
    text: "text-sky-500",
    ring: "ring-sky-500/30",
    glow: "shadow-sky-500/20",
  },
  work: {
    dot: "bg-emerald-500",
    text: "text-emerald-500",
    ring: "ring-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  org: {
    dot: "bg-violet-500",
    text: "text-violet-500",
    ring: "ring-violet-500/30",
    glow: "shadow-violet-500/20",
  },
  achievement: {
    dot: "bg-amber-500",
    text: "text-amber-500",
    ring: "ring-amber-500/30",
    glow: "shadow-amber-500/20",
  },
};

export default function JourneyMap() {
  const [selectedId, setSelectedId] = useState<string>("pupuk");
  const selectedNode = nodesData.find((n) => n.id === selectedId);
  const selectedIndex = nodesData.findIndex((n) => n.id === selectedId);

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground mb-6">
        {Object.entries(typeColors).map(([type, style]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${style.dot}`} />
            <span>{type}</span>
          </div>
        ))}
      </div>

      {/* Timeline + Detail as unified block */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6">
        {/* Left: Timeline nodes */}
        <div className="lg:col-span-5 relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-border/40" />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[19px] md:left-[23px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-primary via-primary/40 to-transparent origin-top"
          />

          {/* Nodes */}
          <div className="relative space-y-0">
            {nodesData.map((node, index) => {
              const isSelected = selectedId === node.id;
              const style = typeColors[node.type];
              const isLast = index === nodesData.length - 1;

              return (
                <motion.button
                  key={node.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                  onClick={() => setSelectedId(node.id)}
                  className={`w-full text-left flex items-center gap-3 md:gap-4 py-2.5 px-1 rounded-sm transition-all duration-200 group relative ${
                    isSelected ? "bg-primary/5" : "hover:bg-foreground/[0.02]"
                  }`}
                >
                  {/* Dot */}
                  <div
                    className={`relative z-10 shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isSelected
                        ? `border-current ${style.text} bg-card ring-4 ${style.ring} shadow-lg ${style.glow}`
                        : "border-border bg-card text-muted-foreground group-hover:border-foreground/20"
                    }`}
                  >
                    <span
                      className={`transition-all duration-200 ${isSelected ? "text-base md:text-lg" : "text-xs md:text-sm"}`}
                    >
                      {isSelected ? node.emoji : node.emoji}
                    </span>

                    {isLast && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${style.dot} opacity-0`}
                        animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-bold truncate transition-colors ${
                          isSelected
                            ? "text-foreground"
                            : "text-foreground/60 group-hover:text-foreground/80"
                        }`}
                      >
                        {node.label}
                      </span>
                      <span
                        className={`text-[9px] font-mono shrink-0 px-1.5 py-0.5 rounded-sm ${
                          isSelected
                            ? `${style.dot} text-white`
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {node.year}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] truncate block transition-colors ${
                        isSelected
                          ? "text-muted-foreground"
                          : "text-muted-foreground/50"
                      }`}
                    >
                      {node.details.role}
                    </span>
                  </div>

                  {/* Selected indicator */}
                  {isSelected && (
                    <motion.div
                      layoutId="timeline-indicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-l-full hidden lg:block"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail panel — sticky, always visible */}
        <div className="lg:col-span-7 mt-6 lg:mt-0">
          <div className="lg:sticky lg:top-20">
            <AnimatePresence mode="wait">
              {selectedNode && (
                <motion.div
                  key={selectedNode.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative bg-card/80 backdrop-blur-md border border-border/50 rounded-sm overflow-hidden"
                >
                  {/* Accent bar */}
                  <div className={`h-1 ${typeColors[selectedNode.type].dot}`} />

                  <div className="p-5 md:p-7 space-y-5">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full ${typeColors[selectedNode.type].dot} flex items-center justify-center text-xl shrink-0`}
                      >
                        {selectedNode.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg md:text-xl font-black tracking-tight text-foreground leading-tight">
                          {selectedNode.details.role}
                        </h3>
                        {selectedNode.details.company && (
                          <p className="text-sm text-primary font-medium mt-0.5">
                            {selectedNode.details.company}
                          </p>
                        )}
                        <p className="text-[11px] font-mono text-muted-foreground mt-1">
                          {selectedNode.details.date}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {selectedNode.details.description}
                    </p>

                    {/* Stats row */}
                    {(selectedNode.details.highlight ||
                      selectedNode.details.impact) && (
                      <div className="flex flex-wrap gap-3">
                        {selectedNode.details.highlight && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span className="text-[11px] font-mono font-bold text-primary">
                              {selectedNode.details.highlight}
                            </span>
                          </div>
                        )}
                        {selectedNode.details.impact && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border/50 rounded-sm">
                            <span className="text-[11px] font-mono text-muted-foreground">
                              {selectedNode.details.impact}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skills */}
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-muted-foreground mb-2.5">
                        Tech & Skills
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedNode.details.skills.map((skill, idx) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="px-2.5 py-1 text-[10px] font-mono bg-muted border border-border/50 rounded-sm text-foreground/70 hover:text-primary hover:border-primary/30 transition-colors cursor-default"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-1 pt-2">
                      {nodesData.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedId(nodesData[i].id)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            i === selectedIndex
                              ? `w-6 ${typeColors[selectedNode.type].dot}`
                              : i < selectedIndex
                                ? "w-2 bg-primary/30"
                                : "w-2 bg-border"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-[9px] font-mono text-muted-foreground">
                        {selectedIndex + 1}/{nodesData.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
