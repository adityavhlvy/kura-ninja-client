import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  globalIgnores([
    "dist/**",
    "dist-ssr/**",
    "node_modules/**",
    "qr-ninja/**",
  ]),
]);

export default eslintConfig;
