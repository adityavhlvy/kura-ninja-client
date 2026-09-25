import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { parse } from "yaml";

// ESM path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORTFOLIO_DATA_DIR = join(__dirname, "../../portfolio-data");
const SRC_DATA_DIR = join(__dirname, "../src/data");
const PUBLIC_ASSETS_DIR = join(__dirname, "../public/assets");

try {
  mkdirSync(SRC_DATA_DIR, { recursive: true });
  mkdirSync(join(PUBLIC_ASSETS_DIR, "profile-photos"), { recursive: true });
} catch (e) {}

// Sync photo
const srcPhoto = join(PORTFOLIO_DATA_DIR, "assets/profile-photos/professional-profile.png");
const destPhoto1 = join(PUBLIC_ASSETS_DIR, "profile-photos/professional-profile.png");
const destPhoto2 = join(PUBLIC_ASSETS_DIR, "profile.png");
if (existsSync(srcPhoto)) {
  try {
    copyFileSync(srcPhoto, destPhoto1);
    copyFileSync(srcPhoto, destPhoto2);
    console.log("[Sync] Mirrored professional-profile.png to public assets.");
  } catch (err) {
    console.warn("[Sync] Warning copying photo:", err);
  }
}

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
