import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': 'http://api-driver.marsview.cc'
    }
  },

  // 配置路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
