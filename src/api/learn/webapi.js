import service from "@/utils/request.js";

/**
 * 前端埋点数据上传
 */
export async function postFrontEndLog(data) {
  service({
    url: "/test_app/page_data_analysis",
    method: "post",
    data
  });
}