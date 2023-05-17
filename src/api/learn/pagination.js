import service from "@/utils/request.js";

/**
 * 获取分页数据
 */
export async function getPageData(pageParams) {
    "use strict";
    try {
        return await service.request({
            method: "get",
            url: "/test_app/pagination_data",
            params: pageParams,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}

/**
 * 获取滚动加载分页数据
 */
export async function getScrollPageData(pageParams) {
    "use strict";
    try {
        return await service.request({
            method: "get",
            url: "/test_app/scroll_pagination_data",
            params: pageParams,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}