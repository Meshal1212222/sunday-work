import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/sunday-management/',
  server: {
    port: 8081,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
