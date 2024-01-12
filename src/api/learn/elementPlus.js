import service from "@/utils/request.js";

/**
 * checkbox 传值
 */
export async function postCheckboxDataApi(data) {
    return (await service.request({
        method: "post",
        url: "/learn/element_plus/post_checkbox_data",
        data: data,
    })).data;
}

/**
 * check 取值
 */
export async function getCheckboxDataApi() {
    return (await service.request({
        method: "get",
        url: "/learn/element_plus/get_checkbox_data",
    })).data;
}

