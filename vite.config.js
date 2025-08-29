import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "src/assets//*", // copia TODO assets (imagenes, iconos, etc.)
          dest: "assets", // se guarda en dist/assets
        },
        {
          src: "src/pages//*", // copia todas las páginas HTML
          dest: "pages", // se guarda en dist/pages
        },
      ],
    }),
  ],
  build: {
    outDir: "dist", // carpeta de salida del build
    emptyOutDir: true,
  },
  server: {
    open: true, // abre automáticamente en el navegador
    port: 5173, // puerto del dev server
  },
});
