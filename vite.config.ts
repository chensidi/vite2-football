import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'
const path = require('path')

const isProducetion = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    outDir: 'football'
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file 
              return false
            }
            return `vant/es/${name}/index.css`
          }
        },
      ]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, path.resolve('./src'))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/style/style.scss';`
      }
    }
  },
  server: { //自定义服务器
    port: 7000, //端口
    strictPort: true, //设为true时，如果port已被占用会强制退出
    https: false, //启用https
    open: false, //自动打开浏览器
    proxy: { //设置代理相关
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    },
    hmr: { //热更新相关，直接设置为false则关闭，默认开启
      overlay: true
    }
  }
})
