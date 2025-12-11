import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // @ts-ignore: Fix for Property 'cwd' does not exist on type 'Process'
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // This injects the environment variable into the build as a string
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Fallback for libraries that might access process.env generically
      'process.env': JSON.stringify({}),
    }
  }
})