import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // enables expect, test, describe, vi globally
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css: true, // allow components to import CSS without errors
  },
})
