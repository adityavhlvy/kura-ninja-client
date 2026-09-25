import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiGraduationCapLight,
  PiBriefcaseLight,
  PiUsersThreeLight,
  PiTrophyLight,
  PiSparkleLight,
  PiRocketLight,
} from "react-icons/pi";
import journeyJson from "../data/journey.json";
import { playTick } from "@/lib/sound";

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

const nodesData = journeyJson.journey as JourneyNode[];

const typeConfig = {
  education: {
    label: "Education",
    icon: <PiGraduationCapLight size={14} />,
    badge: "bg-sky-500/10 text-sky-500 border-sky-500/30",
    dot: "bg-sky-500",
  },
  work: {
    label: "Enterprise Work",
    icon: <PiBriefcaseLight size={14} />,
    badge: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  org: {
    label: "Leadership & Orgs",
    icon: <PiUsersThreeLight size={14} />,
    badge: "bg-violet-500/10 text-violet-500 border-violet-500/30",
    dot: "bg-violet-500",
  },
  achievement: {
    label: "Achievements",
    icon: <PiTrophyLight size={14} />,
    badge: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    dot: "bg-amber-500",
  },
};

export default function JourneyMap() {
  const [selectedId, setSelectedId] = useState<string>("pupuk");
  const [filterType, setFilterType] = useState<string>("all");
  const detailRef = useRef<HTMLDivElement>(null);

  const filteredNodes = useMemo(() => {
    if (filterType === "all") return nodesData;
    return nodesData.filter((n) => n.type === filterType);
  }, [filterType]);

  const selectedNode =
    nodesData.find((n) => n.id === selectedId) || filteredNodes[0] || nodesData[0];

  useEffect(() => {
    if (window.innerWidth < 1024 && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedId]);

  return (
    <div className="space-y-6 select-none text-left">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-card border border-border/70 w-fit">
        <button
          type="button"
          onClick={() => {
            playTick();
            setFilterType("all");
          }}
          className={`px-3 py-1 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
            filterType === "all"
              ? "bg-primary text-primary-foreground font-bold"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          All Milestones ({nodesData.length})
        </button>

        {Object.entries(typeConfig).map(([type, cfg]) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              playTick();
              setFilterType(type);
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs transition-colors cursor-pointer ${
              filterType === type
                ? "bg-primary text-primary-foreground font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cfg.icon}
            <span>{cfg.label}</span>
          </button>
        ))}
      </div>

      {/* Grid: Interactive Rail + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Rail */}
        <div className="lg:col-span-5 relative space-y-1">
          {/* Vertical connecting rail */}
          <div className="absolute left-[19px] top-3 bottom-3 w-[2px] bg-border/50" />

          {filteredNodes.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            const cfg = typeConfig[node.type];
            const isCurrent = node.id === "pupuk";

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  playTick();
                  setSelectedId(node.id);
                }}
                className={`w-full flex items-center gap-3.5 p-2 rounded-2xl transition-all cursor-pointer text-left relative ${
                  isSelected
                    ? "bg-card border border-primary/40 shadow-xs"
                    : "hover:bg-muted/40 border border-transparent"
                }`}
              >
                {/* Node icon pill */}
                <div
                  className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border font-mono text-xs font-bold shrink-0 transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card text-muted-foreground border-border/80"
                  }`}
                >
                  {isCurrent ? (
                    <PiRocketLight size={15} />
                  ) : (
                    <span>{node.emoji}</span>
                  )}

                  {isCurrent && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  )}
                </div>

                {/* Node label */}
                <div className="flex-1 min-w-0 font-mono">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`text-xs font-bold truncate ${
                        isSelected ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {node.label}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60 shrink-0">
                      {node.year}
                    </span>
                  </div>
                  <span className="text-[11px] text-muted-foreground/80 truncate block">
                    {node.details.role}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Active Detail Card (Double-Bezel) */}
        <div ref={detailRef} className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="double-bezel"
              >
                <div className="double-bezel-inner p-6 md:p-8 space-y-6">
                  {/* Header info */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[9px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                          typeConfig[selectedNode.type].badge
                        }`}
                      >
                        {typeConfig[selectedNode.type].label}
                      </span>
                      <span className="font-mono text-xs text-muted-foreground">
                        {selectedNode.details.date}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
                      {selectedNode.details.role}
                    </h3>

                    {selectedNode.details.company && (
                      <p className="font-mono text-xs text-primary font-bold">
                        {selectedNode.details.company}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-foreground/85 leading-relaxed font-sans">
                    {selectedNode.details.description}
                  </p>

                  {/* Highlights / Impact Chips */}
                  {(selectedNode.details.highlight || selectedNode.details.impact) && (
                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                      {selectedNode.details.highlight && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary">
                          <PiSparkleLight size={13} />
                          <span className="font-bold">{selectedNode.details.highlight}</span>
                        </div>
                      )}
                      {selectedNode.details.impact && (
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border/70 text-muted-foreground">
                          <span>Impact: {selectedNode.details.impact}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Acquired Skills */}
                  {selectedNode.details.skills && selectedNode.details.skills.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-border/50">
                      <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">
                        Technologies & Domain Focus
                      </span>
                      <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                        {selectedNode.details.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2.5 py-0.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
