import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/navigation": path.resolve(__dirname, "./src/compat/next-navigation.js"),
      "next/link": path.resolve(__dirname, "./src/compat/next-link.jsx"),
      "next/dynamic": path.resolve(__dirname, "./src/compat/next-dynamic.jsx"),
      "next/image": path.resolve(__dirname, "./src/compat/next-image.jsx"),
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
