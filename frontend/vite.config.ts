import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@/components": `${path.resolve(__dirname, "./src/components/")}`,
      "@/lib/*": `${path.resolve(__dirname, ".src/lib/")}`,
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/api": `${path.resolve(__dirname, "./src/api")}`,
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
