/* jshint esversion: 6 */

import service from "@/utils/request";

/**
 * 机构列表获取API
 */
export async function GetOrgListByPost(queryType) {
  "use strict";
  try {
    return await service.request({
      method: "post",
      url: "/org/list",
      data: queryType,  // data 为 post 方法的请求体
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function GetOrgListByGet(queryType) {
  "use strict";
  try {
    return await service.request({
      method: "get",
      url: "/org/list",
      // params: queryType,  // params 为 get 方法的查询字符串
      data: queryType,  // 也可以在 get 方法的请求体中添加数据
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/**
 * 获取机构树形结构数据
 */
export async function GetOrgTreeByPost(queryType) {
  "use strict";
  try {
    return await service.request({
      url: "/org/tree",
      method: "post",
      data: queryType,  // data 为 post 方法的请求体
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
