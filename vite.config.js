import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   host: true, // يعين عنوان المضيف لاستخدام IP
  //   port: 5173, // يمكنك تغيير المنفذ إلى أي منفذ تريده
  //   hmr: {
  //     host: '192.168.1.1' // عنوان الـ IP الخاص بك
  //   }
  // },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
