import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, './index.js'),
      name: 'NexusShadcn',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@nexus-ui/primitives', 'tailwindcss'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
