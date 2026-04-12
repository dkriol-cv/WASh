import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: './', // Mandatory for SCORM 1.2 relative loading inside the ZIP
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
