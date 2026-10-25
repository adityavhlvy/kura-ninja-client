import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv, type RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

const SITE_URL = "https://adityavhlvy.vercel.app";
const DEFAULT_IMAGE = "/assets/og.jpg";
const SITE_TITLE = "Aditya Vahlevy Nugraha (adityavhlvy) | Software Engineer";
const SITE_DESCRIPTION =
  "Portfolio of Aditya Vahlevy Nugraha (adityavhlvy), Software Engineer at Pupuk Indonesia. AI, GIS, and full-stack systems that turn business processes into software.";

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setMeta(html: string, key: string, value: string) {
  const pattern = new RegExp(`(<meta (?:property|name)="${key}" content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

type Render = (url: string) => Promise<string>;
type Page = { path: string; title: string; description: string; image?: string; type?: string; jsonLd?: object };

const readJson = <T,>(root: string, name: string) => JSON.parse(readFileSync(join(root, "src/data", name), "utf-8")) as T;

/** Every URL the site serves, with its own title, description, and card. */
function pages(root: string): Page[] {
  const { projects } = readJson<{ projects: { slug: string; title: string; description: string; image?: string }[] }>(root, "projects.json");
  const { posts } = readJson<{ posts: { slug: string; title: string; summary: string; date: string; cover?: string }[] }>(root, "posts.json");
  const profile = readJson<{ bio: { name: string }; contact: { email: string; socials: { url: string }[] } }>(root, "profile.json");
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.bio.name,
    alternateName: "adityavhlvy",
    url: SITE_URL,
    image: `${SITE_URL}/assets/profile.webp`,
    jobTitle: "Software Engineer",
    worksFor: { "@type": "Organization", name: "Pupuk Indonesia" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Universitas Pertamina" },
    email: `mailto:${profile.contact.email}`,
    sameAs: profile.contact.socials.map((s) => s.url),
  };
  return [
    { path: "/", title: SITE_TITLE, description: SITE_DESCRIPTION, jsonLd: person },
    { path: "/projects", title: "Work | adityavhlvy", description: "Every project by Aditya Vahlevy Nugraha: AI agent platforms, geospatial planning, logistics, and full-stack apps." },
    { path: "/blog", title: "Blog | adityavhlvy", description: "Notes on AI routing, geospatial systems, and building platforms at Pupuk Indonesia." },
    { path: "/about", title: "About | adityavhlvy", description: "Aditya Vahlevy Nugraha, Software Engineer turning business processes into software. Computer Science cum laude, Universitas Pertamina.", jsonLd: person },
    { path: "/certifications", title: "Credentials | adityavhlvy", description: "Certifications and credentials of Aditya Vahlevy Nugraha." },
    { path: "/contact", title: "Contact | adityavhlvy", description: "Email, phone, LinkedIn, GitHub, GitLab, Instagram, and Spotify for Aditya Vahlevy Nugraha." },
    { path: "/hire", title: "Hire me | adityavhlvy", description: "Freelance AI integration and automation, maps and geospatial apps, and software development by Aditya Vahlevy Nugraha. Send a brief." },
    { path: "/brand", title: "Brand | adityavhlvy", description: "The adityavhlvy identity: mark, type, colour, and usage." },
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      title: `${p.title} | adityavhlvy`,
      description: p.description,
      image: p.image,
      type: "article",
      jsonLd: { "@context": "https://schema.org", "@type": "CreativeWork", name: p.title, description: p.description, author: { "@type": "Person", name: profile.bio.name, url: SITE_URL }, url: `${SITE_URL}/projects/${p.slug}` },
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      title: `${p.title} | adityavhlvy`,
      description: p.summary,
      image: p.cover,
      type: "article",
      jsonLd: { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.summary, datePublished: p.date, author: { "@type": "Person", name: profile.bio.name, url: SITE_URL }, url: `${SITE_URL}/blog/${p.slug}` },
    })),
  ];
}

/**
 * Crawlers and link previews get real HTML: each route is rendered with the
 * node build into dist/<route>/index.html with its own meta, canonical, and
 * JSON-LD, plus sitemap.xml. Vercel serves these files before the SPA rewrite.
 */
const pluginPrerender = (): RsbuildPlugin => ({
  name: "prerender",
  setup(api) {
    api.onAfterBuild(async ({ environments }) => {
      const web = environments.web.distPath;
      const mod = (await import(join(environments.node.distPath, "server.cjs"))) as { render?: Render; default?: { render: Render } };
      const render = (mod.render ?? mod.default?.render)!;
      const base = readFileSync(join(web, "index.html"), "utf-8");
      const all = pages(api.context.rootPath);

      for (const page of all) {
        const url = `${SITE_URL}${page.path === "/" ? "" : page.path}`;
        const image = `${SITE_URL}${page.image ?? DEFAULT_IMAGE}`;
        let html = base.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
        for (const [key, value] of [
          ["description", page.description],
          ["og:title", page.title],
          ["og:description", page.description],
          ["og:url", url],
          ["og:image", image],
          ["og:type", page.type ?? "website"],
          ["twitter:image", image],
        ]) {
          html = setMeta(html, key, value);
        }
        const head =
          `<link rel="canonical" href="${url}" />` +
          (page.jsonLd ? `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, "\\u003c")}</script>` : "");
        const body = await render(page.path);
        html = html
          .replace("</head>", `${head}</head>`)
          .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/div>/, `<div id="root" data-ssr="1">${body}</div>`);
        const dir = join(web, page.path);
        mkdirSync(dir, { recursive: true });
        writeFileSync(join(dir, "index.html"), html);
      }

      const today = new Date().toISOString().slice(0, 10);
      writeFileSync(
        join(web, "sitemap.xml"),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${all
          .map((p) => `  <url><loc>${SITE_URL}${p.path === "/" ? "" : p.path}</loc><lastmod>${today}</lastmod></url>`)
          .join("\n")}\n</urlset>\n`,
      );
    });
  },
});

export default defineConfig({
  plugins: [pluginReact(), pluginPrerender()],
  source: { define: publicVars },
  environments: {
    web: { source: { entry: { index: "./src/main.tsx" } } },
    node: {
      source: { entry: { server: "./src/server.tsx" } },
      output: { target: "node", distPath: { root: "dist-ssr" }, filename: { js: "[name].cjs" }, minify: false },
    },
  },
  html: {
    title: SITE_TITLE,
    favicon: "./public/favicon.svg",
    template: "./index.html",
  },
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    distPath: {
      root: "dist",
    },
    cleanDistPath: true,
  },
});
