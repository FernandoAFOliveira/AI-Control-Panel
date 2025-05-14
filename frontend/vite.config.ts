// Control-Panel/frontend/vite.config.ts
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgrPlugin from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    svgrPlugin(), // <-- default behavior is: intercept `*.svg?react` imports
    react(),
    tailwindcss(),
  ],
   server: {
     host: '0.0.0.0',
     port: 5174,
     proxy: {
       '/api': { target: 'http://localhost:8000', changeOrigin: true },
       '/config': { target: 'http://localhost:8000', changeOrigin: true },
       '/logs': { target: 'http://localhost:8000', changeOrigin: true },
     },
   },
 })
