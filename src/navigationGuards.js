import router from './router'

const whiteList = ['/login'] // 不重定向白名单

function handleConsole(to, from) {
    console.log('to', to)
    console.log('from', from)
}


router.beforeEach(async (to, from, next) => {
    handleConsole(to, from)
    next()
})

router.afterEach((to) => {
    console.log(to?.meta?.title)
})
