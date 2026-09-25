import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  PiArrowUpRightBold,
  PiCheckCircleFill,
  PiPlayBold,
  PiCpuLight,
  PiMapTrifoldLight,
  PiTruckLight,
  PiArrowsClockwiseLight,
  PiGraphLight,
  PiSlidersLight,
  PiShieldCheckLight,
} from "react-icons/pi";
import { playTick, playChime } from "@/lib/sound";
import LightboxModal from "../motion/LightboxModal";

interface FlagshipShowcaseProps {
  onOpenLightbox?: (image: string, title: string) => void;
}

export default function FlagshipShowcase({}: FlagshipShowcaseProps) {
  const [activeSystem, setActiveSystem] = useState<"pinter" | "aegis" | "nexus">("pinter");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState("");

  // PINTER Simulator state
  const [agentPattern, setAgentPattern] = useState<"llm" | "sequential" | "parallel" | "loop">("sequential");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [simMetrics, setSimMetrics] = useState<{ latency: number; confidence: number; routedTo: string } | null>(null);

  // AeGIS Simulator state
  const [landArea, setLandArea] = useState(2500); // hectares
  const [ureaDosage, setUreaDosage] = useState(200); // kg/ha
  const [npkDosage, setNpkDosage] = useState(300); // kg/ha

  // NEXUS Simulator state
  const [selectedRoute, setSelectedRoute] = useState<"sumatra" | "java" | "kalimantan">("sumatra");

  // Run PINTER agent simulation
  const runAgentSimulation = () => {
    playTick();
    setIsSimulating(true);
    setSimLogs([]);
    setSimMetrics(null);

    const steps = [
      "Inbound query received: 'Analyze Q3 Urea supply deficit in North Sumatra'",
      "Evaluating query intent via TypeSafe Jev System One...",
      "Classification intent: 'geospatial_inventory_audit' • Confidence: 0.94",
      `Executing ADK ${agentPattern.toUpperCase()} graph pipeline...`,
      "MCP Server 'PostGIS-Gateway' invoked: spatial query on 122 facilities",
      "Buffered SSE event stream dispatched to UI client (100% loss-free)",
      "Synthesis complete: Regional buffer deficit reconciled",
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step]);
        if (idx === steps.length - 1) {
          setIsSimulating(false);
          setSimMetrics({
            latency: 148,
            confidence: 0.94,
            routedTo: "Tier-1 Agronomic Reasoning Model",
          });
          playChime();
        }
      }, (idx + 1) * 280);
    });
  };

  const systems = {
    pinter: {
      slug: "pinter",
      title: "PINTER AI Agent Platform",
      tagline: "Autonomous Multi-Agent Canvas & TypeSafe Jev Smart Router",
      org: "PT Pupuk Indonesia (Persero)",
      tech: ["Google ADK", "FastAPI", "React 19", "React Flow", "Qdrant", "PostgreSQL", "TypeSafe AI"],
      image: "/assets/pinter/galleries/pinter-agent-builder-canvas.png",
      gallery: [
        "/assets/pinter/galleries/pinter-agent-builder-canvas.png",
        "/assets/pinter/galleries/pinter-home.png",
        "/assets/pinter/galleries/pinter-chat.png",
        "/assets/pinter/galleries/pinter-mcp-servers.png",
      ],
      metrics: [
        { label: "Intent Latency", value: "~150ms", note: "TypeSafe Jev evaluation" },
        { label: "Graph Patterns", value: "4 Types", note: "LLM, Sequential, Parallel, Loop" },
        { label: "Execution Stream", value: "Buffered SSE", note: "Batch flushing without ORM lag" },
        { label: "Security Layer", value: "IDENTIK SSO", note: "AES-256 encrypted credential vaults" },
      ],
      problem: "Enterprise queries were uniformly directed to expensive frontier models, leading to inflated token costs and slow triage times.",
      change: "Engineered TypeSafe Jev (System One) smart routing client with 0.65 confidence threshold fallback, coupled with an interactive React Flow canvas.",
      result: "Instant intent evaluation in ~150ms, with visual workflow orchestration and live execution tracing across all agent nodes.",
    },
    aegis: {
      slug: "aegis-atlas",
      title: "AeGIS Module Atlas",
      tagline: "Geospatial Demand Planning & Vector Tile Architecture",
      org: "PT Pupuk Indonesia (Persero)",
      tech: ["React 19", "Go Fiber v3", "OpenLayers", "MapLibre GL", "PostGIS", "Martin Tile Server", "Turborepo"],
      image: "/assets/aegis-atlas/galleries/aegis-atlas-fertilizer-demand-map.png",
      gallery: [
        "/assets/aegis-atlas/galleries/aegis-atlas-fertilizer-demand-map.png",
        "/assets/aegis-atlas/galleries/aegis-atlas-fertilizer-demand-map-analyze.png",
        "/assets/aegis-atlas/galleries/aegis-atlas-home.png",
        "/assets/aegis-atlas/galleries/aegis-atlas-fertilizer-demand-map-with-geomind-chatbot.png",
      ],
      metrics: [
        { label: "National Reach", value: "34 Provinces", note: "From province down to districts" },
        { label: "Calculation Engine", value: "52 Unit Tests", note: "Zero-roundtrip client FDM formula" },
        { label: "Tile Proxy Payload", value: "1MB Cap", note: "Dual Basic/HMAC token caching" },
        { label: "AI Integration", value: "GeoMind Workspace", note: "Streaming SSE bidirectional map filter" },
      ],
      problem: "Planning agricultural fertilizer distribution across 34 provinces depended on fragmented spreadsheets and slow server calculation cycles.",
      change: "Constructed client-side Fertilizer Demand Model (FDM) calculation engine with 52 unit tests, paired with a Go Fiber v3 tile proxy with dual-token caching.",
      result: "Zero-latency interactive scenario diff calculations and secure vector tile streaming across nationwide administrative boundaries.",
    },
    nexus: {
      slug: "nexus",
      title: "NEXUS (Arca, Delta & Vista)",
      tagline: "Enterprise Logistics Orchestration & Neo4j Pathfinding",
      org: "PT Pupuk Indonesia (Persero)",
      tech: ["React 19", "FastAPI", "Neo4j Cypher", "Glide Data Grid", "OpenLayers", "SQLAlchemy", "Rsbuild"],
      image: "/assets/nexus/galleries/nexus-vista-home.png",
      gallery: [
        "/assets/nexus/galleries/nexus-vista-home.png",
        "/assets/nexus/galleries/nexus-delta-manajemen-kontrak.png",
        "/assets/nexus/galleries/nexus-home.png",
        "/assets/nexus/galleries/nexus-delta-home.png",
      ],
      metrics: [
        { label: "Inventory Hub", value: "122 Facilities", note: "Arca warehouse balance tracking" },
        { label: "Pathfinding", value: "Neo4j Cypher", note: "Multi-hop maritime and land corridors" },
        { label: "Data Performance", value: "60 FPS Virtualized", note: "Glide Data Grid contract matrices" },
        { label: "Architecture", value: "Multi-Entry", note: "Single-Repo compile-time switches" },
      ],
      problem: "Bulk fertilizer transport across island networks involved manual freight tariff reconciliations and unoptimized multi-stop shipping estimates.",
      change: "Engineered Delta contract audit tables using virtualized Glide Data Grid and implemented Neo4j Cypher graph traversal for multi-hop transit corridors.",
      result: "Automated tariff anomaly detection against active carrier contracts and visual route simulation with contract-aware cost calculation.",
    },
  };

  const current = systems[activeSystem];

  return (
    <div className="space-y-8 select-none">
      {/* System Switcher Navigation Pill */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-card/90 border border-border/80 backdrop-blur-xl shadow-lg">
          <button
            type="button"
            onClick={() => {
              playTick();
              setActiveSystem("pinter");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-tight transition-all duration-300 cursor-pointer ${
              activeSystem === "pinter"
                ? "bg-primary text-primary-foreground font-bold shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PiCpuLight size={15} />
            <span>PINTER AI Platform</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTick();
              setActiveSystem("aegis");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-tight transition-all duration-300 cursor-pointer ${
              activeSystem === "aegis"
                ? "bg-primary text-primary-foreground font-bold shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PiMapTrifoldLight size={15} />
            <span>AeGIS Module Atlas</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playTick();
              setActiveSystem("nexus");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs tracking-tight transition-all duration-300 cursor-pointer ${
              activeSystem === "nexus"
                ? "bg-primary text-primary-foreground font-bold shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <PiTruckLight size={15} />
            <span>NEXUS Logistics</span>
          </button>
        </div>
      </div>

      {/* Main Flagship Card: Double-Bezel Architecture */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSystem}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="double-bezel"
        >
          <div className="double-bezel-inner p-6 md:p-8 space-y-8">
            {/* Header info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border/50">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-widest text-primary px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                    Flagship System
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {current.org}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                  {current.title}
                </h3>
                <p className="text-sm text-muted-foreground font-mono">
                  {current.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/projects/${current.slug}`}
                  onClick={() => playTick()}
                  className="btn-pill bg-primary text-primary-foreground hover:opacity-95"
                >
                  <span>Explore Case Study</span>
                  <span className="btn-pill-icon">
                    <PiArrowUpRightBold size={12} />
                  </span>
                </Link>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {current.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-card border border-border/60 space-y-1"
                >
                  <span className="text-[10px] font-mono text-muted-foreground block uppercase tracking-wider">
                    {m.label}
                  </span>
                  <span className="text-lg md:text-xl font-mono font-black text-foreground block">
                    {m.value}
                  </span>
                  <span className="text-[11px] text-muted-foreground/80 block leading-tight">
                    {m.note}
                  </span>
                </div>
              ))}
            </div>

            {/* Visual Media & Simulator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Gallery & Inspection */}
              <div className="lg:col-span-6 space-y-3">
                <div
                  onClick={() => {
                    playTick();
                    setLightboxImage(current.image);
                    setLightboxTitle(current.title);
                  }}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden bg-muted border border-border/80 cursor-pointer shadow-md"
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-mono text-white bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-2">
                      <PiArrowsClockwiseLight size={14} /> Click to Inspect Screenshot
                    </span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-4 gap-2">
                  {current.gallery.map((thumb, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        playTick();
                        setLightboxImage(thumb);
                        setLightboxTitle(`${current.title} • Screen ${idx + 1}`);
                      }}
                      className="aspect-[16/10] rounded-lg overflow-hidden border border-border/70 hover:border-primary transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    >
                      <img src={thumb} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {current.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/60 border border-border/50 text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Interactive Live Simulation Box */}
              <div className="lg:col-span-6 rounded-2xl bg-card border border-border/80 p-5 space-y-5 shadow-inner">
                {activeSystem === "pinter" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <PiGraphLight className="text-primary" size={18} />
                        <span className="font-mono text-xs font-bold text-foreground">
                          PINTER Live Agent Canvas Simulator
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        Google ADK Engine
                      </span>
                    </div>

                    {/* Pattern Selector */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-1.5">
                        Select Google ADK Graph Pattern
                      </span>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(["sequential", "parallel", "loop", "llm"] as const).map((pat) => (
                          <button
                            key={pat}
                            type="button"
                            onClick={() => {
                              playTick();
                              setAgentPattern(pat);
                            }}
                            className={`py-1.5 px-2 rounded-lg text-center font-mono text-[11px] font-semibold transition-colors cursor-pointer border ${
                              agentPattern === pat
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {pat.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Action Trigger */}
                    <button
                      type="button"
                      disabled={isSimulating}
                      onClick={runAgentSimulation}
                      className="w-full py-2.5 px-4 rounded-xl bg-primary text-primary-foreground font-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer hover:opacity-90 disabled:opacity-50 transition-opacity"
                    >
                      {isSimulating ? (
                        <>
                          <PiArrowsClockwiseLight className="animate-spin" size={15} />
                          <span>Evaluating Graph & SSE Stream...</span>
                        </>
                      ) : (
                        <>
                          <PiPlayBold size={13} />
                          <span>Simulate Query Dispatch & Jev Routing</span>
                        </>
                      )}
                    </button>

                    {/* Simulation Terminal Stream */}
                    <div className="rounded-xl bg-black/60 p-3 font-mono text-[11px] space-y-1.5 min-h-[140px] max-h-[160px] overflow-y-auto text-foreground/80 border border-white/5">
                      <div className="text-[10px] text-muted-foreground/60 border-b border-white/10 pb-1 flex justify-between">
                        <span>SSE Event Stream Log</span>
                        <span className="text-emerald-400">STATUS: READY</span>
                      </div>
                      {simLogs.length === 0 && !isSimulating && (
                        <p className="text-muted-foreground/60 italic pt-2">
                          Click &quot;Simulate Query Dispatch&quot; to trace how TypeSafe Jev evaluates query intent in ~150ms and dispatches to specialized agent nodes.
                        </p>
                      )}
                      {simLogs.map((log, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-start gap-1.5 text-emerald-400/90"
                        >
                          <span className="text-muted-foreground/40 select-none">›</span>
                          <span>{log}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Metrics Banner */}
                    {simMetrics && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-[11px] font-mono"
                      >
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <PiCheckCircleFill size={14} />
                          Routed: {simMetrics.routedTo}
                        </span>
                        <span className="text-foreground/80">
                          {simMetrics.latency}ms • {Math.round(simMetrics.confidence * 100)}% conf
                        </span>
                      </motion.div>
                    )}
                  </div>
                )}

                {activeSystem === "aegis" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <PiSlidersLight className="text-primary" size={18} />
                        <span className="font-mono text-xs font-bold text-foreground">
                          Fertilizer Demand Model (FDM) Calculator
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        52 Verified Unit Tests
                      </span>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-3 font-mono text-xs">
                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>Target Agricultural Land:</span>
                          <span className="text-foreground font-bold">{landArea.toLocaleString()} ha</span>
                        </div>
                        <input
                          type="range"
                          min={500}
                          max={10000}
                          step={250}
                          value={landArea}
                          onChange={(e) => setLandArea(Number(e.target.value))}
                          className="w-full accent-primary cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>Urea Dosage:</span>
                          <span className="text-foreground font-bold">{ureaDosage} kg/ha</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={500}
                          step={25}
                          value={ureaDosage}
                          onChange={(e) => setUreaDosage(Number(e.target.value))}
                          className="w-full accent-primary cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-muted-foreground mb-1">
                          <span>NPK Dosage:</span>
                          <span className="text-foreground font-bold">{npkDosage} kg/ha</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={600}
                          step={25}
                          value={npkDosage}
                          onChange={(e) => setNpkDosage(Number(e.target.value))}
                          className="w-full accent-primary cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Instant Calculated Diffs */}
                    <div className="p-3 rounded-xl bg-card border border-border/60 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-muted-foreground block tracking-wider">
                        Client-side Demand Output (Zero Server Roundtrip)
                      </span>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <span className="text-[10px] font-mono text-primary block">UREA DEMAND</span>
                          <span className="text-base font-mono font-black text-foreground">
                            {((landArea * ureaDosage) / 1000).toFixed(1)} MT
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-secondary/10 border border-secondary/20">
                          <span className="text-[10px] font-mono text-secondary block">NPK DEMAND</span>
                          <span className="text-base font-mono font-black text-foreground">
                            {((landArea * npkDosage) / 1000).toFixed(1)} MT
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSystem === "nexus" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <PiShieldCheckLight className="text-primary" size={18} />
                        <span className="font-mono text-xs font-bold text-foreground">
                          NEXUS Multi-Hop Route Simulator
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        Neo4j Cypher Traversal
                      </span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                        Select Distribution Corridor
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {(["sumatra", "java", "kalimantan"] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => {
                              playTick();
                              setSelectedRoute(r);
                            }}
                            className={`py-1.5 px-2 rounded-lg text-center font-mono text-[11px] font-semibold uppercase cursor-pointer border ${
                              selectedRoute === r
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted/40 border-border/60 text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Route Details Card */}
                    <div className="p-3.5 rounded-xl bg-card border border-border/60 space-y-2 font-mono text-xs">
                      {selectedRoute === "sumatra" && (
                        <>
                          <div className="flex justify-between items-center text-foreground font-bold">
                            <span>Belawan Port → Medan Hub → Deli Serdang</span>
                            <span className="text-emerald-500 text-[11px]">OPTIMAL</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Multi-hop maritime + road freight corridor evaluated against carrier agreement contract #TRF-2026-04.
                          </p>
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40 text-muted-foreground">
                            <span>Transit Distance: 94 km</span>
                            <span className="font-bold text-foreground">Tariff Audit: Verified</span>
                          </div>
                        </>
                      )}

                      {selectedRoute === "java" && (
                        <>
                          <div className="flex justify-between items-center text-foreground font-bold">
                            <span>Tanjung Perak → Gresik Plant → Madiun</span>
                            <span className="text-emerald-500 text-[11px]">OPTIMAL</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Rail and heavy truck corridor synchronizing bulk vessel discharge with local warehouse buffer.
                          </p>
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40 text-muted-foreground">
                            <span>Transit Distance: 182 km</span>
                            <span className="font-bold text-foreground">Tariff Audit: Verified</span>
                          </div>
                        </>
                      )}

                      {selectedRoute === "kalimantan" && (
                        <>
                          <div className="flex justify-between items-center text-foreground font-bold">
                            <span>Balikpapan Port → Samarinda Hub → Kutai</span>
                            <span className="text-emerald-500 text-[11px]">OPTIMAL</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground">
                            Inter-island barge transit and river logistics corridor for inland palm oil plantation delivery.
                          </p>
                          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40 text-muted-foreground">
                            <span>Transit Distance: 245 km</span>
                            <span className="font-bold text-foreground">Tariff Audit: Verified</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Problem - Change - Result diff summary */}
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-1.5 text-xs font-mono">
                  <div className="text-[10px] uppercase font-bold text-primary tracking-wider">
                    Engineering Impact Diff
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-[11px]">
                    <strong className="text-primary font-bold">Problem:</strong> {current.problem}
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-[11px]">
                    <strong className="text-foreground font-bold">Result:</strong> {current.result}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <LightboxModal
          isOpen={Boolean(lightboxImage)}
          onClose={() => setLightboxImage(null)}
          images={[lightboxImage]}
          title={lightboxTitle}
        />
      )}
    </div>
  );
}
