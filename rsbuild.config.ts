import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["PUBLIC_"] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
    define: publicVars,
  },
  html: {
    title: "Aditya Vahlevy Nugraha - Kura Ninja | Portfolio & Projects",
    favicon: "./public/favicon.svg",
    template: "./index.html",
  },
  server: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
  output: {
    distPath: {
      root: "dist",
    },
    cleanDistPath: true,
  },
});
