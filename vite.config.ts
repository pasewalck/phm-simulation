import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    target: 'es2021',
    cssMinify: 'lightningcss',
    rollupOptions: {
      input: {
        main: 'index.html',
        laplace: 'laplace.html',
        taylor: 'taylor.html',
      },
    },
  }
})