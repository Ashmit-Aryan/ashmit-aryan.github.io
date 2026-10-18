// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

export default defineConfig({
  // Static SSG build for GitHub Pages: no Nitro server target is emitted, and
  // each route is prerendered to its own directory.
  nitro: false,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // Used only at build time to prerender the static pages.
    server: { entry: "server" },
    prerender: {
      enabled: true,
      crawlLinks: false,
      failOnError: true,
    },
  },
  vite: {
    plugins: [
      {
        enforce: "pre",
        ...mdx({
          remarkPlugins: [remarkFrontmatter, [remarkMdxFrontmatter, { name: "frontmatter" }]],
        }),
      },
    ],
  },
});
