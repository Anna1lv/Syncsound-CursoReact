import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/deezer": {
      target: "https://api.deezer.com",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/deezer/, ""),
      },
    },
  },
});
