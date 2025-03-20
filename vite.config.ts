import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Cs2Utility/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
}) 