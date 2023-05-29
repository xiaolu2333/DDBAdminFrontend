import service from "@/utils/request.js";

/**
 * 获取测试数据
 */
export function GetTestData() {
    "use strict";
    try {
        return service.request({
            method: "get",
            url: "/test_app/index",
            // params: params,  // params 为 get 方法的查询字符串
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 直接局部更新数据
 */
export async function DirectUpdate(dataForm) {
    "use strict";
    try {
        return await service.request({
            method: "post",
            url: "/test_app/vxe-table_handle_direct_update",
            data: dataForm,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 保存局部更新数据
 */
export async function SaveTheUpdate(dataForm) {
    try {
        return await service.request({
            method: "post",
            url: "/test_app/vxe-table_handle_save_the_update",
            data: dataForm,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}
