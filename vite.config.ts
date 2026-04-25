import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Pre-bundle the lucide icons used across many chunks so dev cold-start
    // doesn't re-resolve them per chunk.
    include: [
      "lucide-react/dist/esm/icons/arrow-up-right",
      "lucide-react/dist/esm/icons/chevron-down",
    ],
  },
  build: {
    // Split rarely-changing vendor code into its own chunk so returning
    // visitors hit the browser cache across deploys.
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "query-vendor": ["@tanstack/react-query"],
        },
      },
    },
  },
}));
