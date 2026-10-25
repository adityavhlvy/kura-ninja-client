// Renders public/assets/og.jpg, the 1200x630 social card. Run: bun run og
// Needs ImageMagick 7 (`magick`) and DejaVu Sans. Edit the copy below, then rerun.
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");
const PHOTO = join(ROOT, "../portfolio-data/assets/profile-photos/professional-portrait-in-charcoal-suit.png");
const OUT = join(ROOT, "public/assets/og.jpg");

const NAME = ["Aditya Vahlevy", "Nugraha"];
const ROLE = "Software Engineer";
const FOCUS = "AI · GIS · Full-stack";
const URL = "adityavhlvy.vercel.app";

// Dark theme tokens from src/styles.css.
const PAPER = "#0e1113";
const INK = "#e7e9e4";
const MUTE = "#9aa19b";
const SEA = "#8098ff";

const text = (font: string, size: number, color: string, y: number, value: string) =>
  ["-font", font, "-pointsize", String(size), "-fill", color, "-annotate", `+64+${y}`, value];

const args = [
  "-size", "1200x630", `xc:${PAPER}`,
  "(", PHOTO, "-resize", "420x630^", "-gravity", "center", "-extent", "420x630", ")",
  "-gravity", "northwest", "-geometry", "+780+0", "-composite",
  ...text("DejaVu-Sans-Bold", 64, INK, 158, NAME[0]),
  ...text("DejaVu-Sans-Bold", 64, INK, 234, NAME[1]),
  ...text("DejaVu-Sans-Bold", 28, SEA, 366, ROLE),
  ...text("DejaVu-Sans", 25, MUTE, 416, FOCUS),
  ...text("DejaVu-Sans", 24, MUTE, 537, URL),
  "-quality", "88", OUT,
];

const proc = Bun.spawnSync(["magick", ...args], { stderr: "inherit" });
if (proc.exitCode !== 0) process.exit(proc.exitCode ?? 1);
console.log("[og] public/assets/og.jpg");
