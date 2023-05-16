import service from "@/utils/request.js";

/**
 * 获取分页数据
 */
export async function getLineChartData() {
    "use strict";
    try {
        return await service.request({
            method: "get",
            url: "/test_app/use_echarts_line_chart",
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
}