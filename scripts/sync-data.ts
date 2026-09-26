import { cpSync, mkdirSync, copyFileSync, existsSync, readFileSync, readdirSync, writeFileSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";
import { Marked } from "marked";

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
const portrait = join(PUBLIC_ASSETS, "profile-photos/formal-casual.png");
if (existsSync(portrait)) copyFileSync(portrait, join(PUBLIC_ASSETS, "profile.png"));

const FILES = ["projects", "journey", "certifications", "profile"] as const;

for (const name of FILES) {
  const yaml = readFileSync(join(DATA_DIR, `${name}.yml`), "utf-8");
  writeFileSync(join(SRC_DATA, `${name}.json`), JSON.stringify(parse(yaml), null, 2), "utf-8");
  console.log(`[sync] ${name}.yml -> src/data/${name}.json`);
}

console.log("[sync] assets mirrored to public/assets");

// Blog posts: portfolio-data/posts/<slug>.md with a YAML frontmatter block.
// Markdown becomes HTML here, at build time, so no parser ships to the browser.
const POSTS_DIR = join(DATA_DIR, "posts");
const WORDS_PER_MINUTE = 220;

const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function readPost(file: string) {
  const raw = readFileSync(join(POSTS_DIR, file), "utf-8").replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`[sync] posts/${file}: missing frontmatter`);

  const meta = parse(match[1]) ?? {};
  for (const key of ["title", "date", "summary"]) {
    if (!meta[key]) throw new Error(`[sync] posts/${file}: frontmatter needs "${key}"`);
  }

  // Every heading gets an anchor id. h2 headings also feed the contents rail.
  const toc: { id: string; label: string }[] = [];
  const marked = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        const label = stripTags(inner);
        const id = slugify(label);
        if (depth === 2) toc.push({ id, label });
        return `<h${depth} id="${id}">${inner}</h${depth}>\n`;
      },
    },
  });
  const html = marked.parse(match[2], { async: false });

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(meta.title),
    date: String(meta.date),
    summary: String(meta.summary),
    cover: meta.cover ? String(meta.cover) : undefined,
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    project: meta.project ? String(meta.project) : undefined,
    draft: meta.draft === true,
    minutes: Math.max(1, Math.round(stripTags(html).split(/\s+/).length / WORDS_PER_MINUTE)),
    toc,
    html,
  };
}

const posts = existsSync(POSTS_DIR)
  ? readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map(readPost)
      .filter((p) => !p.draft)
      .map(({ draft: _draft, ...p }) => p)
      .sort((a, b) => b.date.localeCompare(a.date))
  : [];

writeFileSync(join(SRC_DATA, "posts.json"), JSON.stringify({ posts }, null, 2), "utf-8");
console.log(`[sync] ${posts.length} post(s) -> src/data/posts.json`);
