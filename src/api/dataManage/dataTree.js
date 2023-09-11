import service from "@/utils/request.js";

/**
 * 获取树结构数据
 */
export function GetDataTree(oid) {
    return service.request({
        url: "/data_management/data_tree_manage/get_tree_node/",
        method: "get",
        params: {oid: oid},
    });
}

/**
 * 创建树节点
 */
export async function CreateNode(formData) {
    "use strict";
    try {
        return await service.request({
            url: "/data_management/data_tree_manage/create_tree_node/",
            method: "post",
            data: formData,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * 获取数据类型
 */
export function GetDataType() {
    return service.request({
        url: "data_management/data_tree_manage/get_data_type/",
        method: "get",
    });
}