import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Robust process.env replacement
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Fallback for libraries accessing process.env directly
      'process.env': JSON.stringify({ API_KEY: env.API_KEY })
    }
  }
})