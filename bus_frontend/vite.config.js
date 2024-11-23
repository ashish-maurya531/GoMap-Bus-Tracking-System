import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; connect-src 'self'; script-src 'self'; style-src 'self';",
    },
  },

})
