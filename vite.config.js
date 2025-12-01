import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";
import { fileURLToPath } from "url";

// 👇 Define __filename and __dirname using the current module's URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // This fixes the 'not defined' error

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      styles: path.resolve(__dirname, "./src/styles"),
      components: path.resolve(__dirname, "./src/components"),
      pages: path.resolve(__dirname, "./src/pages"),
    },
  },
});
