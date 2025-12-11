import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Safely access API_KEY from either local .env or Vercel's environment
      'process.env.API_KEY': JSON.stringify(env.API_KEY || (process.env as any).API_KEY)
    }
  }
})