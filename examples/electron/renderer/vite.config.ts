import { defineConfig } from 'vite'
import target from '@tomjs/vite-plugin-target'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    target({
      'electron-renderer': {},
    }),
  ],
  build: {
    minify: false,
    emptyOutDir: false,
    outDir: '../dist/renderer',
  },
})
