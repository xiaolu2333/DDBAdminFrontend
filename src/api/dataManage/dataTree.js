import service from "@/utils/request.js";

/**
 * 获取树结构数据
 */
export async function GetDataTree() {
    return await service.request({
        url: "/data_management/data_tree_manage/index/",
        method: "get",
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