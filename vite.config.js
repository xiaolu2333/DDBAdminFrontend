import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 重命名路径别名
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 是否开启 CSS source maps
    sourceMap: false,
    // css预设器配置项
    preprocessorOptions: {
      scss: {
        // 配置 scss 变量文件
        additionalData: `@import "@/style/scss/variables.scss";`,
        // 配置 scss 文件搜索路径
        includePaths: ["@/style/scss/main.scss"],
      }
    }
  }
});
