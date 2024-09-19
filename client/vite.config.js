import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: '/index.html', // Ensure this matches your entry point
      },
      output: {
        format: 'es', // Ensure the output format is suitable for your environment
      },
    },
  },
});
