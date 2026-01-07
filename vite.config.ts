import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

const plugins = [react(), runtimeErrorOverlay()];

if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  const { cartographer } = await import("@replit/vite-plugin-cartographer");
  plugins.push(cartographer());
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5174,
    host: true,
    proxy: {
      "/api": "http://localhost:8080",
    },
    allowedHosts: ["*.loca.lt"],
  },
});
