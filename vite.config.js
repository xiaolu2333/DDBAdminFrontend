/// <reference types="vitest" />

import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import bundleAnalyzer from "rollup-plugin-bundle-analyzer";
import progress from 'vite-plugin-progress'


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // 打包进度条
        progress(),
        // 打包分析
        bundleAnalyzer({}),
        vue()
    ],
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
                additionalData: `@import "@/style/scss/main.scss";`,
                // 配置 scss 文件搜索路径
                includePaths: ["@/style/scss/main.scss"],
            }
        }
    },
    test: {
        // 模拟dom环境
        environment: "happy-dom",
        coverage: {
            // 覆盖率提供者
            provider: "istanbul",
            reporter: ["text", "json", "html"],
            // 设置覆盖文件夹
            reportsDirectory: "./coverage",
            // 检查每个文件的阈值
            perFile: true,
            // 设置代码覆盖率阈值
            lines: 75,
            functions: 75,
            branches: 75,
            statements: 75,
        },
        open: true,
        include: ["./src/components/**/*.{test,spec}.ts"],
    },
    build: {
        // 修改大小，kb
        chunkSizeWarningLimit: 5000,
    }
});
