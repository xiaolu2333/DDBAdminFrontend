/* jshint esversion: 6 */
/* 封装 axios 拦截器 */

import axios from "axios";
import {ElMessage, ElMessageBox} from 'element-plus'

// 通过 process.env 来获取环境变量
// console.log(process.env.NODE_ENV + "环境: " + process.env.VUE_APP_API);
// 执行 npm run dev 时，默认读取 .env.development 中的环境变量，输出 development环境: /devAPI)
// 执行 npm run build 时，默认读取 .env.production 中的环境变量，输出 production环境: /prodAPI)
// 我们就可以使用不同的环境变量来区分不同的环境，具体就是在API前添加环境变量值，从而请求不同环境下的接口
// 然后就可以用环境变量来替换 axios 中的 baseURL，从而实现不同环境下的接口请求。

// 创建实例
const service = axios.create({
    baseURL: 'http://127.0.0.1:8000', // api 的 base_url
    timeout: 30000,
});

// 创建请求拦截器
service.interceptors.request.use(
    function (config) {
        "use strict";
        // 在发送请求之前做些什么
        // 比如：在请求头中添加 token 数据、请求参数处理、请求前的loading、请求前的权限验证等
        // console.log("config:", config);
        return config;
    },
    function (error) {
        "use strict";
        // 对请求错误做些什么
        // 比如：请求超时，请求失败等提示等
        return Promise.reject(error);
    }
);

// 创建响应拦截器
service.interceptors.response.use(
    // 响应成功后回调
    function (response) {
        "use strict";
        // 对响应数据做点什么
        // 比如：根据响应状态码，做不同的响应处理
        if (response) {
            const {code, message} = response.data
            if (code === 200) {
                return Promise.resolve(response);
            } else if (message === "连接超时！") {
                return Promise.reject(response);
            } else {
                // 响应数据为二进制流处理(数据导出)
                if (response.data instanceof Blob) {
                    return response
                }

                ElMessage({
                    message: message || '系统出错',
                    type: 'error'
                })
                return Promise.reject(new Error(message || 'Error'))
            }
        } else {
            return Promise.reject(response);
        }
    },
    // 响应失败后回调
    function (error) {
        "use strict";
        // 对响应错误做点什么
        // 比如：根据响应状态码，做不同的响应处理
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;
