import { cpSync, mkdirSync, copyFileSync, existsSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATA_DIR = join(__dirname, "../../portfolio-data");
const SRC_DATA = join(__dirname, "../src/data");
const PUBLIC_ASSETS = join(__dirname, "../public/assets");

// Excluded by explicit instruction: unused casual photo set.
const EXCLUDED_ASSET_DIRS = ["casual-photo-multi-direction"];

mkdirSync(SRC_DATA, { recursive: true });

// Mirror the whole asset tree so project galleries and logos stay in sync
// with portfolio-data instead of being copied in by hand.
cpSync(join(DATA_DIR, "assets"), PUBLIC_ASSETS, { recursive: true });
for (const dir of EXCLUDED_ASSET_DIRS) {
  rmSync(join(PUBLIC_ASSETS, "profile-photos", dir), { recursive: true, force: true });
}

// Social card image lives at a stable path referenced by index.html meta tags.
const portrait = join(PUBLIC_ASSETS, "profile-photos/professional-profile.png");
if (existsSync(portrait)) copyFileSync(portrait, join(PUBLIC_ASSETS, "profile.png"));

const FILES = ["projects", "journey", "certifications", "profile"] as const;

for (const name of FILES) {
  const yaml = readFileSync(join(DATA_DIR, `${name}.yml`), "utf-8");
  writeFileSync(join(SRC_DATA, `${name}.json`), JSON.stringify(parse(yaml), null, 2), "utf-8");
  console.log(`[sync] ${name}.yml -> src/data/${name}.json`);
}

console.log("[sync] assets mirrored to public/assets");
