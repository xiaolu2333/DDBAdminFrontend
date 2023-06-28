import service from "@/utils/request.js";

/**
 * 获取 ERD 数据
 */
export function GetERDData() {
    return service.request({
        url: "/data_service/erd_service/get_erd_data",
        method: "get",
    });
}

/**
 * 获取树形结构数据
 */
export function GetTreeData() {
    return service.request({
        url: "/data_service/erd_service/get_tree_data",
        method: "get",
    });
}