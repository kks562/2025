import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext', // Optional, targets modern browsers
    // No need for external if FontAwesome is bundled correctly
  },
});
