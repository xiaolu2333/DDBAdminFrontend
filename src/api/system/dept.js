/* jshint esversion: 6 */

import service from "@/utils/request";

/**
 * 获取部门树形结构数据
 */
export async function GetDeptTreeByPost(queryType) {
  "use strict";
  try {
    return await service.request({
      url: "/dept/tree",
      method: "post",
      data: queryType,  // data 为 post 方法的请求体
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}