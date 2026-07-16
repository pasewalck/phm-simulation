import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    target: 'ES2020',
    rollupOptions: {
      input: {
        main: 'index.html',
        laplace: 'laplace.html',
        taylor: 'taylor.html',
      },
    },
  }
})