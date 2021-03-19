import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import path from 'path'
const pathSrc = path.resolve(__dirname, "./src");

const VITE_APP_API_ROOT: string = 'http://116.62.9.135:5124/api'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    open: true,
    port: 3000,
    proxy: {
      '/efficacy': {
        target: VITE_APP_API_ROOT,
        changeOrigin: true,
      },
      '/sysDictionary': {
        target: VITE_APP_API_ROOT,
        changeOrigin: true,
      },
      '/demandPool': {
        target: VITE_APP_API_ROOT,
        changeOrigin: true,
      },
      '/user': {
        target: VITE_APP_API_ROOT,
        changeOrigin: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${pathSrc}/styles/var.scss";@import "${pathSrc}/styles/mixin.scss";`,
      }
    }
  }
})
