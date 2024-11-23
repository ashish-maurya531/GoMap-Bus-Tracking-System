import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; connect-src 'self'; script-src 'self'; style-src 'self';",
    },
  },
});