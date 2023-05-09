/* jshint esversion: 6 */

import {createApp} from 'vue';
import App from './App.vue';

import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import '../mock/index.js';

// 创建Vue应用实例
const app = createApp(App);

import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

function useTable(app) {
    app.use(VXETable)

    // 给 vue 实例挂载内部对象，例如：
    // app.config.globalProperties.$XModal = VXETable.modal
    // app.config.globalProperties.$XPrint = VXETable.print
    // app.config.globalProperties.$XSaveFile = VXETable.saveFile
    // app.config.globalProperties.$XReadFile = VXETable.readFile
}


// 通过 app.use() 方法全局注册Vue Router
app.use(router);
// 通过 app.use() 方法全局注册Element Plus
app.use(ElementPlus);
// 通过 app.component() 方法全局注册Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(useTable);

// 挂载Vue应用实例
app.mount('#app');