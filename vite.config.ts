import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  root: 'html',
  base: './',
  resolve: {
    alias: {
      '/src': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    target: 'es2021',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: {
        main: 'index.html',
        fourier: 'fourier.html',
        laplace: 'laplace.html',
        taylor: 'taylor.html',
      },
    },
  },
})
