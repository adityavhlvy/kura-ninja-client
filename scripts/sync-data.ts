import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "yaml";

// ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORTFOLIO_DATA_DIR = join(__dirname, "../../portfolio-data");
const SRC_DATA_DIR = join(__dirname, "../src/data");

try {
  mkdirSync(SRC_DATA_DIR, { recursive: true });
} catch (e) {}

const filesToSync = [
  { yaml: "projects.yml", json: "projects.json" },
  { yaml: "journey.yml", json: "journey.json" },
  { yaml: "certifications.yml", json: "certifications.json" },
  { yaml: "profile.yml", json: "profile.json" },
];

for (const file of filesToSync) {
  try {
    const yamlPath = join(PORTFOLIO_DATA_DIR, file.yaml);
    const jsonPath = join(SRC_DATA_DIR, file.json);
    
    console.log(`[Sync] Reading ${file.yaml}...`);
    const yamlContent = readFileSync(yamlPath, "utf-8");
    const parsedData = parse(yamlContent);
    
    console.log(`[Sync] Writing ${file.json}...`);
    writeFileSync(jsonPath, JSON.stringify(parsedData, null, 2), "utf-8");
  } catch (err) {
    console.error(`[Sync] Error syncing ${file.yaml}:`, err);
    process.exit(1);
  }
}

console.log("[Sync] Data sync complete!");
