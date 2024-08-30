import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://challenge-uno.vercel.app',
        changeOrigin: true, // 
        //rewrite: (path) => path.replace(/^\/api/, '') // Reescribe la URL, eliminando el prefijo /api
      }
    }
  }
})
