import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})