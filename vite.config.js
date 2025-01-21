import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://api.intern.d-tt.nl', // API's base URL
        changeOrigin: true, // Avoid CORS issues by spoofing the origin
        secure: false, // Allow requests to HTTPS without valid certs (dev only)
      },
    },
  },
});
