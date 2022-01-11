import { defineConfig } from 'vite'

// Plugins
import vue from '@vitejs/plugin-vue'

// Needed for alias
import path from 'path'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src"),
    },
  },
})
