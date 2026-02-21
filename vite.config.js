import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  define: {
    global: "window", 
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      styles: path.resolve(__dirname, "./src/app/styles"),
      pages: path.resolve(__dirname, "./src/pages"),
      shared: path.resolve(__dirname, "./src/shared"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
  },
});
