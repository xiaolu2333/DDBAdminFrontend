import service from "@/utils/request.js";

/**
 * 获取通用表格表头
 */
export function getGeneralTableHeaderApi() {
    return service({
        url: "/learn/vxe_table/get_general_table_header",
        method: "get",
    });
}

/**
 * 获取通用表格数据，支持单字段排序
 * @param {String} field 排序字段
 * @param {String} order 排序方式：asc-升序，desc-降序
 */
export function getGeneralTableDataApi(field = "", order = "") {
    return service({
        url: "/learn/vxe_table/get_general_table_data",
        method: "get",
        params: {
            field: field,
            order: order,
        },
    });
}

