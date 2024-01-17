import service from "@/utils/request.js";

/**
 * 重复请求
 */
export function repeatRequest() {
  return service.request({
    method: "get",
    url: "/learn/http_request_response/test_repeat_request",
  });
}