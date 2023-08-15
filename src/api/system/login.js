import service from "@/utils/request.js";


export const loginApi = (data) => {
    return service.request({
        url: '/framework/acl/login/loginPassword',
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