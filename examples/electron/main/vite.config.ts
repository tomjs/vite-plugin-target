import { defineConfig } from 'vite'
import target from '@tomjs/vite-plugin-target'

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [
    target({
      'electron-main': {},
    }),
  ],
  build: {
    lib: {
      entry: 'index.ts',
      formats: ['cjs'],
      fileName: () => '[name].js',
    },
    minify: false,
    emptyOutDir: false,
    outDir: '../dist/main',
  },
})
