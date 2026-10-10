import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ['**/isolated_*/**', '**/temp_*/**', '**/*.png']
    }
  }
})

