// frontend/vite.config.ts
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    postcss: path.resolve(__dirname, 'postcss.config.js'),
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
