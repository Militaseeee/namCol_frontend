import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  base: "./", // importante para que funcione en Vercel y GitHub Pages
  build: {
    outDir: "dist",
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/pages//*", // copiamos todas tus páginas
          dest: "pages", // quedan en dist/pages
        },
      ],
    }),
  ],
  server: {
    port: 5173,
    open: true,
  },
});
