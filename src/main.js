/* jshint esversion: 6 */

import { createApp } from 'vue';
import App from './App.vue';

import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import '../mock/index.js';

// 创建Vue应用实例
const app = createApp(App);

// 通过 app.use() 方法全局注册Vue Router
app.use(router);
// 通过 app.use() 方法全局注册Element Plus
app.use(ElementPlus);
// 通过 app.component() 方法全局注册Element Plus Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载Vue应用实例
app.mount('#app');