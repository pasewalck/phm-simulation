import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: './',
  build: {
    target: 'es2021',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: {
        main: 'index.html',
        fourier: 'projects/fourier/index.html',
        laplace: 'projects/laplace/index.html',
        taylor: 'projects/taylor/index.html',
      },
    },
  },
})
