import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function SystemTelemetry() {
  const [cpuUsage, setCpuUsage] = useState(12);
  const [memoryUsage, setMemoryUsage] = useState(42);
  const [pulseSpeed, setPulseSpeed] = useState(0.85);
  const [latency, setLatency] = useState<number | null>(null);

  const [envInfo, setEnvInfo] = useState(() => {
    let defaultOS = "linux-x64";
    let defaultTimezone = "Asia/Jakarta";
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes("win")) defaultOS = "windows-x64";
      else if (ua.includes("mac")) defaultOS = "macos-x64";
      else if (ua.includes("linux")) defaultOS = "linux-x64";

      try {
        defaultTimezone =
          Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Jakarta";
      } catch (_) {}
    }

    return {
      os: defaultOS,
      runtime:
        typeof window !== "undefined" ? "Browser Client" : "NodeJS Server",
      timezone: defaultTimezone,
      dbEngine: "PostgreSQL 16",
    };
  });

  useEffect(() => {
    let isMounted = true;

    const fetchTelemetry = async () => {
      try {
        const start = performance.now();
        const response = await fetch("/api/telemetry");
        const end = performance.now();

        if (!response.ok) throw new Error("Telemetry API failed");
        const data = await response.json();

        if (isMounted) {
          setCpuUsage(data.cpuUsage);
          setMemoryUsage(data.memoryUsage);
          setPulseSpeed(data.pulseSpeed);
          setLatency(Math.round(end - start));
          setEnvInfo({
            os: data.os,
            runtime: data.runtime,
            timezone: data.timezone,
            dbEngine: data.dbEngine,
          });
        }
      } catch (err) {
        // Fallback: local emulation on error
        if (isMounted) {
          setCpuUsage((prev) => {
            const change = Math.floor(Math.random() * 5) - 2;
            const next = prev + change;
            return Math.max(5, Math.min(35, next));
          });
          setMemoryUsage((prev) => {
            const change =
              Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            const next = prev + change;
            return Math.max(40, Math.min(45, next));
          });
          setPulseSpeed(() =>
            parseFloat((Math.random() * 0.4 + 0.6).toFixed(2)),
          );
          setLatency(Math.floor(Math.random() * 15) + 15);
        }
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 5000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative bg-card/50 backdrop-blur-md border border-border/50 rounded-sm overflow-hidden w-full h-full hover:border-primary/20 transition-all duration-500 flex flex-col justify-between p-6">
      {/* Header telemetry info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <h2 className="text-sm font-mono font-bold uppercase tracking-widest text-muted-foreground">
            System Telemetry
          </h2>
        </div>
        <div className="text-[10px] font-mono text-muted-foreground/45 uppercase tracking-wider">
          status: normal // latency:{" "}
          {latency !== null ? `${latency}ms` : "checking..."}
        </div>
      </div>

      {/* Main bento split */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch flex-1">
        {/* Left: Active Project Focus */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <h3 className="text-xs font-mono text-muted-foreground/60 uppercase tracking-widest">
              Active Project Focus
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Primary production engineering pipelines and active repositories.
            </p>
          </div>

          <div className="space-y-2 flex-1 flex flex-col justify-center">
            {[
              {
                name: "AeGIS Module Atlas",
                logo: "/assets/aegis-atlas/logo/aegis-atlas-logo.webp",
                desc: "Geospatial command center for regional allocation.",
                tech: ["PostGIS", "OpenLayers"],
                status: "Active",
              },
              {
                name: "PINTER AI Platform",
                logo: "/assets/pinter/logo/small.png",
                desc: "Visual agent orchestration canvas & tools.",
                tech: ["React Flow", "Google ADK"],
                status: "Active",
              },
              {
                name: "NEXUS Logistics",
                logo: "/assets/nexus/logo/nexus-logo.svg",
                desc: "Maritime pathfinding & automated contract audits.",
                tech: ["FastAPI", "SQLAlchemy"],
                status: "Active",
              },
            ].map((proj) => (
              <div
                key={proj.name}
                className="flex gap-3 items-center bg-muted/15 p-2.5 border border-border/20 rounded-sm hover:border-primary/10 transition-colors"
              >
                <div className="w-10 h-10 relative bg-background/40 border border-border/30 p-1 flex items-center justify-center shrink-0 rounded-none">
                  <img
                    src={proj.logo}
                    alt={`${proj.name} Logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0 font-mono">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-bold text-foreground/90 uppercase tracking-tight truncate">
                      {proj.name}
                    </h4>
                    <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 py-0.2 uppercase font-semibold shrink-0">
                      {proj.status}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground truncate">
                    {proj.desc}
                  </p>
                  <div className="flex gap-1 pt-0.5">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[7px] bg-secondary/35 text-muted-foreground/80 px-1 border border-border/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Sandbox environment diagnostics */}
        <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-border/50 pt-4 md:pt-0 md:pl-6 flex flex-col justify-between space-y-4 font-mono">
          <div className="space-y-2">
            <h3 className="text-xs text-muted-foreground/60 uppercase tracking-widest">
              Host Environment
            </h3>
            <div className="space-y-1 text-[11px] text-muted-foreground">
              <div className="flex justify-between">
                <span>OS:</span>
                <span className="text-foreground/80">{envInfo.os}</span>
              </div>
              <div className="flex justify-between">
                <span>RUNTIME:</span>
                <span className="text-foreground/80">{envInfo.runtime}</span>
              </div>
              <div className="flex justify-between">
                <span>TZ:</span>
                <span className="text-foreground/80">{envInfo.timezone}</span>
              </div>
              <div className="flex justify-between">
                <span>DB ENG:</span>
                <span className="text-foreground/80">{envInfo.dbEngine}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>CPU LOADING</span>
                <span>{cpuUsage}%</span>
              </div>
              <div className="h-1 bg-muted/50">
                <div
                  className="h-full bg-secondary/80 transition-all duration-1000"
                  style={{ width: `${cpuUsage}%` }}
                />
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[10px] text-muted-foreground/60">
                <span>MEM TOTAL</span>
                <span>{memoryUsage}%</span>
              </div>
              <div className="h-1 bg-muted/50">
                <div
                  className="h-full bg-emerald-500/60 transition-all duration-1000"
                  style={{ width: `${memoryUsage}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer log entry */}
      <div className="border-t border-border/30 mt-6 pt-4 flex items-center justify-between text-[9px] font-mono text-muted-foreground/40">
        <span>sys_kernel: compiled successfully</span>
        <span>pulse: {pulseSpeed}Hz</span>
      </div>
    </div>
  );
}
