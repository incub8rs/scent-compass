import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Served from https://<user>.github.io/scent-compass/ on GitHub Pages.
  // Override with BASE_PATH=/ for local/root hosting.
  base: process.env.BASE_PATH || '/scent-compass/',
  plugins: [react()],
})
