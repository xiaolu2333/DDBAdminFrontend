
// 事件处理函数有参数
function btnLoseFocus(evt) {
    let target = evt.target
    if (target.nodeName === 'SPAN') {
        target = evt.target.parentNode
    }
    target.blur()
}

// 按钮点击后强制失去焦点
export const vBtnLoseFocus = {
    mounted(el, binding) {
        el.addEventListener('click', btnLoseFocus);
    }
}

// 全局挂载
export const setupBtnLoseFocusDirective = (app) => {
    app.directive('btnLoseFocus', vBtnLoseFocus)
}

export default vBtnLoseFocus

