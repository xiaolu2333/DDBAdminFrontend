import service from "@/utils/request.js";


// 获取公钥
export const getPublicKey = () => {
    return service.request({
        url: '/framework/login/generate_public_key',
        method: 'get'
    })
}

export const loginApi = (data) => {
    return service.request({
        url: 'framework/login/login_with_password',
        method: 'post',
        data
    })
}

export const loginOutApi = () => {
    return service.request({
        url: '/framework/acl/login/loginOut',
        method: 'get'
    })
}

export const getUserInfo = (data) => {
    return service.request({
        url: '/framework/login',
        method: 'post',
        data
    })
}