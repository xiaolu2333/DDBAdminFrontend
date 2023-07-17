/* jshint esversion: 6 */
/* 封装 axios 拦截器 */

import axios from "axios";
import {ElMessage} from 'element-plus'

// 创建实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PATH,
  // bassURL: _config.baseUrl,
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
      const {code, msg} = response.data
      if (code === 200) {
        return Promise.resolve(response);
      } else if (code === 308) {
        return Promise.resolve(response);
      } else if (msg === "连接超时！") {
        return Promise.reject(response);
      } else {
        // 响应数据为二进制流处理(数据导出)
        if (response.data instanceof Blob) {
          return response
        }

        ElMessage({
          message: msg || '系统出错',
          type: 'error'
        })
        return Promise.reject(new Error('Error'))
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
