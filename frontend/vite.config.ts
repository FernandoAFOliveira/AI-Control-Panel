// Control-Panel/frontend/vite.config.ts
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // any request to /logs will be forwarded to port 8000
      "/logs": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      // if you later add /api routes:
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
