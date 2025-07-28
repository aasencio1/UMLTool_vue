import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // también puedes usar '0.0.0.0'
    port: 5173
  }
})
