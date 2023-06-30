import {defineStore} from 'pinia'

// useStore 可以是 useUser、useCart 之类的任何东西
export const useAppStore = defineStore('app', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            title: import.meta.env.VITE_APP_TITLE,
        }
    },

    getters: {
        getTitle() {
            return this.title;
        }
    },

    setters: {
        setTitle(title) {
            this.title = title;
        }
    },

    actions: {
        async changeTitle(title) {
            this.setTitle(title);
        }
    }
})