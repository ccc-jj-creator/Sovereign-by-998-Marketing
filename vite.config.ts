import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // Expose the API key (from .env or Vercel system vars) as process.env.API_KEY to match Google GenAI guidelines
      'process.env.API_KEY': JSON.stringify(env.API_KEY || process.env.API_KEY)
    }
  }
})