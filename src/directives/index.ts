import type {App} from 'vue'
import {setupPermissionDirective} from './permission/hasPermi.js'
// import {setupBtnLoseFocusDirective} from './ui/elementPLus.js'

/**
 * 导出指令：v-has-perm
 * @methods hasPerm 按钮权限，用法: v-hasPerm
 */
export const setupPermission = (app: App<Element>) => {
    setupPermissionDirective(app)
}

// /**
//  * 导出指令：v-btn-lose-focus
//  * @methods v-btn-lose-focus 强制按钮被点击后失去焦点，用法: v-btn-lose-focus
//  */
// export const setupBtnLoseFocus = (app: App<Element>) => {
//     setupBtnLoseFocusDirective(app)
// }
