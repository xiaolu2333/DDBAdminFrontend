/* jshint esversion: 6 */
import {createApp} from 'vue';

import router from './router';
import {createPinia} from 'pinia'
// 引入状态管理
import {setupStore} from '@/store/index.js'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'dayjs/locale/zh-cn'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import echarts from './views/learn/dataVisualization/useEcharts/myEcharts'
import gojs from 'gojs'
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

import App from './App.vue';
import './navigationGuards'

function useTable(app) {
    app.use(VXETable)

    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
}


const setupAll = async () => {
    const app = createApp(App)

    // 通过 app.use() 方法全局注册Vue Router
    app.use(router);
    // 挂载pinia
    setupStore(app)
    // 通过 app.use() 方法全局注册Element Plus
    app.use(ElementPlus);
    // 通过 app.component() 方法全局注册Element Plus Icons
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
    // 挂载vxe-table
    app.use(useTable)
    // 挂载echarts
    // Vue.prototype.$echarts = echarts;    //vue2的挂载方式
    app.config.globalProperties.$echarts = echarts; //vue3的挂载方式
    // 挂载gojs
    app.config.globalProperties.$echarts = gojs;
    // 挂载highlight.js
    app.use(hljsVuePlugin)
    // element-plus国际化
    app.use(ElementPlus, {
        locale: zhCn,
    })

    // 挂载Vue应用实例
    app.mount('#app');
}

setupAll().then(() => {
    console.log('=====================\nswcc: setupAppAll\n=====================')
})
