import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * preloadCriticalAssets — post-build HTML transform.
 *
 * The browser's preload scanner can only see assets referenced from the HTML.
 * Logo + critical fonts are imported from JS modules, which means the browser
 * doesn't discover them until the eager bundle parses. That delays LCP by
 * 150-300 ms on cold mobile loads.
 *
 * This plugin scans the build's emitted assets, finds the hashed copies of:
 *   - the horizontal logo (LCP candidate in the nav)
 *   - the woff2 weights actually painted above the fold (Inter 500, Fraunces wght-normal)
 * …and injects <link rel="preload"> tags into <head>.
 *
 * Filenames are content-hashed, so we resolve them at build time per build.
 */
function preloadCriticalAssets(): Plugin {
  // Basename matches — the build will hash these but keep the recognizable stem.
  const ASSET_MATCHERS = [
    { test: /haven-creek-horizontal[-.][^/]*\.webp$/, as: "image", type: "image/webp" },
    { test: /inter-latin-500-normal[-.][^/]*\.woff2$/, as: "font", type: "font/woff2" },
    {
      test: /fraunces-latin-wght-normal[-.][^/]*\.woff2$/,
      as: "font",
      type: "font/woff2",
    },
  ] as const;

  let resolved: { href: string; as: string; type: string }[] = [];

  return {
    name: "preload-critical-assets",
    apply: "build",
    generateBundle(_options, bundle) {
      resolved = [];
      for (const fileName of Object.keys(bundle)) {
        for (const m of ASSET_MATCHERS) {
          if (m.test.test(fileName)) {
            resolved.push({ href: `/${fileName}`, as: m.as, type: m.type });
          }
        }
      }
    },
    transformIndexHtml(html) {
      if (resolved.length === 0) return html;
      const tags = resolved
        .map(({ href, as, type }) => {
          const cors = as === "font" ? ' crossorigin="anonymous"' : "";
          const fp = as === "image" ? ' fetchpriority="high"' : "";
          return `    <link rel="preload" href="${href}" as="${as}" type="${type}"${cors}${fp} />`;
        })
        .join("\n");
      // Inject just before </head> so it runs before any <script>/<link rel=stylesheet>.
      return html.replace("</head>", `${tags}\n  </head>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    preloadCriticalAssets(),
  ].filter(Boolean) as Plugin[],
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
