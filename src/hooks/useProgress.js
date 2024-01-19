import {nextTick, unref} from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


export const useNProgress = () => {
    NProgress.configure({showSpinner: false})

    const initColor = async () => {
        await nextTick()
        const bar = document.getElementById('nprogress')?.getElementsByClassName('bar')[0]
        if (bar) {
          bar.style.background = unref(primaryColor.value)
        }
    }

    initColor()

    const start = () => {
        NProgress.start()
    }

    const done = () => {
        NProgress.done()
    }

    return {
        start,
        done
    }
}
