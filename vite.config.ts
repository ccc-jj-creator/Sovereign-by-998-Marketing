import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      // API Key injected directly
      'process.env.API_KEY': JSON.stringify("AIzaSyCQan0z0h1zOMcAMmJv0dYNvKWKYmi0CQI")
    }
  }
})