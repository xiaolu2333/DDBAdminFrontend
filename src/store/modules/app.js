import {defineStore} from 'pinia'
import {useCache} from '@/hooks/useCache.js'

const {wsCache} = useCache()

// useStore 可以是 useUser、useCart 之类的任何东西
export const useAppStore = defineStore('app', {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            title: _commConfig.appTitle,
            userInfo: 'DDBAdminUserInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
        }
    },

    getters: {
        getTitle() {
            return this.title
        }
    },
    getUserInfo() {
        return this.userInfo
    },

    actions: {
        setTitle(title) {
            this.title(title);
        }
    }
})