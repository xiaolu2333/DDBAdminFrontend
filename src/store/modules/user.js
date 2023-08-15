import {defineStore} from 'pinia'

// @ts-ignore
import {getToken, setToken, removeToken, setProps, getProps} from '@/utils/auth.js'
import {loginApi, loginOutApi} from '@/api/system/login.js'
import {resetRouter} from '@/router/index.js'
import {ref} from 'vue'

export const useUserStore = defineStore('user', () => {
    // state
    const token = ref(getToken() || '')
    const userName = ref('')
    const userCode = ref('')
    const roles = ref('')
    const menuList = ref([])

    // actions
    // 登录
    function login(loginData) {
        return new Promise((resolve, reject) => {
            loginApi(loginData)
                .then(response => {
                    // @ts-ignore
                    const data = response.data
                    const accessToken = data.token
                    token.value = accessToken
                    setToken(accessToken)
                    userName.value = data.userName
                    userCode.value = data.userCode
                    menuList.value = data.menuList
                    setProps('userName', userName.value)
                    setProps('userCode', userCode.value)
                    setProps('deptCode', data.deptCode)
                    setProps('orgCode', data.orgCode)
                    setProps('menuList', menuList.value)
                    setProps('roles', data.roles)
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // 注销
    function logout() {
        return new Promise((resolve, reject) => {
            loginOutApi()
                .then(() => {
                    resetRouter()
                    resetToken()
                    resolve()
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    // 重置
    function resetToken() {
        removeToken()
        token.value = ''
        userName.value = ''
        userCode.value = ''
        roles.value = ''
        menuList.value = []
    }

    return {
        token,
        userName,
        userCode,
        roles,
        menuList,
        login,
        logout,
        resetToken
    }
})
