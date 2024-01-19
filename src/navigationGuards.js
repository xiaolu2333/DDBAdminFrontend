import router from './router'
import {useNProgress} from "@/hooks/useProgress.js";

// 使用进度条
const {start, done} = useNProgress()

const whiteList = ['/login'] // 不重定向白名单

function handleConsole(to, from) {
    console.log('to', to)
    console.log('from', from)
}


router.beforeEach(async (to, from, next) => {
    handleConsole(to, from)
    start()
    next()
})

router.afterEach((to) => {
    done()
    console.log(to?.meta?.title)
})
