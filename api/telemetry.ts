import type { VercelRequest, VercelResponse } from "@vercel/node";
import os from "os";
import fs from "fs";
import path from "path";

function getDirSize(dirPath: string): number {
  let size = 0;
  try {
    if (!fs.existsSync(dirPath)) return 0;
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (
        [
          "node_modules",
          ".git",
          "dist",
          ".rsbuild",
          ".venv",
          "venv",
          "__pycache__",
        ].includes(file)
      ) {
        continue;
      }
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        size += getDirSize(filePath);
      } else {
        const ext = path.extname(file);
        if (
          [
            ".go",
            ".ts",
            ".tsx",
            ".py",
            ".js",
            ".jsx",
            ".css",
            ".html",
            ".sql",
          ].includes(ext)
        ) {
          size += stat.size;
        }
      }
    }
  } catch (_) {}
  return size;
}

function getCpuUsage() {
  const cpus = os.cpus();
  if (!cpus || cpus.length === 0) return { idle: 0, total: 0 };

  let totalIdle = 0;
  let totalTick = 0;

  for (const cpu of cpus) {
    for (const type in cpu.times) {
      totalTick += (cpu.times as any)[type];
    }
    totalIdle += cpu.times.idle;
  }

  return { idle: totalIdle / cpus.length, total: totalTick / cpus.length };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Measure CPU usage over a short 100ms sample
    const startCpu = getCpuUsage();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const endCpu = getCpuUsage();

    const idleDiff = endCpu.idle - startCpu.idle;
    const totalDiff = endCpu.total - startCpu.total;

    let cpuPercent = 0;
    if (totalDiff > 0) {
      cpuPercent = Math.max(
        0,
        Math.min(100, Math.round(100 - (100 * idleDiff) / totalDiff)),
      );
    } else {
      cpuPercent = Math.floor(Math.random() * 15) + 5;
    }

    // Memory usage
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    let memPercent = 0;
    if (totalMem > 0) {
      memPercent = Math.max(
        0,
        Math.min(100, Math.round(((totalMem - freeMem) / totalMem) * 100)),
      );
    }

    // OS
    const platform = process.platform;
    const arch = process.arch;
    let osDisplay = `${platform}-${arch}`;
    if (platform === "win32") osDisplay = `windows-${arch}`;
    else if (platform === "darwin") osDisplay = `macos-${arch}`;

    // Runtime
    let runtimeDisplay = `Node.js ${process.version}`;
    if ((process.versions as any).bun) {
      runtimeDisplay = `Bun v${(process.versions as any).bun}`;
    }

    // Timezone
    let timezone = process.env.TZ;
    if (!timezone) {
      try {
        timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      } catch (_) {
        timezone = "UTC";
      }
    }

    // Dynamic focus calculation based on actual sub-project sizes
    let geospatialFocus = 45;
    let aiAgentFocus = 35;
    let fullstackFocus = 20;

    const projectsRoot = path.resolve(process.cwd(), "../projects");
    if (fs.existsSync(projectsRoot)) {
      const aegisSize = getDirSize(path.join(projectsRoot, "aegis"));
      const pinterSize = getDirSize(path.join(projectsRoot, "pinter"));
      const nexusSize = getDirSize(path.join(projectsRoot, "nexus"));
      const totalSize = aegisSize + pinterSize + nexusSize;

      if (totalSize > 0) {
        geospatialFocus = Math.round((aegisSize / totalSize) * 100);
        aiAgentFocus = Math.round((pinterSize / totalSize) * 100);
        // Make sure it sums up to exactly 100%
        fullstackFocus = 100 - (geospatialFocus + aiAgentFocus);
      }
    }

    return res.status(200).json({
      os: osDisplay,
      runtime: runtimeDisplay,
      timezone: timezone || "UTC",
      dbEngine: "PostgreSQL 16",
      cpuUsage: cpuPercent,
      memoryUsage: memPercent,
      pulseSpeed: parseFloat((Math.random() * 0.4 + 0.6).toFixed(2)),
      techFocus: {
        geospatial: geospatialFocus,
        aiAgent: aiAgentFocus,
        fullstack: fullstackFocus,
      },
    });
  } catch (error) {
    console.error("Telemetry serverless handler error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
