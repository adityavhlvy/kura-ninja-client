import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "dist-ssr/**",
    "node_modules/**",
  ]),
]);

export default eslintConfig;
