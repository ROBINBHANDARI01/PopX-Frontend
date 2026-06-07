import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
   server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 👈 Change this to your backend server URL/Port
        changeOrigin: true,
        secure: false,
      }
    }
  }
})