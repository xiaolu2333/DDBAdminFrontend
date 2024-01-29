import router from './router'
import {useNProgress} from "@/hooks/useProgress.js";

// 使用进度条
const {start, done} = useNProgress()

let url = 'http://172.28.79.200:8000/test_app/page_data_analysis' // 埋点上报地址
let startTime = Date.now()
let currentTime = ''
let stayTime = 0

const whiteList = ['/login'] // 不重定向白名单

function handleConsole(to, from) {
    console.log('to', to)
    console.log('from', from)
}


router.beforeEach(async (to, from, next) => {
    handleConsole(to, from)
    start()
    next()

    // 路由导航埋点——监控页面停留时间
    if (from) {
        currentTime = Date.now()
        stayTime = parseInt(currentTime - startTime)

        navigator.sendBeacon(url, JSON.stringify({
            type: 'page_duration',
            data: {
                page: from.path,
                val: stayTime / 1000
            }
        }))
        startTime = Date.now()
    }
})

router.afterEach((to) => {
    done()
    console.log(to?.meta?.title)
})
