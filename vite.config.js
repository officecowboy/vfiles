import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.webp'],
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  server: {
    port: 5173,
    host: true
  }
})
