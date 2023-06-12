import service from "@/utils/request.js";

/**
 * 获取
 */
export function GetERDData() {
    return service.request({
        url: "/data_service/erd_service/index",
        method: "get",
    });
}