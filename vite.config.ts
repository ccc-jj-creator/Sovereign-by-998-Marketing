import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Ensure proper module transformation
    target: 'esnext',
    sourcemap: false,
  },
  // Ensure Vite handles the flat project structure
  root: '.',
  publicDir: 'public',
})