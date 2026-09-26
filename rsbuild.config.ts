import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { defineConfig, loadEnv, type RsbuildPlugin } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

const SITE_URL = "https://adityavhlvy.vercel.app";
const DEFAULT_IMAGE = "/assets/profile.png";

const escapeAttr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function setMeta(html: string, key: string, value: string) {
  const pattern = new RegExp(`(<meta (?:property|name)="${key}" content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

/**
 * Link crawlers (LinkedIn, Slack, X) do not run JavaScript, so they only see
 * the meta tags in index.html. This writes dist/blog/<slug>/index.html with
 * the post's own tags. Vercel serves these files before the SPA rewrite.
 */
const pluginPostMeta = (): RsbuildPlugin => ({
  name: "post-meta",
  setup(api) {
    api.onAfterBuild(() => {
      const dist = api.context.distPath;
      const base = readFileSync(join(dist, "index.html"), "utf-8");
      const { posts } = JSON.parse(readFileSync(join(api.context.rootPath, "src/data/posts.json"), "utf-8")) as {
        posts: { slug: string; title: string; summary: string; cover?: string }[];
      };

      for (const post of posts) {
        const url = `${SITE_URL}/blog/${post.slug}`;
        const image = `${SITE_URL}${post.cover ?? DEFAULT_IMAGE}`;
        let html = base.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(post.title)} | Kura Ninja</title>`);
        for (const [key, value] of [
          ["description", post.summary],
          ["og:title", post.title],
          ["og:description", post.summary],
          ["og:url", url],
          ["og:image", image],
          ["og:type", "article"],
          ["twitter:image", image],
        ]) {
          html = setMeta(html, key, value);
        }
        mkdirSync(join(dist, "blog", post.slug), { recursive: true });
        writeFileSync(join(dist, "blog", post.slug, "index.html"), html);
      }
    });
  },
});

export default defineConfig({
  plugins: [pluginReact(), pluginPostMeta()],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
    define: publicVars,
  },
  html: {
    title: "Aditya Vahlevy Nugraha - adityavhlvy | Portfolio & Projects",
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
