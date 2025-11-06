import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['framer-motion', 'styled-components'],
          'form-vendor': ['react-hook-form', 'react-datepicker', 'date-fns'],
          'data-vendor': ['axios', 'react-query'],
        },
      },
    },
  },
  envPrefix: 'REACT_APP_',
});