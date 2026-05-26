import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11', 'Safari >= 10', 'iOS >= 10'],
      polyfills: true,
    })
  ],
  build: {
    target: 'es2015'
  }
})
