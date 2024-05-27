import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/client"),
    rollupOptions: {
      input: path.resolve(__dirname, "client/index.html"),
    },
    emptyOutDir: true,
  },
  plugins: [react()],
});
